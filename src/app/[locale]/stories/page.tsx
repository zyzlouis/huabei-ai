import Link from "next/link";
import { getAllStories, Story } from "@/lib/stories";
import { getTranslations } from "next-intl/server";

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stories" });
  const stories = getAllStories();

  return (
    <div className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-5xl md:text-6xl mb-4 float">📚</div>
          <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t("pageDesc")}
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg">{t("empty")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <StoryCard
                key={story.slug}
                story={story}
                index={index}
                locale={locale}
                readMoreLabel={t("readMore")}
              />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              {t("moreComingTitle")}
            </h2>
            <p className="text-gray-400">{t("moreComingDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({
  story,
  index,
  locale,
  readMoreLabel,
}: {
  story: Story;
  index: number;
  locale: string;
  readMoreLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/stories/${story.slug}`}
      className="glass-card rounded-2xl p-6 md:p-8 card-hover block animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-4xl mb-4 float">{story.icon || "📖"}</div>
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-gradient">
        {story.title}
      </h2>
      <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-3">
        {story.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{story.date}</span>
        <span className="text-purple-400">{readMoreLabel}</span>
      </div>
      {story.tags && story.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-purple-600/30 rounded-full text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
