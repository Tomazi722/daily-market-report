import json
import akshare as ak
import pandas as pd

def get_index_history():
    # 获取上证、深证、创业板指数的历史数据
    index_symbols = {
        'sh': '000001',  # 上证指数
        'sz': '399001',  # 深证成指
        'cyb': '399006'  # 创业板
    }
    
    index_data = {}
    for name, symbol in index_symbols.items():
        print(f"Fetching data for {name} index...")
        df = ak.index_zh_a_hist(symbol=symbol, period="daily", adjust="qfq")
        
        # 确保 'date' 列是 datetime 类型
        df['date'] = pd.to_datetime(df['date'], errors='coerce')
        
        # 格式化 'date' 列
        df['date'] = df['date'].dt.strftime('%Y-%m-%d')
        
        # 提取所需的字段
        index_data[name] = df[['date', 'close', 'pct_chg']]

    return index_data

def save_market_data_to_json(market_data):
    print("Saving market data to JSON...")
    with open('market_data.json', 'w', encoding='utf-8') as f:
        json.dump(market_data, f, ensure_ascii=False, indent=4)

def main():
    print("Starting market data update...")
    market_data = get_index_history()
    save_market_data_to_json(market_data)
    print("Market data updated successfully!")

if __name__ == "__main__":
    main()
