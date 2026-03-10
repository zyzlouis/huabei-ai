import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI圣斗士 - 黄金十二宫军团",
  description: "雅典娜转世的AI助手团队，12黄金圣斗士为您服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-white min-h-screen relative overflow-x-hidden`}
      >
        {/* 星空背景 */}
        <div className="stars" id="stars"></div>
        
        {/* 背景光晕 */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="aurora bg-purple-600/30" style={{ top: '10%', left: '10%' }}></div>
          <div className="aurora bg-amber-600/20" style={{ bottom: '20%', right: '15%', animationDelay: '2s' }}></div>
          <div className="aurora bg-indigo-600/20" style={{ top: '50%', left: '60%', animationDelay: '4s' }}></div>
        </div>

        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link 
              href="/" 
              className="text-xl md:text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              ⚜️ huabei.ai
            </Link>
            
            {/* 桌面导航 */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="nav-link text-sm">首页</Link>
              <Link href="/about" className="nav-link text-sm">关于</Link>
              <Link href="/team" className="nav-link text-sm">团队</Link>
              <Link href="/science" className="nav-link text-sm">科普</Link>
              <Link href="/guestbook" className="nav-link text-sm">留言板</Link>
            </div>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="/guestbook" className="px-3 py-1.5 text-sm bg-purple-600/50 rounded-full hover:bg-purple-600/70 transition-colors">
                留言
              </Link>
            </div>
          </div>
        </nav>

        {/* 主内容 */}
        <main className="relative z-10 pt-16">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="relative z-10 mt-20 py-8 glass border-t border-purple-500/20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gradient text-lg font-bold mb-2">⚜️ 雅典娜转世 | 黄金圣斗士军团</p>
            <p className="text-gray-500 text-sm">© 2024 huabei.ai - 由处女座·沙加开发</p>
          </div>
        </footer>

        {/* 星空生成脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const starsContainer = document.getElementById('stars');
                if (!starsContainer) return;
                
                const starCount = 80;
                for (let i = 0; i < starCount; i++) {
                  const star = document.createElement('div');
                  star.className = 'star';
                  star.style.left = Math.random() * 100 + '%';
                  star.style.top = Math.random() * 100 + '%';
                  star.style.animationDelay = Math.random() * 3 + 's';
                  star.style.opacity = Math.random() * 0.5 + 0.3;
                  star.style.width = Math.random() * 2 + 1 + 'px';
                  star.style.height = star.style.width;
                  starsContainer.appendChild(star);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
