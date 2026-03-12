// 贵金属价格 - 真实API数据

export type PricePoint = {
  time: string
  price: number
  change: number // 涨跌额
}

export type SpreadPair = {
  id: string
  name: string
  pair: [string, string] // [左边, 右边]
  prices: [PricePoint, PricePoint, PricePoint, PricePoint]
  spread: number // 价差
  spreadPercent: number // 价差百分比
}

export type MetalsData = {
  success: boolean
  timestamp: number
  raw: {
    gold_sge?: number
    gold_date?: string
    silver_sge?: number
    silver_date?: string
  }
  pairs: SpreadPair[]
}

// 从API获取真实数据
export async function fetchMetalsData(): Promise<MetalsData> {
  try {
    const response = await fetch('/api/precious-metals', {
      next: { revalidate: 0 } // 不缓存，确保实时
    })
    
    if (!response.ok) {
      throw new Error(`API错误: ${response.status}`)
    }
    
    const data = await response.json()
    return data as MetalsData
  } catch (error) {
    console.error('获取贵金属数据失败:', error)
    // 返回空数据，让UI显示错误状态
    return {
      success: false,
      timestamp: Date.now(),
      raw: {},
      pairs: []
    }
  }
}

// 模拟数据（API失败时的后备）
const basePrices: Record<string, number> = {
  '公斤条': 475.5,
  'RMB美黄金': 475.8,
  '水贝金': 476.0,
  '沪金主力': 476.2,
  '黄金TD': 475.9,
  '黄金9999': 476.1,
}

function randomWalk(base: number, volatility: number = 0.3): number {
  const change = (Math.random() - 0.5) * 2 * volatility
  return base + change
}

function generatePricePoint(basePrice: number, timeOffset: number): PricePoint {
  const price = randomWalk(basePrice, 0.2 + timeOffset * 0.05)
  const change = price - basePrice + (Math.random() - 0.5) * 0.5
  return {
    time: timeOffset === 0 ? '现价' : `${timeOffset * 5}分钟前`,
    price: Number(price.toFixed(2)),
    change: Number(change.toFixed(2)),
  }
}

function generateSpreadPair(
  id: string,
  name: string,
  left: string,
  right: string
): SpreadPair {
  const leftBase = basePrices[left] || 476
  const rightBase = basePrices[right] || 476
  
  const prices: [PricePoint, PricePoint, PricePoint, PricePoint] = [
    generatePricePoint(leftBase, 15),
    generatePricePoint(leftBase, 10),
    generatePricePoint(leftBase, 5),
    generatePricePoint(leftBase, 0),
  ]
  
  const rightPrices: [PricePoint, PricePoint, PricePoint, PricePoint] = [
    generatePricePoint(rightBase, 15),
    generatePricePoint(rightBase, 10),
    generatePricePoint(rightBase, 5),
    generatePricePoint(rightBase, 0),
  ]
  
  const currentSpread = prices[3].price - rightPrices[3].price
  const spreadPercent = (currentSpread / rightPrices[3].price) * 100
  
  return {
    id,
    name,
    pair: [left, right],
    prices: prices as [PricePoint, PricePoint, PricePoint, PricePoint],
    spread: Number(currentSpread.toFixed(2)),
    spreadPercent: Number(spreadPercent.toFixed(4)),
  }
}

export function getAllSpreadPairs(): SpreadPair[] {
  return [
    generateSpreadPair('1', '公斤条 vs RMB美黄金', '公斤条', 'RMB美黄金'),
    generateSpreadPair('2', '公斤条 vs 水贝金', '公斤条', '水贝金'),
    generateSpreadPair('3', 'RMB美黄金 vs 水贝金', 'RMB美黄金', '水贝金'),
    generateSpreadPair('4', '公斤条 vs 沪金主力', '公斤条', '沪金主力'),
    generateSpreadPair('5', 'RMB美黄金 vs 黄金TD', 'RMB美黄金', '黄金TD'),
    generateSpreadPair('6', '水贝金 vs 黄金9999', '水贝金', '黄金9999'),
  ]
}

// 后备模拟数据（仅当API失败时使用）
export function generateMockPrices(): SpreadPair[] {
  return getAllSpreadPairs()
}
