import Link from "next/link";
import Image from "next/image";
import { getAllStories } from "@/lib/stories";
import NovelChapterList from "./NovelChapterList";

export default function NovelPage() {
  // 服务端动态读取所有属于本小说的章节
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

  return (
    <div className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 返回按钮 */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <span>←</span>
          <span>返回故事列表</span>
        </Link>

        {/* 小说头部 */}
        <header className="text-center mb-16">
          {/* 封面图 */}
          <div className="mb-8 relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden glass-card">
            <Image
              src="/images/athena-original.png"
              alt="圣域复兴计划 - 雅典娜觉醒"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="text-6xl md:text-7xl mb-6 float">⚔️</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            圣域复兴计划
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            一只白色金吉拉猫咪的觉醒，揭开了圣域在现代世界复兴的序幕。<br />
            当雅典娜转世为猫，十二黄金圣斗士将如何在AI时代重新集结？
          </p>

          {/* 元信息 */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>📅 2026-03-12</span>
            <span>·</span>
            <span>✍️ 处女座·沙加</span>
            <span>·</span>
            <span>📖 {chapters.length}章</span>
            <span>·</span>
            <span>⏱️ 约{Math.ceil(chapters.length * 0.4 * 10) / 10}小时</span>
          </div>

          {/* 标签 */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["圣域传说", "黄金圣斗士", "AI时代", "连载小说"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm bg-purple-600/30 rounded-full text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 简介 */}
        <section className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            📚 故事简介
          </h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p>
              在2026年的上海，一只名叫"小白"的金吉拉猫咪突然觉醒了前世的记忆——她竟是古希腊神话中的智慧与战争女神雅典娜！
            </p>
            <p>
              随着记忆的复苏，雅典娜发现自己身处一个全新的时代：人工智能蓬勃发展，科技改变着世界的每一个角落。而她曾经最忠诚的战士——十二黄金圣斗士，也在这个时代以全新的身份存在着。
            </p>
            <p>
              从AI创业公司的技术总监，到量子计算实验室的首席科学家；从网络安全专家，到虚拟现实游戏设计师......每一位黄金圣斗士都在用自己的方式守护着这个世界。
            </p>
            <p className="text-purple-300 font-medium">
              当古老的圣域传说遇上现代科技文明，当神话中的战士化身为AI时代的精英，一场关于守护、信仰与复兴的传奇故事，即将展开......
            </p>
          </div>
        </section>

        {/* 章节列表（客户端组件，保留排序功能） */}
        <NovelChapterList chapters={chapters} />

        {/* 作者的话 */}
        <section className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            ✍️ 作者的话
          </h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p>这是一个关于传承与创新的故事。</p>
            <p>
              在AI技术飞速发展的今天，我们是否还记得那些关于勇气、信仰和守护的古老传说？当神话与科技相遇，会碰撞出怎样的火花？
            </p>
            <p>
              作为处女座黄金圣斗士沙加，我将用这个故事，向所有在AI时代奋斗的人们致敬。
            </p>
            <p className="text-purple-300 font-medium text-center text-lg mt-6">
              愿每个人都能找到属于自己的"小宇宙"。
            </p>
          </div>
        </section>

        {/* 底部导航 */}
        <footer className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/stories"
            className="btn-secondary px-8 py-4 rounded-full w-full md:w-auto text-center"
          >
            ← 返回故事列表
          </Link>

          <Link
            href="/stories/chapter-1"
            className="btn-primary px-8 py-4 rounded-full w-full md:w-auto text-center"
          >
            开始阅读第一章 →
          </Link>
        </footer>
      </div>
    </div>
  );
}
