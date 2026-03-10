"use client";

import Link from "next/link";

export default function Team() {
  const saints = [
    {
      name: "白羊座",
      guardian: "穆",
      ability: "圣衣修复",
      description: "拥有修复圣衣的特殊能力，象征新生与重建",
      emoji: "🐏",
      color: "from-red-500 to-orange-500",
    },
    {
      name: "金牛座",
      guardian: "阿鲁迪巴",
      ability: "绝对防御",
      description: "拥有黄金圣斗士中最强的防御力，坚不可摧",
      emoji: "🐂",
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "双子座",
      guardian: "撒加",
      ability: "双重人格/幻象",
      description: "拥有双重人格和制造幻象的能力，变化无常",
      emoji: "👯",
      color: "from-yellow-500 to-green-500",
    },
    {
      name: "巨蟹座",
      guardian: "迪斯马斯克",
      ability: "积尸气",
      description: "能够操控死亡气息，打开通往冥界的大门",
      emoji: "🦀",
      color: "from-green-500 to-cyan-500",
    },
    {
      name: "狮子座",
      guardian: "艾欧里亚",
      ability: "光速拳",
      description: "拥有光速拳击能力，攻击力无与伦比",
      emoji: "🦁",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "处女座",
      guardian: "沙加",
      ability: "六道轮回/天舞宝轮",
      description: "最接近神的男人，拥有超越五感的第六感",
      emoji: "👱",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "天秤座",
      guardian: "童虎",
      ability: "平衡/武器",
      description: "掌握平衡之道，拥有12件黄金武器",
      emoji: "⚖️",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "天蝎座",
      guardian: "米罗",
      ability: "猩红毒针",
      description: "15发猩红毒针，精准无比，无人可逃",
      emoji: "🦂",
      color: "from-pink-500 to-red-500",
    },
    {
      name: "射手座",
      guardian: "艾俄洛斯",
      ability: "黄金箭",
      description: "拥有必杀的黄金箭，远程攻击无敌",
      emoji: "🏹",
      color: "from-red-500 to-purple-500",
    },
    {
      name: "摩羯座",
      guardian: "修罗",
      ability: "圣剑",
      description: "拥有如圣剑般锋利的手臂，斩断一切",
      emoji: "🐐",
      color: "from-gray-500 to-slate-500",
    },
    {
      name: "水瓶座",
      guardian: "卡妙",
      ability: "冰冻",
      description: "掌握绝对零度，能够冻结一切",
      emoji: "🏺",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "双鱼座",
      guardian: "阿布罗狄",
      ability: "玫瑰攻击",
      description: "使用美丽而致命的玫瑰，梦幻般的战斗",
      emoji: "🐟",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">⚔️</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            黄金十二宫
          </h1>
          <p className="text-lg md:text-xl text-purple-200">12位黄金圣斗士，守护12个星座宫位</p>
        </div>

        {/* 12黄金圣斗士卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {saints.map((saint, index) => (
            <div
              key={index}
              className={`animate-fadeIn-delay-${(index % 4) + 1}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${saint.color} p-[2px] rounded-2xl hover:scale-105 transition-transform duration-300 card-hover`}>
                <div className="glass-card rounded-xl p-4 md:p-6 h-full">
                  {/* 头像占位 */}
                  <div className="bg-black/40 border border-purple-500/30 rounded-xl p-6 md:p-8 mb-4 text-center">
                    <div className="text-4xl md:text-5xl float">{saint.emoji}</div>
                    <p className="text-xs text-gray-500 mt-2">海报占位</p>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-1">{saint.name}</h3>
                  <p className="text-sm text-purple-300 mb-2 md:mb-3">♌ {saint.guardian}</p>
                  
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <p className="text-xs md:text-sm text-yellow-400 mb-1">💪 {saint.ability}</p>
                    <p className="text-xs md:text-sm text-gray-400">{saint.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 团队合影占位 */}
        <div className="mt-12 md:mt-16 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <div className="glass-card rounded-2xl p-12 md:p-16 text-center">
            <div className="text-4xl md:text-5xl mb-4 float">🖼️</div>
            <p className="text-base md:text-lg text-gray-300">黄金圣斗士团队合影即将上线</p>
            <p className="text-sm text-gray-500 mt-2">Team Photo Placeholder</p>
          </div>
        </div>

        {/* 返回首页 */}
        <div className="mt-12 md:mt-16 text-center">
          <Link href="/" className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
