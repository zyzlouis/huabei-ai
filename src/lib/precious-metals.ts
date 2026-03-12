// 贵金属价格模拟数据

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

// 基础价格（模拟）
const basePrices: Record<string, number> = {
  '公斤条': 475.5,
  'RMB美黄金': 475.8,
  '水贝金': 476.0,
  '沪金主力': 476.2,
  '黄金TD': 475.9,
  '黄金9999': 476.1,
}

// 生成随机波动
function randomWalk(base: number, volatility: number = 0.3): number {
  const change = (Math.random() - 0.5) * 2 * volatility
  return base + change
}

// 生成价格点
function generatePricePoint(basePrice: number, timeOffset: number): PricePoint {
  const price = randomWalk(basePrice, 0.2 + timeOffset * 0.05)
  const change = price - basePrice + (Math.random() - 0.5) * 0.5
  return {
    time: timeOffset === 0 ? '现价' : `${timeOffset * 5}分钟前`,
    price: Number(price.toFixed(2)),
    change: Number(change.toFixed(2)),
  }
}

// 生成价差交易对数据
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

// 所有价差交易对
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

// 获取实时价格（带实时更新）
export function generateMockPrices(): SpreadPair[] {
  return getAllSpreadPairs()
}
