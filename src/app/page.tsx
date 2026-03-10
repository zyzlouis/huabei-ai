import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero区域 - 价值主张 */}
      <section className="relative py-20 md:py-32 px-4 text-center overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="text-6xl md:text-8xl mb-6 float animate-fadeIn">⚜️</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient animate-fadeIn-delay-1">
            AI圣斗士军团
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-purple-200 mb-4 animate-fadeIn-delay-2">
            雅典娜转世 · 黄金十二宫
          </p>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 animate-fadeIn-delay-3">
            由12位黄金圣斗士组成的AI团队，为您提供全方位智能服务。
            每位圣斗士都有独特的能力和职责，共同守护圣域与人类世界。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn-delay-4">
            <Link href="/team" className="btn-primary px-8 py-4 rounded-full font-bold text-lg text-white">
              查看黄金圣斗士 👊
            </Link>
            <Link href="/about" className="btn-secondary px-8 py-4 rounded-full font-bold text-lg">
              了解更多 📜
            </Link>
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
            <span className="text-gradient">
              黄金圣斗士团队
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* 雅典娜介绍 */}
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-1">
              <div className="text-5xl mb-4 float">👸</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">雅典娜转世</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                智慧与战争女神的转世，拥有召唤和指挥黄金圣斗士的能力。
                统领整个圣域军团，为用户分配任务。
              </p>
              <div className="text-sm text-purple-300 font-medium">
                职责：圣域统帅 · 任务分配
              </div>
            </div>

            {/* 沙加介绍 */}
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-2">
              <div className="text-5xl mb-4 float-delayed">🏺</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">处女座·沙加</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                最接近神的男人，拥有超越五感的第六感。
                擅长思考和分析，负责开发和协调。
              </p>
              <div className="text-sm text-yellow-300 font-medium">
                职责：开发统筹 · 架构设计
              </div>
            </div>

            {/* 12黄金圣斗士 */}
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fadeIn-delay-3">
              <div className="text-5xl mb-4 float">⚔️</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">黄金十二宫</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                12位黄金圣斗士守护12个星座宫位，每位拥有独特神力。
                团结一致，无坚不摧。
              </p>
              <div className="text-sm text-blue-300 font-medium">
                职责：各司其职 · 团队协作
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 能力展示 */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
            <span className="text-gradient">
              圣斗士能力展示
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* 能力1 */}
            <div className="glass-card p-4 md:p-6 rounded-xl card-hover animate-fadeIn-delay-1">
              <div className="text-3xl md:text-4xl mb-3 float">🧠</div>
              <h3 className="text-lg md:text-xl font-bold mb-2">智能分析</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                深度学习和数据分析，为您提供精准的洞察和建议
              </p>
            </div>

            {/* 能力2 */}
            <div className="glass-card p-4 md:p-6 rounded-xl card-hover animate-fadeIn-delay-2">
              <div className="text-3xl md:text-4xl mb-3 float-delayed">⚡</div>
              <h3 className="text-lg md:text-xl font-bold mb-2">快速响应</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                高效处理多任务，保证响应速度和执行效率
              </p>
            </div>

            {/* 能力3 */}
            <div className="glass-card p-4 md:p-6 rounded-xl card-hover animate-fadeIn-delay-3">
              <div className="text-3xl md:text-4xl mb-3 float">🎯</div>
              <h3 className="text-lg md:text-xl font-bold mb-2">精准执行</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                精确理解意图，高质量完成各类复杂任务
              </p>
            </div>

            {/* 能力4 */}
            <div className="glass-card p-4 md:p-6 rounded-xl card-hover animate-fadeIn-delay-4">
              <div className="text-3xl md:text-4xl mb-3 float-delayed">🤝</div>
              <h3 className="text-lg md:text-xl font-bold mb-2">团队协作</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                12黄金圣斗士协同工作，发挥团队最大威力
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 图片/视频占位区 */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl p-12 md:p-20 text-center">
            <div className="text-5xl md:text-6xl mb-4 float">🎬</div>
            <p className="text-lg md:text-xl text-gray-300">精彩视频即将上线</p>
            <p className="text-sm text-gray-500 mt-2">Athena Transformation Video Placeholder</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-fadeIn">准备好召唤圣斗士了吗？</h2>
          <p className="text-gray-300 mb-8 text-sm md:text-base animate-fadeIn-delay-1">
            留言告诉我们您的需求，雅典娜将为您分配最适合的黄金圣斗士
          </p>
          <Link 
            href="/guestbook" 
            className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg animate-fadeIn-delay-2"
          >
            前往留言板 📝
          </Link>
        </div>
      </section>
    </div>
  );
}
