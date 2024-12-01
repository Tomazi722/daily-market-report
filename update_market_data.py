import json
import akshare as ak
import pandas as pd
from datetime import datetime, timedelta

# 获取当前日期并计算六个月前的日期
def get_date_range():
    end_date = datetime.today()
    start_date = end_date - timedelta(days=180)  # 半年前的日期
    return start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')
def get_index_history():
    start_date, end_date = get_date_range()
    # 获取上证、深证、创业板指数的历史数据
    index_symbols = {
        'sh': '000001',  # 上证指数
        'sz': '399001',  # 深证成指
        'cyb': '399006'  # 创业板
    }
    
    index_data = {}
    for name, symbol in index_symbols.items():
        print(f"Fetching data for {name} index...")
        df = ak.index_zh_a_hist(symbol=symbol, period="daily",start_date=start_date, end_date=end_date)  # 移除 adjust="qfq"
        
        # 确保 'date' 列是 datetime 类型
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'], errors='coerce')
            df['date'] = df['date'].dt.strftime('%Y-%m-%d')
        
        # 将 DataFrame 转换为字典
        index_data[name] = df[['日期', '收盘', '涨跌幅']].to_dict(orient='records')

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
    print(market_data)

if __name__ == "__main__":
    main()
