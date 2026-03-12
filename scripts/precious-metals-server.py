#!/usr/bin/env python3
"""
贵金属价格数据获取脚本
使用AKShare获取真实市场数据
"""
import json
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
import akshare as ak

def get_precious_metals_data():
    """获取贵金属实时数据"""
    result = {
        "success": True,
        "timestamp": int(time.time() * 1000),
        "data": {
            "gold": {},
            "silver": {}
        }
    }
    
    try:
        # 上海金基准价
        df_gold = ak.spot_golden_benchmark_sge()
        if len(df_gold) > 0:
            latest = df_gold.iloc[-1]
            result["data"]["gold"]["sge_morning"] = float(latest["早盘价"])
            result["data"]["gold"]["sge_evening"] = float(latest["晚盘价"])
            result["data"]["gold"]["date"] = str(latest["交易时间"])
    except Exception as e:
        result["data"]["gold"]["error"] = str(e)
    
    try:
        # 白银基准价
        df_silver = ak.spot_silver_benchmark_sge()
        if len(df_silver) > 0:
            latest = df_silver.iloc[-1]
            result["data"]["silver"]["sge_morning"] = float(latest["早盘价"])
            result["data"]["silver"]["sge_evening"] = float(latest["晚盘价"])
            result["data"]["silver"]["date"] = str(latest["交易时间"])
    except Exception as e:
        result["data"]["silver"]["error"] = str(e)
    
    # 模拟价差数据（基于真实价格）
    if "sge_morning" in result["        base_price = result["data"]["gold"]["sge_morning"]
data"]["gold"]:
        result["data"]["pairs"] = [
            {
                "id": "1",
                "name": "公斤条 vs RMB美黄金",
                "pair": ["公斤条", "RMB美黄金"],
                "prices": [
                    {"time": "15分钟前", "price": base_price - 0.3, "change": -0.15},
                    {"time": "10分钟前", "price": base_price - 0.2, "change": -0.1},
                    {"time": "5分钟前", "price": base_price - 0.1, "change": -0.05},
                    {"time": "现价", "price": base_price, "change": 0}
                ],
                "spread": 0.5,
                "spreadPercent": 0.04
            },
            {
                "id": "2",
                "name": "公斤条 vs 水贝金",
                "pair": ["公斤条", "水贝金"],
                "prices": [
                    {"time": "15分钟前", "price": base_price - 0.5, "change": -0.25},
                    {"time": "10分钟前", "price": base_price - 0.3, "change": -0.15},
                    {"time": "5分钟前", "price": base_price - 0.2, "change": -0.1},
                    {"time": "现价", "price": base_price - 0.1, "change": 0}
                ],
                "spread": 0.8,
                "spreadPercent": 0.07
            }
        ]
    
    return result

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/precious-metals':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            data = get_precious_metals_data()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def log_message(self, format, *args):
        pass  # 禁用日志

if __name__ == '__main__':
    PORT = 3456
    server = HTTPServer(('0.0.0.0', PORT), RequestHandler)
    print(f"贵金属数据服务启动: http://localhost:{PORT}/api/precious-metals")
    server.serve_forever()
