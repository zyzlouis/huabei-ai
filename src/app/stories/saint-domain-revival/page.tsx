import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "圣域复兴计划 - 圣域传说",
  description: "一只白色金吉拉猫咪的觉醒，揭开了圣域在现代世界复兴的序幕。当雅典娜转世为猫，十二黄金圣斗士将如何在AI时代重新集结？",
};

interface Chapter {
  number: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: "猫咪的觉醒",
    slug: "chapter-1",
    description: "一只名叫小白的金吉拉猫咪突然觉醒了前世记忆——她竟是雅典娜女神！",
    icon: "🐱"
  },
  {
    number: 2,
    title: "白羊座的AI帝国",
    slug: "chapter-2",
    description: "穆，白羊座黄金圣斗士，如今是AI创业公司的技术总监。",
    icon: "🐏"
  },
  {
    number: 3,
    title: "金牛座的量子迷宫",
    slug: "chapter-3",
    description: "阿鲁迪巴，金牛座黄金圣斗士，量子计算实验室的首席科学家。",
    icon: "🐂"
  },
  {
    number: 4,
    title: "双子座的数字分身",
    slug: "chapter-4",
    description: "撒加与加隆，双子座的光明与黑暗，在AI时代的新对决。",
    icon: "👥"
  },
  {
    number: 5,
    title: "巨蟹座的虚拟圣域",
    slug: "chapter-5",
    description: "迪斯马斯克，巨蟹座黄金圣斗士，虚拟现实游戏的设计师。",
    icon: "🦀"
  }
];

export default function NovelPage() {
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
              src="/images/athena-desktop.png"
              alt="圣域复兴计划 - 雅典娜觉醒"
              fill
              className="object-cover"
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
            <span>📖 5章完结</span>
            <span>·</span>
            <span>⏱️ 约2小时</span>
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

        {/* 章节列表 */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gradient">
            📖 章节目录
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.slug}
                href={`/stories/${chapter.slug}`}
                className="glass-card rounded-2xl p-6 md:p-8 card-hover block animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 章节图标和编号 */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl float">{chapter.icon}</div>
                  <div className="text-sm text-purple-400 font-mono">
                    第 {chapter.number} 章
                  </div>
                </div>

                {/* 章节标题 */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gradient">
                  {chapter.title}
                </h3>

                {/* 章节描述 */}
                <p className="text-gray-300 text-sm md:text-base mb-4">
                  {chapter.description}
                </p>

                {/* 阅读按钮 */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">点击阅读</span>
                  <span className="text-purple-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 作者的话 */}
        <section className="glass-card rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            ✍️ 作者的话
          </h2>
          <div className="text-gray-300 space-y-4 leading-relaxed">
            <p>
              这是一个关于传承与创新的故事。
            </p>
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
