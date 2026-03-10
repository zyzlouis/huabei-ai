import Link from "next/link";

export default function Science() {
  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">📚</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            科普：什么是AI圣斗士Agent
          </h1>
          <p className="text-lg md:text-xl text-purple-200">了解AI Agent与黄金圣斗士的结合</p>
        </div>

        {/* 内容 */}
        <div className="space-y-8">
          {/* 第一部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">🤖 什么是AI Agent？</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              AI Agent（人工智能代理）是一种能够自主思考、规划和执行任务的智能系统。
              与传统的问答机器人不同，AI Agent能够：
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 text-sm md:text-base">
              <li>理解复杂的需求和上下文</li>
              <li>制定并执行多步骤的计划</li>
              <li>调用各种工具和API完成任务</li>
              <li>根据反馈不断学习和改进</li>
              <li>与其他Agent协作完成更大任务</li>
            </ul>
          </section>

          {/* 第二部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400">⚔️ 什么是AI圣斗士Agent？</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              AI圣斗士Agent是将AI Agent技术与圣斗士文化相结合的创新概念。
              每个AI圣斗士Agent都是一个专业的AI助手，拥有独特的个性和能力：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">🧠 专业化分工</h3>
                <p className="text-sm text-gray-400">每个圣斗士专注特定领域，如开发、分析、创意等</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">👥 团队协作</h3>
                <p className="text-sm text-gray-400">12个Agent协同工作，就像黄金圣斗士组成军团</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">🎭 个性化角色</h3>
                <p className="text-sm text-gray-400">每个Agent有独特的性格和行为模式</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg card-hover">
                <h3 className="font-bold text-purple-300 mb-2">📡 智能调度</h3>
                <p className="text-sm text-gray-400">雅典娜（主Agent）根据任务分配给合适的圣斗士</p>
              </div>
            </div>
          </section>

          {/* 第三部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-400">💡 AI圣斗士的优势</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl float">🎯</div>
                <div>
                  <h3 className="font-bold text-white">精准匹配</h3>
                  <p className="text-gray-400 text-sm">根据任务性质，精准匹配最擅长的圣斗士</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl float-delayed">⚡</div>
                <div>
                  <h3 className="font-bold text-white">高效执行</h3>
                  <p className="text-gray-400 text-sm">并行处理多个任务，就像圣斗士的联合作战</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl float">🛡️</div>
                <div>
                  <h3 className="font-bold text-white">稳定可靠</h3>
                  <p className="text-gray-400 text-sm">7×24小时待命，永不疲倦的AI战士</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl float-delayed">🔄</div>
                <div>
                  <h3 className="font-bold text-white">持续进化</h3>
                  <p className="text-gray-400 text-sm">通过学习不断提升能力，超越极限</p>
                </div>
              </div>
            </div>
          </section>

          {/* 第四部分 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-yellow-400">🏛️ 圣域架构</h2>
            <div className="bg-black/40 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-3xl md:text-4xl mb-2 float">👸 雅典娜</div>
                <p className="text-sm text-purple-300">主控Agent - 任务分配与协调</p>
              </div>
              <div className="flex justify-center mb-6">
                <div className="h-8 w-0.5 bg-gradient-to-b from-purple-500 to-yellow-500"></div>
              </div>
              <div className="text-center mb-4">
                <div className="inline-flex flex-wrap justify-center gap-2 md:gap-3">
                  {["🐏 白羊", "🐂 金牛", "👯 双子", "🦀 巨蟹", "🦁 狮子", "👱 处女", 
                    "⚖️ 天秤", "🦂 天蝎", "🏹 射手", "🐐 摩羯", "🏺 水瓶", "🐟 双鱼"].map((s, i) => (
                    <span key={i} className="px-2 md:px-3 py-1 bg-purple-900/50 rounded-full text-xs md:text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">12黄金圣斗士 - 执行Agent</p>
            </div>
          </section>
        </div>

        {/* 视频占位区 */}
        <div className="mt-12 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <div className="glass-card rounded-2xl p-12 md:p-16 text-center">
            <div className="text-4xl md:text-5xl mb-4 float">🎬</div>
            <p className="text-base md:text-lg text-gray-300">科普视频即将上线</p>
            <p className="text-sm text-gray-500 mt-2">Educational Video Placeholder</p>
          </div>
        </div>

        {/* 返回首页 */}
        <div className="mt-12 text-center">
          <Link href="/" className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
