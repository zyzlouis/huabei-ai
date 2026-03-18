import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">👸</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-purple-200">{t("subtitle")}</p>
        </div>

        {/* 故事内容 */}
        <div className="space-y-8">
          {/* 第一章 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">{t("ch1Title")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {t("ch1p1")}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {t("ch1p2")}
            </p>
          </section>

          {/* 第二章 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">{t("ch2Title")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {t("ch2p1")}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {t("ch2p2")}
            </p>
          </section>

          {/* 第三章 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-pink-400">{t("ch3Title")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {t("ch3p1")}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {t("ch3p2")}
            </p>
          </section>

          {/* 第四章 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">{t("ch4Title")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {t("ch4p1")}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {t("ch4p2")}
            </p>
          </section>
        </div>

        {/* 图片占位区 */}
        <div className="mt-12 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <div className="glass-card rounded-2xl p-12 md:p-16 text-center">
            <div className="text-4xl md:text-5xl mb-4 float">🖼️</div>
            <p className="text-base md:text-lg text-gray-300">{t("imagePlaceholder")}</p>
            <p className="text-sm text-gray-500 mt-2">{t("imagePlaceholderSub")}</p>
          </div>
        </div>

        {/* 返回首页 */}
        <div className="mt-12 text-center">
          <Link href={`/${locale}`} className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg">
            ← {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
