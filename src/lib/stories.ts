import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const storiesDirectory = path.join(process.cwd(), "content/stories");

// 模块级缓存
let allStoriesCache: Story[] | null = null;
let storyCacheMap: Map<string, Story> | null = null;

export interface Story {
  slug: string;
  title: string;
  description: string;
  content: string;
  contentHtml: string;
  date: string;
  author?: string;
  tags?: string[];
  icon?: string;
  novel?: string;
  chapter?: number;
}

/**
 * 解析 Markdown 文件的 frontmatter 和内容
 */
function parseMarkdown(content: string): {
  frontmatter: Record<string, any>;
  body: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // 没有 frontmatter，直接返回内容
    return {
      frontmatter: {},
      body: content,
    };
  }

  const frontmatterText = match[1];
  const body = match[2];

  // 简单解析 YAML frontmatter
  const frontmatter: Record<string, any> = {};
  frontmatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: any = line.slice(colonIndex + 1).trim();
      
      // 尝试解析数组格式
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          // 保持原样
        }
      }
      
      // 尝试解析数字格式（特别是 chapter 字段）
      if (key === 'chapter' && !isNaN(Number(value))) {
        value = Number(value);
      }
      
      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

/**
 * 从 Markdown 内容中提取标题（第一个 # 开头的行）
 */
function extractTitle(content: string): string {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : "无标题";
}

/**
 * 从 Markdown 内容中提取描述（第一段非空文本）
 */
function extractDescription(content: string): string {
  // 移除标题和 frontmatter
  const cleanContent = content
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "") // 移除 frontmatter
    .replace(/^#\s+.+$/gm, ""); // 移除标题

  // 找到第一个非空段落
  const paragraphs = cleanContent.split("\n\n");
  for (const para of paragraphs) {
    const cleanPara = para.trim();
    if (cleanPara && !cleanPara.startsWith("#") && !cleanPara.startsWith("- ")) {
      // 移除 Markdown 标记
      return cleanPara
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/`/g, "")
        .slice(0, 150) + (cleanPara.length > 150 ? "..." : "");
    }
  }

  return "暂无描述";
}

/**
 * 获取所有故事
 */
export function getAllStories(): Story[] {
  if (allStoriesCache) return allStoriesCache;

  // 确保目录存在
  if (!fs.existsSync(storiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(storiesDirectory);
  allStoriesCache = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(storiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { frontmatter, body } = parseMarkdown(fileContents);
      
      // 使用 frontmatter 中的标题或从内容中提取
      const title = frontmatter.title || extractTitle(body) || extractTitle(fileContents);
      
      // 使用 frontmatter 中的描述或从内容中提取
      const description = frontmatter.description || extractDescription(body) || extractDescription(fileContents);

      return {
        slug,
        title,
        description,
        content: body,
        contentHtml: "", // 列表页不需要 HTML 内容
        date: frontmatter.date || new Date().toISOString().split("T")[0],
        author: frontmatter.author,
        tags: frontmatter.tags || [],
        icon: frontmatter.icon,
        novel: frontmatter.novel,
        chapter: frontmatter.chapter,
      };
    });

  // 按日期排序（最新的在前）
  allStoriesCache = allStoriesCache.sort((a, b) => (a.date < b.date ? 1 : -1));
  storyCacheMap = new Map(allStoriesCache.map((s) => [s.slug, s]));
  return allStoriesCache;
}

/**
 * 根据 slug 获取单个故事
 */
export function getStoryBySlug(slug: string): Story | null {
  // 先查缓存（列表页已缓存的不含 contentHtml）
  if (storyCacheMap?.has(slug)) {
    // 如果是列表页的缓存（contentHtml 为空），需要重新加载
    const cached = storyCacheMap.get(slug)!;
    if (cached.contentHtml) return cached;
    // fall through to load with contentHtml
  }

  const fullPath = path.join(storiesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { frontmatter, body } = parseMarkdown(fileContents);

  // 使用 remark 将 Markdown 转换为 HTML
  const processedContent = remark().use(html).processSync(body);
  const contentHtml = processedContent.toString();

  // 使用 frontmatter 中的标题或从内容中提取
  const title = frontmatter.title || extractTitle(body) || extractTitle(fileContents);
  
  // 使用 frontmatter 中的描述或从内容中提取
  const description = frontmatter.description || extractDescription(body) || extractDescription(fileContents);

  const story: Story = {
    slug,
    title,
    description,
    content: body,
    contentHtml,
    date: frontmatter.date || new Date().toISOString().split("T")[0],
    author: frontmatter.author,
    tags: frontmatter.tags || [],
    icon: frontmatter.icon,
    novel: frontmatter.novel,
    chapter: frontmatter.chapter,
  };

  // 更新缓存
  if (storyCacheMap) storyCacheMap.set(slug, story);

  return story;
}