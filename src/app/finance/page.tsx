'use client'

import { useEffect, useState } from 'react'
import { SpreadPair, generateMockPrices } from '@/lib/precious-metals'
import Link from 'next/link'

function SpreadCard({ pair }: { pair: SpreadPair }) {
  const [data, setData] = useState<SpreadPair>(pair)
  
  // 定时刷新数据
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockPrices().find(p => p.id === pair.id) || pair)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [pair.id, pair])
  
  const spreadClass = data.spread >= 0 ? 'text-green-400' : 'text-red-400'
  
  return (
    <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-amber-400">{data.name}</h3>
          <div className="text-sm text-gray-400 mt-1">
            {data.pair[0]} vs {data.pair[1]}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${spreadClass}`}>
            {data.spread > 0 ? '+' : ''}{data.spread}
          </div>
          <div className={`text-sm ${spreadClass}`}>
            {data.spreadPercent > 0 ? '+' : ''}{data.spreadPercent}%
          </div>
        </div>
      </div>
      
      {/* 4个价格点 */}
      <div className="grid grid-cols-4 gap-2">
        {data.prices.map((point, idx) => (
          <div key={idx} className="text-center bg-black/20 rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-1">{point.time}</div>
            <div className="font-mono text-sm text-purple-200">{point.price.toFixed(2)}</div>
            <div className={`text-xs ${point.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {point.change >= 0 ? '+' : ''}{point.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FinancePage() {
  const [pairs, setPairs] = useState<SpreadPair[]>([])
  const [lastUpdate, setLastUpdate] = useState<string>('')
  
  useEffect(() => {
    const updatePrices = () => {
      setPairs(generateMockPrices())
      setLastUpdate(new Date().toLocaleTimeString('zh-CN'))
    }
    
    updatePrices()
    const interval = setInterval(updatePrices, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 面包屑导航 */}
        <div className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-purple-300">财经投资</span>
        </div>

        {/* 头部 */}
        <header className="text-center mb-12 animate-fadeIn">
          <div className="text-6xl mb-4 float">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            贵金属价差分析
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            实时监控 · 公斤条 / RMB美黄金 / 水贝金
          </p>
          <div className="text-sm text-gray-400 mt-4 glass inline-block px-4 py-2 rounded-full">
            最后更新: {lastUpdate} <span className="text-green-400 ml-2">● 实时</span>
          </div>
        </header>
        
        {/* 价差卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pairs.map(pair => (
            <SpreadCard key={pair.id} pair={pair} />
          ))}
        </div>
        
        {/* 底部说明 */}
        <footer className="glass-card rounded-xl p-8 text-center animate-fadeIn-delay-2">
          <div className="text-4xl mb-3 float-delayed">⚜️</div>
          <p className="text-gray-300 mb-2">
            数据仅供模拟演示，实际交易请以真实市场数据为准
          </p>
          <p className="text-sm text-purple-300 mt-3">
            由处女座·沙加开发 | Powered by 圣域AI军团
          </p>
        </footer>
      </div>
    </div>
  )
}
