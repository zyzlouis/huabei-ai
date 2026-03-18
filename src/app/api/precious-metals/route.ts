import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// 模拟贵金属价差数据（演示版本）
function generateMockData() {
  const base = 476 + (Math.random() - 0.5) * 2

  function generatePricePoint(basePrice: number, timeOffset: number) {
    const price = basePrice + (Math.random() - 0.5) * 0.5
    const change = price - basePrice + (Math.random() - 0.5) * 0.5
    return {
      time: timeOffset === 0 ? '现价' : `${timeOffset * 5}分钟前`,
      price: Number(price.toFixed(2)),
      change: Number(change.toFixed(2)),
    }
  }

  const basePrices: Record<string, number> = {
    '公斤条': 475.5,
    'RMB美黄金': 475.8,
    '水贝金': 476.0,
    '沪金主力': 476.2,
    '黄金TD': 475.9,
    '黄金9999': 476.1,
  }

  const pairDefs = [
    { id: '1', name: '公斤条 vs RMB美黄金', left: '公斤条', right: 'RMB美黄金' },
    { id: '2', name: '公斤条 vs 水贝金', left: '公斤条', right: '水贝金' },
    { id: '3', name: 'RMB美黄金 vs 水贝金', left: 'RMB美黄金', right: '水贝金' },
    { id: '4', name: '公斤条 vs 沪金主力', left: '公斤条', right: '沪金主力' },
    { id: '5', name: 'RMB美黄金 vs 黄金TD', left: 'RMB美黄金', right: '黄金TD' },
    { id: '6', name: '水贝金 vs 黄金9999', left: '水贝金', right: '黄金9999' },
  ]

  const pairs = pairDefs.map(({ id, name, left, right }) => {
    const leftBase = basePrices[left] || 476
    const rightBase = basePrices[right] || 476

    const prices: Array<{ time: string; price: number; change: number }> = [
      generatePricePoint(leftBase, 15),
      generatePricePoint(leftBase, 10),
      generatePricePoint(leftBase, 5),
      generatePricePoint(leftBase, 0),
    ]

    const currentSpread = prices[3].price - rightBase + (Math.random() - 0.5) * 0.5
    const spreadPercent = (currentSpread / rightBase) * 100

    return {
      id,
      name,
      pair: [left, right],
      prices: prices as [typeof prices[0], typeof prices[0], typeof prices[0], typeof prices[0]],
      spread: Number(currentSpread.toFixed(2)),
      spreadPercent: Number(spreadPercent.toFixed(4)),
    }
  })

  return pairs
}

export async function GET() {
  return NextResponse.json({
    success: true,
    timestamp: Date.now(),
    raw: {
      gold_sge: Number((476 + (Math.random() - 0.5) * 2).toFixed(2)),
    },
    pairs: generateMockData(),
  })
}
