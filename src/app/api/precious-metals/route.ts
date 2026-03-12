import { NextResponse } from 'next/server'
import { execSync } from 'child_process'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'get-metals.py')
    
    const output = execSync(`python3 "${scriptPath}"`, {
      encoding: 'utf-8',
      timeout: 15000
    })
    
    const parsed = JSON.parse(output)
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 500 })
    }
    
    // 生成价差模拟数据（基于真实金价）
    const basePrice = parsed.data.gold_sge || 475
    const pairs = [
      {
        id: "1",
        name: "公斤条 vs RMB美黄金",
        pair: ["公斤条", "RMB美黄金"],
        prices: [
          { time: "15分钟前", price: basePrice - 0.3, change: -0.15 },
          { time: "10分钟前", price: basePrice - 0.2, change: -0.1 },
          { time: "5分钟前", price: basePrice - 0.1, change: -0.05 },
          { time: "现价", price: basePrice, change: 0 }
        ],
        spread: 0.5,
        spreadPercent: 0.04
      },
      {
        id: "2",
        name: "公斤条 vs 水贝金",
        pair: ["公斤条", "水贝金"],
        prices: [
          { time: "15分钟前", price: basePrice - 0.5, change: -0.25 },
          { time: "10分钟前", price: basePrice - 0.3, change: -0.15 },
          { time: "5分钟前", price: basePrice - 0.2, change: -0.1 },
          { time: "现价", price: basePrice - 0.1, change: 0 }
        ],
        spread: 0.8,
        spreadPercent: 0.07
      },
      {
        id: "3",
        name: "RMB美黄金 vs 水贝金",
        pair: ["RMB美黄金", "水贝金"],
        prices: [
          { time: "15分钟前", price: basePrice + 0.2, change: 0.1 },
          { time: "10分钟前", price: basePrice + 0.1, change: 0.05 },
          { time: "5分钟前", price: basePrice + 0.05, change: 0.02 },
          { time: "现价", price: basePrice + 0.1, change: 0 }
        ],
        spread: -0.3,
        spreadPercent: -0.03
      },
      {
        id: "4",
        name: "公斤条 vs 沪金主力",
        pair: ["公斤条", "沪金主力"],
        prices: [
          { time: "15分钟前", price: basePrice - 0.4, change: -0.2 },
          { time: "10分钟前", price: basePrice - 0.25, change: -0.12 },
          { time: "5分钟前", price: basePrice - 0.15, change: -0.08 },
          { time: "现价", price: basePrice - 0.05, change: 0 }
        ],
        spread: 0.6,
        spreadPercent: 0.05
      },
      {
        id: "5",
        name: "RMB美黄金 vs 黄金TD",
        pair: ["RMB美黄金", "黄金TD"],
        prices: [
          { time: "15分钟前", price: basePrice - 0.2, change: -0.1 },
          { time: "10分钟前", price: basePrice - 0.15, change: -0.08 },
          { time: "5分钟前", price: basePrice - 0.08, change: -0.04 },
          { time: "现价", price: basePrice + 0.02, change: 0 }
        ],
        spread: 0.3,
        spreadPercent: 0.03
      },
      {
        id: "6",
        name: "水贝金 vs 黄金9999",
        pair: ["水贝金", "黄金9999"],
        prices: [
          { time: "15分钟前", price: basePrice - 0.35, change: -0.18 },
          { time: "10分钟前", price: basePrice - 0.2, change: -0.1 },
          { time: "5分钟前", price: basePrice - 0.12, change: -0.06 },
          { time: "现价", price: basePrice - 0.05, change: 0 }
        ],
        spread: 0.4,
        spreadPercent: 0.04
      }
    ]
    
    return NextResponse.json({
      success: true,
      timestamp: Date.now(),
      raw: parsed.data,
      pairs
    })
    
  } catch (error) {
    console.error('贵金属API错误:', error)
    return NextResponse.json(
      { error: '获取数据失败', details: error.message },
      { status: 500 }
    )
  }
}
