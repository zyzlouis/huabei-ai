import Link from "next/link";
import { getAllStories, Story } from "@/lib/stories";

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <div className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-5xl md:text-6xl mb-4 float">📚</div>
          <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            圣域传说
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            探索圣域的历史，阅读黄金圣斗士们的传奇故事
          </p>
        </div>

        {/* 故事列表 */}
        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg">故事正在撰写中，敬请期待...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <StoryCard key={story.slug} story={story} index={index} />
            ))}
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">更多故事即将推出</h2>
            <p className="text-gray-400">
              每位黄金圣斗士都有自己的传奇，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <Link 
      href={`/stories/${story.slug}`}
      className="glass-card rounded-2xl p-6 md:p-8 card-hover block animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* 故事图标 */}
      <div className="text-4xl mb-4 float">
        {story.icon || "📖"}
      </div>

      {/* 故事标题 */}
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-gradient">
        {story.title}
      </h2>

      {/* 故事描述 */}
      <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-3">
        {story.description}
      </p>

      {/* 元信息 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{story.date}</span>
        <span className="text-purple-400">阅读更多 →</span>
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
    </Link>
  );
}