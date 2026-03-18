import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="min-h-screen">
      {/* Hero区域 */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <div className="text-6xl md:text-8xl mb-6 float animate-fadeIn">
                ⚜️
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient animate-fadeIn-delay-1">
                {t("heroTitle")}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-purple-200 mb-4 animate-fadeIn-delay-2">
                {t("heroSubtitle")}
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-10 animate-fadeIn-delay-3">
                {t("heroDesc")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fadeIn-delay-4">
                <Link
                  href={`/${locale}/team`}
                  className="btn-primary px-8 py-4 rounded-full font-bold text-lg text-white"
                >
                  {t("viewTeam")}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="btn-secondary px-8 py-4 rounded-full font-bold text-lg"
                >
                  {t("learnMore")}
                </Link>
              </div>
            </div>

            <div className="relative order-1 md:order-2 animate-fadeIn-delay-1">
              <div className="relative mx-auto max-w-md md:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 via-amber-500/20 to-transparent rounded-3xl blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/30">
                  <Image
                    src="/images/athena-desktop.png"
                    alt="Athena"
                    width={1228}
                    height={2200}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 text-6xl animate-pulse">
                  ✨
                </div>
                <div
                  className="absolute -bottom-4 -left-4 text-6xl animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  ⚜️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
            <span className="text-gradient">{t("teamTitle")}</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-1">
              <div className="text-5xl mb-4 float">👸</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {t("athenaTitle")}
              </h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                {t("athenaDesc")}
              </p>
              <div className="text-sm text-purple-300 font-medium">
                {t("athenaRole")}
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-2">
              <div className="text-5xl mb-4 float-delayed">🏺</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {t("sagaTitle")}
              </h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                {t("sagaDesc")}
              </p>
              <div className="text-sm text-yellow-300 font-medium">
                {t("sagaRole")}
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-3">
              <div className="text-5xl mb-4 float">⚔️</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {t("goldensTitle")}
              </h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                {t("goldensDesc")}
              </p>
              <div className="text-sm text-blue-300 font-medium">
                {t("goldensRole")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 能力展示 */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
            <span className="text-gradient">{t("abilitiesTitle")}</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "🧠", title: t("ability1Title"), desc: t("ability1Desc"), delay: 1 },
              { icon: "⚡", title: t("ability2Title"), desc: t("ability2Desc"), delay: 2 },
              { icon: "🎯", title: t("ability3Title"), desc: t("ability3Desc"), delay: 3 },
              { icon: "🤝", title: t("ability4Title"), desc: t("ability4Desc"), delay: 4 },
            ].map((item) => (
              <div
                key={item.title}
                className={`glass-card p-4 md:p-6 rounded-xl card-hover animate-fadeIn-delay-${item.delay}`}
              >
                <div className="text-3xl md:text-4xl mb-3 float">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 视频占位 */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-12 md:p-20 text-center">
            <div className="text-5xl md:text-6xl mb-4 float">🎬</div>
            <p className="text-lg md:text-xl text-gray-300">{t("videoPlaceholder")}</p>
            <p className="text-sm text-gray-500 mt-2">{t("videoSubtext")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-fadeIn">
            {t("ctaTitle")}
          </h2>
          <p className="text-gray-300 mb-8 text-sm md:text-base animate-fadeIn-delay-1">
            {t("ctaDesc")}
          </p>
          <Link
            href={`/${locale}/guestbook`}
            className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg animate-fadeIn-delay-2"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
