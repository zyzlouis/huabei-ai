import { NextRequest, NextResponse } from "next/server";

// 简单速率限制：60秒内同IP只允许1次提交
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

const FEISHU_APP_ID = process.env.FEISHU_APP_ID!;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET!;
const BITABLE_APP_TOKEN = process.env.BITABLE_APP_TOKEN || "NH5Cb7ubXaetrasXnB2cVmEjnWg";
const BITABLE_TABLE_ID = process.env.BITABLE_TABLE_ID || "tblJrgiIXS9vVEhH";

// 内存缓存 tenant_access_token，TTL 2小时
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getTenantAccessToken(): Promise<string> {
  // 检查缓存是否有效（提前5分钟刷新）
  if (cachedToken && Date.now() < cachedToken.expiresAt - 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const res = await fetch(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: FEISHU_APP_ID,
        app_secret: FEISHU_APP_SECRET,
      }),
    }
  );
  const data = await res.json();
  if (data.code !== 0) throw new Error(`飞书鉴权失败: ${data.msg}`);

  cachedToken = {
    token: data.tenant_access_token,
    expiresAt: Date.now() + data.expire * 1000,
  };

  return cachedToken.token;
}

// GET /api/guestbook - 读取留言列表
export async function GET() {
  try {
    const token = await getTenantAccessToken();
    const res = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records?page_size=100&sort=%5B%7B%22field_name%22%3A%22%E6%8F%90%E4%BA%A4%E6%97%B6%E9%97%B4%22%2C%22desc%22%3Atrue%7D%5D`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (data.code !== 0) {
      return NextResponse.json({ error: data.msg }, { status: 500 });
    }

    const messages = (data.data?.items || []).map((item: Record<string, unknown>) => {
      const fields = item.fields as Record<string, unknown>;
      const nameField = fields["昵称"];
      const contentField = fields["留言内容"];
      const timeField = fields["提交时间"];

      // 文本字段可能是数组格式
      const getText = (f: unknown): string => {
        if (!f) return "";
        if (typeof f === "string") return f;
        if (Array.isArray(f)) return f.map((t: unknown) => (t as { text?: string })?.text || "").join("");
        return String(f);
      };

      return {
        id: item.record_id as string,
        name: getText(nameField),
        content: getText(contentField),
        time: timeField
          ? new Date(timeField as number).toISOString().split("T")[0]
          : "",
      };
    });

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("GET /api/guestbook error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

// POST /api/guestbook - 提交新留言
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, content } = body;

    if (!name?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "昵称和留言内容不能为空" }, { status: 400 });
    }

    // Strip HTML tags
    const cleanName = stripHtmlTags(name.trim());
    const cleanContent = stripHtmlTags(content.trim());

    // 字符限制
    if (cleanName.length > 50) {
      return NextResponse.json({ error: "昵称不能超过50个字符" }, { status: 400 });
    }
    if (cleanContent.length > 500) {
      return NextResponse.json({ error: "留言内容不能超过500个字符" }, { status: 400 });
    }

    // 速率限制
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const now = Date.now();
    const lastSubmit = rateLimitMap.get(ip);
    if (lastSubmit && now - lastSubmit < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json({ error: "提交过于频繁，请60秒后再试" }, { status: 429 });
    }
    rateLimitMap.set(ip, now);

    // 清理过期的速率限制记录（每次请求清理一次即可）
    if (rateLimitMap.size > 1000) {
      for (const [key, ts] of rateLimitMap) {
        if (now - ts >= RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
      }
    }

    const token = await getTenantAccessToken();
    const res = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            昵称: cleanName,
            留言内容: cleanContent,
            提交时间: Date.now(),
            "IP/来源": ip,
          },
        }),
      }
    );

    const data = await res.json();
    if (data.code !== 0) {
      return NextResponse.json({ error: data.msg }, { status: 500 });
    }

    return NextResponse.json({ success: true, record_id: data.data?.record?.record_id });
  } catch (err) {
    console.error("POST /api/guestbook error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
