import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-white min-h-screen relative overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* 星空背景 - 纯 CSS 方案 */}
          <div className="stars"></div>

          {/* 背景光晕 */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div
              className="aurora bg-purple-600/30"
              style={{ top: "10%", left: "10%" }}
            ></div>
            <div
              className="aurora bg-amber-600/20"
              style={{
                bottom: "20%",
                right: "15%",
                animationDelay: "2s",
              }}
            ></div>
            <div
              className="aurora bg-indigo-600/20"
              style={{ top: "50%", left: "60%", animationDelay: "4s" }}
            ></div>
          </div>

          {/* 导航栏 */}
          <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link
                href={`/${locale}`}
                className="text-xl md:text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
              >
                ⚜️ huabei.ai
              </Link>

              {/* 桌面导航 */}
              <div className="hidden md:flex items-center gap-6">
                <Link href={`/${locale}`} className="nav-link text-sm">
                  {t("home")}
                </Link>
                <Link href={`/${locale}/about`} className="nav-link text-sm">
                  {t("about")}
                </Link>
                <Link href={`/${locale}/team`} className="nav-link text-sm">
                  {t("team")}
                </Link>
                <Link href={`/${locale}/stories`} className="nav-link text-sm">
                  {t("stories")}
                </Link>
                <Link href={`/${locale}/science`} className="nav-link text-sm">
                  {t("science")}
                </Link>
                {/* 财经板块暂时隐藏（模拟数据）
                <Link href={`/${locale}/finance`} className="nav-link text-sm">
                  {t("finance")}
                </Link>
                */}
                <Link
                  href={`/${locale}/guestbook`}
                  className="nav-link text-sm"
                >
                  {t("guestbook")}
                </Link>
                <LanguageSwitcher />
              </div>

              {/* 移动端菜单 */}
              <div className="md:hidden flex items-center gap-2">
                <Link
                  href={`/${locale}/guestbook`}
                  className="px-3 py-1.5 text-sm bg-purple-600/50 rounded-full hover:bg-purple-600/70 transition-colors"
                >
                  {t("message")}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>

          {/* 主内容 */}
          <main className="relative z-10 pt-16">{children}</main>

          {/* 页脚 */}
          <footer className="relative z-10 mt-20 py-8 glass border-t border-purple-500/20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gradient text-lg font-bold mb-2">
                {tFooter("tagline")}
              </p>
              <p className="text-gray-500 text-sm">
                {tFooter("copyright")}
              </p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
