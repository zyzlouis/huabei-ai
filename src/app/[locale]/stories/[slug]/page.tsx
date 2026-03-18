import { notFound } from "next/navigation";
import Link from "next/link";
import { getStoryBySlug, getAllStories } from "@/lib/stories";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DOMPurify from "isomorphic-dompurify";

interface StoryPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found - Sanctuary Legends",
    };
  }

  return {
    title: `${story.title} - Sanctuary Legends`,
    description: story.description,
  };
}

export function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { locale, slug } = await params;
  const story = getStoryBySlug(slug);
  const t = await getTranslations({ locale, namespace: "storyDetail" });

  if (!story) {
    notFound();
  }

  // 清洗 HTML 内容
  const sanitizedHtml = DOMPurify.sanitize(story.contentHtml);

  // 如果是小说章节，计算上一章/下一章
  const isChapter = story.novel && story.chapter;
  // 动态获取本小说的总章节数
  const totalChapters = isChapter
    ? getAllStories().filter(
        (s) => s.novel === story.novel && s.chapter != null
      ).length
    : 0;
  const prevChapterSlug = isChapter && story.chapter! > 1 ? `chapter-${story.chapter! - 1}` : null;
  const nextChapterSlug = isChapter && story.chapter! < totalChapters ? `chapter-${story.chapter! + 1}` : null;

  return (
    <div className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <div className="flex items-center gap-4 mb-8">
          {story.novel ? (
            <Link
              href={`/${locale}/stories/${story.novel}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <span>←</span>
              <span>{t("backToNovelTOC")}</span>
            </Link>
          ) : (
            <Link
              href={`/${locale}/stories`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <span>←</span>
              <span>{t("backToStoryList")}</span>
            </Link>
          )}

          {/* 章节进度 */}
          {isChapter && (
            <span className="ml-auto text-sm text-purple-400 font-mono">
              {t("chapterProgress", { current: story.chapter!, total: totalChapters })}
            </span>
          )}
        </div>

        {/* 故事头部 */}
        <header className="mb-12">
          <div className="text-5xl md:text-6xl mb-6 float">
            {story.icon || "📖"}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            {story.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>{story.date}</span>
            {story.author && (
              <>
                <span>·</span>
                <span>{story.author}</span>
              </>
            )}
          </div>

          {/* 标签 */}
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
        </header>

        {/* 故事内容 */}
        <article
          className="prose prose-invert prose-purple max-w-none story-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />

        {/* 底部导航 */}
        <footer className="mt-16 pt-8 border-t border-purple-500/20">
          {isChapter ? (
            // 章节导航
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {prevChapterSlug ? (
                <Link
                  href={`/${locale}/stories/${prevChapterSlug}`}
                  className="btn-secondary px-6 py-3 rounded-full w-full md:w-auto text-center"
                >
                  ← {t("prevChapter")}
                </Link>
              ) : (
                <Link
                  href={`/${locale}/stories/${story.novel}`}
                  className="btn-secondary px-6 py-3 rounded-full w-full md:w-auto text-center"
                >
                  ← {t("backToTOC")}
                </Link>
              )}

              <Link
                href={`/${locale}/stories/${story.novel}`}
                className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                📖 {t("chapterTOC")}
              </Link>

              {nextChapterSlug ? (
                <Link
                  href={`/${locale}/stories/${nextChapterSlug}`}
                  className="btn-primary px-6 py-3 rounded-full w-full md:w-auto text-center"
                >
                  {t("nextChapter")} →
                </Link>
              ) : (
                <Link
                  href={`/${locale}/guestbook`}
                  className="btn-primary px-6 py-3 rounded-full w-full md:w-auto text-center"
                >
                  {t("leaveComment")} 📝
                </Link>
              )}
            </div>
          ) : (
            // 普通故事导航
            <div className="flex justify-between items-center">
              <Link
                href={`/${locale}/stories`}
                className="btn-secondary px-6 py-3 rounded-full"
              >
                ← {t("backToStoryList")}
              </Link>

              <Link
                href={`/${locale}/guestbook`}
                className="btn-primary px-6 py-3 rounded-full"
              >
                {t("leaveComment")} 📝
              </Link>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
