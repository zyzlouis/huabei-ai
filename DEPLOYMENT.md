# 部署指南

## 项目状态
✅ 项目构建成功
✅ Git 仓库已初始化
✅ Vercel CLI 已安装
✅ vercel.json 配置已创建

## 部署到 Vercel

### 方法 1: 使用 Vercel CLI（推荐）

1. 获取 Vercel Token:
   - 访问 https://vercel.com/account/tokens
   - 创建新 token
   - 复制 token

2. 部署命令:
```bash
cd /root/.openclaw/workspace/huabei-ai
vercel --token YOUR_TOKEN_HERE --yes --prod
```

### 方法 2: 通过 Vercel Dashboard

1. 访问 https://vercel.com/new
2. 导入 Git 仓库（需要先推送到 GitHub/GitLab）
3. Vercel 会自动检测 Next.js 项目并部署

### 方法 3: 推送到 GitHub 后自动部署

1. 在 GitHub 创建新仓库
2. 推送代码:
```bash
git remote add origin https://github.com/YOUR_USERNAME/huabei-ai.git
git push -u origin master
```
3. 在 Vercel 导入该仓库

## 项目配置

- Framework: Next.js 16.1.6
- Node.js: v22.22.0
- Region: Singapore (sin1)
- Build Command: npm run build
- Output Directory: .next

## 下一步

请选择一个部署方法并提供必要的凭证（Vercel token 或 GitHub 仓库地址）。
