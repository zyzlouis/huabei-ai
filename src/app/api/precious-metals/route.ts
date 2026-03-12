import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// 模拟贵金属价差数据（演示版本）
function generateMockData() {
  const base = 476 + (Math.random() - 0.5) * 2
  const pairs = [
    { id: '1', name: '公斤条 VS RMB美黄金', left: '公斤条', right: 'RMB美黄金' },
    { id: '2', name: '公斤条 VS 水贝金', left: '公斤条', right: '水贝金' },
    { id: '3', name: 'RMB美黄金 VS 水贝金', left: 'RMB美黄金', right: '水贝金' },
    { id: '4', name: '公斤条 VS 沪金主力', left: '公斤条', right: '沪金主力' },
    { id: '5', name: 'RMB美黄金 VS 黄金TD', left: 'RMB美黄金', right: '黄金TD' },
    { id: '6', name: '水贝金 VS 黄金9999', left: '水贝金', right: '黄金9999' },
  ]

  return pairs.map(pair => {
    const spread = parseFloat(((Math.random() - 0.5) * 4).toFixed(2))
    const prices = [
      parseFloat((base + (Math.random() - 0.5) * 0.5).toFixed(2)),
      parseFloat((base + (Math.random() - 0.5) * 0.5).toFixed(2)),
      parseFloat((base + (Math.random() - 0.5) * 0.5).toFixed(2)),
      parseFloat((base + (Math.random() - 0.5) * 0.5).toFixed(2)),
    ]
    return {
      ...pair,
      spread,
      spreadPercent: parseFloat((spread / base * 100).toFixed(4)),
      prices: prices.map((p, i) => ({
        time: i === 3 ? '现价' : `${(3 - i) * 5}分钟前`,
        price: p,
        change: parseFloat(((Math.random() - 0.5) * 0.5).toFixed(2)),
      })),
    }
  })
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: generateMockData(),
    timestamp: Date.now(),
    source: 'demo',
  })
}
