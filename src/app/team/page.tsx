"use client";

import Link from "next/link";
import Image from "next/image";
import saintsData from "@/data/saints.json";

export default function Team() {
  const saints = saintsData.saints;

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">⚔️</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            {saintsData.title}
          </h1>
          <p className="text-lg md:text-xl text-purple-200">{saintsData.subtitle}</p>
        </div>

        {/* 12黄金圣斗士卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {saints.map((saint, index) => {
            const isSummoned = saint.summoned;
            
            return (
              <div
                key={saint.id}
                className={`animate-fadeIn-delay-${(index % 4) + 1}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className={`
                    ${isSummoned 
                      ? `bg-gradient-to-br ${getGradientColor(index)} hover:scale-105` 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:shadow-lg hover:shadow-purple-500/30'
                    } 
                    p-[2px] rounded-2xl transition-all duration-300 card-hover
                    ${isSummoned ? 'border-2 border-yellow-400/80' : 'border border-gray-600/50'}
                  `}
                >
                  <div className={`glass-card rounded-xl p-4 md:p-6 h-full ${!isSummoned && 'relative'}`}>
                    {/* 圣斗士形象 */}
                    <div className={`relative aspect-square rounded-xl overflow-hidden mb-4 border ${isSummoned ? 'border-purple-500/30' : 'border-gray-600/30'}`}>
                      <Image
                        src={`/saints/${saint.id}.webp`}
                        alt={`${saint.constellation} ${saint.name}`}
                        fill
                        className={`object-cover ${!isSummoned && 'filter grayscale brightness-[0.3]'}`}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      
                      {/* 未召唤遮罩 */}
                      {!isSummoned && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center">
                          <div className="text-6xl mb-2 opacity-80">{saint.symbol}</div>
                          <div className="text-sm text-gray-300 font-semibold tracking-wider">神秘圣斗士</div>
                          <div className="text-xs text-gray-500 mt-1">尚未召唤</div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-lg md:text-xl font-bold mb-1 ${!isSummoned && 'text-gray-400'}`}>
                      {saint.constellation}
                    </h3>
                    <p className={`text-sm mb-2 md:mb-3 ${isSummoned ? 'text-purple-300' : 'text-gray-500'}`}>
                      {saint.symbol} {isSummoned ? saint.name : '???'}
                    </p>
                    
                    <div className="border-t border-white/10 pt-3 mt-3">
                      <p className={`text-xs md:text-sm mb-2 font-semibold ${isSummoned ? 'text-yellow-400' : 'text-gray-500'}`}>
                        💼 {saint.role}
                      </p>
                      <p className={`text-xs md:text-sm mb-3 ${isSummoned ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isSummoned ? saint.description : '这位圣斗士尚未被召唤，其真实身份与能力仍是未解之谜...'}
                      </p>
                      
                      {/* 技能标签 */}
                      {isSummoned && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {saint.skills.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* 未召唤提示 */}
                      {!isSummoned && (
                        <div className="mt-2 text-center">
                          <span className="text-xs px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-500 inline-block">
                            🔒 等待召唤
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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

// 渐变色映射函数（保持原有的视觉效果）
function getGradientColor(index: number): string {
  const colors = [
    "from-red-500 to-orange-500",      // 白羊座
    "from-orange-500 to-yellow-500",   // 金牛座
    "from-yellow-500 to-green-500",    // 双子座
    "from-green-500 to-cyan-500",      // 巨蟹座
    "from-cyan-500 to-blue-500",       // 狮子座
    "from-blue-500 to-purple-500",     // 处女座
    "from-purple-500 to-pink-500",     // 天秤座
    "from-pink-500 to-red-500",        // 天蝎座
    "from-red-500 to-purple-500",      // 射手座
    "from-gray-500 to-slate-500",      // 摩羯座
    "from-cyan-500 to-blue-500",       // 水瓶座
    "from-pink-500 to-rose-500",       // 双鱼座
  ];
  return colors[index] || "from-purple-500 to-pink-500";
}
