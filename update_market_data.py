import akshare as ak
import pandas as pd
import json
from datetime import datetime, timedelta

def get_index_history():
    # 获取上证指数、深证成指、创业板指的近30个交易日的收盘价
    indices = {
        'sh000001': '上证指数',
        'sz399001': '深证成指',
        'sz399006': '创业板指'
    }
    end_date = datetime.now().strftime('%Y%m%d')
    start_date = (datetime.now() - timedelta(days=60)).strftime('%Y%m%d')  # 获取近60天的数据，考虑到非交易日
    index_history = {}
    for code, name in indices.items():
        df = ak.stock_zh_index_daily(symbol=code)
        df = df.reset_index()
        df['date'] = df['date'].dt.strftime('%Y-%m-%d')
        df = df[(df['date'] >= start_date) & (df['date'] <= end_date)]
        df = df.tail(30)  # 获取最近30个交易日的数据
        index_history[name] = {
            'dates': df['date'].tolist(),
            'close': df['close'].tolist()
        }
    return index_history

def main():
    data = []
    
    # 获取并添加指数历史数据
    index_history = get_index_history()
    index_history_section = {
        'title': '指数历史数据',
        'type': 'index_history',
        'content': index_history
    }
    data.append(index_history_section)

    # 保存数据到JSON文件
    with open('data/market_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
