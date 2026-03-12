#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import akshare as ak

try:
    result = {"success": True, "data": {}}
    
    # 上海金基准价
    df_gold = ak.spot_golden_benchmark_sge()
    if len(df_gold) > 0:
        latest = df_gold.iloc[-1]
        result["data"]["gold_sge"] = float(latest["早盘价"])
        result["data"]["gold_date"] = str(latest["交易时间"])
    
    # 白银基准价
    df_silver = ak.spot_silver_benchmark_sge()
    if len(df_silver) > 0:
        latest = df_silver.iloc[-1]
        result["data"]["silver_sge"] = float(latest["早盘价"])
        result["data"]["silver_date"] = str(latest["交易时间"])
    
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"success": False, "error": str(e)}))
