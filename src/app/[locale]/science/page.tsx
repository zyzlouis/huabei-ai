import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface SciencePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Science({ params }: SciencePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "science" });

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">📚</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-purple-200">{t("subtitle")}</p>
        </div>

        {/* 内容 */}
        <div className="space-y-8">
          {/* 第一部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">{t("s1Title")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {t("s1Desc")}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 text-sm md:text-base">
              <li>{t("s1b1")}</li>
              <li>{t("s1b2")}</li>
              <li>{t("s1b3")}</li>
              <li>{t("s1b4")}</li>
              <li>{t("s1b5")}</li>
            </ul>
          </section>

          {/* 第二部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">{t("s2Title")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {t("s2Desc")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">🧠 {t("s2c1Title")}</h3>
                <p className="text-sm text-gray-400">{t("s2c1Desc")}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">👥 {t("s2c2Title")}</h3>
                <p className="text-sm text-gray-400">{t("s2c2Desc")}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">🎭 {t("s2c3Title")}</h3>
                <p className="text-sm text-gray-400">{t("s2c3Desc")}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">📡 {t("s2c4Title")}</h3>
                <p className="text-sm text-gray-400">{t("s2c4Desc")}</p>
              </div>
            </div>
          </section>

          {/* 第三部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-400">{t("s3Title")}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl float">🎯</div>
                <div>
                  <h3 className="font-bold text-white">{t("s3a1Title")}</h3>
                  <p className="text-gray-400 text-sm">{t("s3a1Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl float-delayed">⚡</div>
                <div>
                  <h3 className="font-bold text-white">{t("s3a2Title")}</h3>
                  <p className="text-gray-400 text-sm">{t("s3a2Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl float">🛡️</div>
                <div>
                  <h3 className="font-bold text-white">{t("s3a3Title")}</h3>
                  <p className="text-gray-400 text-sm">{t("s3a3Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl float-delayed">🔄</div>
                <div>
                  <h3 className="font-bold text-white">{t("s3a4Title")}</h3>
                  <p className="text-gray-400 text-sm">{t("s3a4Desc")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 第四部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">{t("s4Title")}</h2>
            <div className="bg-black/40 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-3xl md:text-4xl mb-2 float">👸 {t("s4Athena")}</div>
                <p className="text-sm text-purple-300">{t("s4AthenaRole")}</p>
              </div>
              <div className="flex justify-center mb-6">
                <div className="h-8 w-0.5 bg-gradient-to-b from-purple-500 to-yellow-500"></div>
              </div>
              <div className="text-center mb-4">
                <div className="inline-flex flex-wrap justify-center gap-2 md:gap-3">
                  {[
                    "🐏", "🐂", "👯", "🦀", "🦁", "👱",
                    "⚖️", "🦂", "🏹", "🐐", "🏺", "🐟"
                  ].map((emoji, i) => (
                    <span key={i} className="px-2 md:px-3 py-1 bg-purple-900/50 rounded-full text-xs md:text-sm">
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">{t("s4Saints")}</p>
            </div>
          </section>
        </div>

        {/* 视频占位区 */}
        <div className="mt-12 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <div className="glass-card rounded-2xl p-12 md:p-16 text-center">
            <div className="text-4xl md:text-5xl mb-4 float">🎬</div>
            <p className="text-base md:text-lg text-gray-300">{t("videoPlaceholder")}</p>
            <p className="text-sm text-gray-500 mt-2">{t("videoPlaceholderSub")}</p>
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
