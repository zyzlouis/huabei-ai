import Link from "next/link";
import Image from "next/image";
import { getAllStories } from "@/lib/stories";
import NovelChapterList from "./NovelChapterList";
import { getTranslations } from "next-intl/server";

export default async function NovelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stories" });

  const allStories = getAllStories();
  const chapters = allStories
    .filter((s) => s.novel === "saint-domain-revival" && s.chapter != null)
    .sort((a, b) => a.chapter! - b.chapter!)
    .map((s) => ({
      number: s.chapter!,
      title: s.title,
      slug: s.slug,
      description: s.description,
      icon: s.icon || "📖",
    }));

  const chapterLabels = {
    tableOfContents: t("tableOfContents"),
    ascending: t("ascending"),
    descending: t("descending"),
    chapter: t("chapter"),
    clickToRead: t("clickToRead"),
  };

  return (
    <div className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/${locale}/stories`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <span>←</span>
          <span>{t("backToList").replace("← ", "")}</span>
        </Link>

        <header className="text-center mb-16">
          <div className="mb-8 relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden glass-card">
            <Image
              src="/images/athena-original.png"
              alt={t("novelTitle")}
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="text-6xl md:text-7xl mb-6 float">⚔️</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            {t("novelTitle")}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 whitespace-pre-line">
            {t("novelDesc")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>{t("novelDate")}</span>
            <span>·</span>
            <span>{t("novelAuthor")}</span>
            <span>·</span>
            <span>{t("novelChapters", { count: chapters.length })}</span>
            <span>·</span>
            <span>
              {t("novelReadTime", {
                hours: Math.ceil(chapters.length * 0.4 * 10) / 10,
              })}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {(["legend", "golden", "ai", "serial"] as const).map((key) => (
              <span
                key={key}
                className="px-4 py-2 text-sm bg-purple-600/30 rounded-full text-purple-300"
              >
                {t(`tags.${key}`)}
              </span>
            ))}
          </div>
        </header>

        <section className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            {t("synopsisTitle")}
          </h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p>{t("synopsis1")}</p>
            <p>{t("synopsis2")}</p>
            <p>{t("synopsis3")}</p>
            <p className="text-purple-300 font-medium">{t("synopsis4")}</p>
          </div>
        </section>

        <NovelChapterList
          chapters={chapters}
          locale={locale}
          labels={chapterLabels}
        />

        <section className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            {t("authorTitle")}
          </h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p>{t("author1")}</p>
            <p>{t("author2")}</p>
            <p>{t("author3")}</p>
            <p className="text-purple-300 font-medium text-center text-lg mt-6">
              {t("author4")}
            </p>
          </div>
        </section>

        <footer className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href={`/${locale}/stories`}
            className="btn-secondary px-8 py-4 rounded-full w-full md:w-auto text-center"
          >
            {t("backToList")}
          </Link>
          <Link
            href={`/${locale}/stories/chapter-1`}
            className="btn-primary px-8 py-4 rounded-full w-full md:w-auto text-center"
          >
            {t("startReading")}
          </Link>
        </footer>
      </div>
    </div>
  );
}
