import akshare as ak
import pandas as pd
from datetime import datetime, timedelta
import json

# 获取当前日期并计算六个月前的日期
def get_date_range():
    end_date = datetime.today()
    start_date = end_date - timedelta(days=180)  # 半年前的日期
    return start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')

# 获取三大指数的历史数据
def get_index_history():
    # 获取日期范围（近半年）
    start_date, end_date = get_date_range()

    # 获取上证指数历史数据
    sh_df = ak.index_zh_a_hist(symbol="sh000001", period="daily", start_date=start_date, end_date=end_date)
    sh_df['date'] = pd.to_datetime(sh_df['date'])
    sh_df['date'] = sh_df['date'].dt.strftime('%Y-%m-%d')

    # 获取深证成指历史数据
    sz_df = ak.index_zh_a_hist(symbol="sz399001", period="daily", start_date=start_date, end_date=end_date)
    sz_df['date'] = pd.to_datetime(sz_df['date'])
    sz_df['date'] = sz_df['date'].dt.strftime('%Y-%m-%d')

    # 获取创业板指数历史数据
    cyb_df = ak.index_zh_a_hist(symbol="sz399006", period="daily", start_date=start_date, end_date=end_date)
    cyb_df['date'] = pd.to_datetime(cyb_df['date'])
    cyb_df['date'] = cyb_df['date'].dt.strftime('%Y-%m-%d')

    # 返回数据
    return {
        "sh": sh_df[['date', 'close', 'pct_chg']].to_dict(orient='records'),
        "sz": sz_df[['date', 'close', 'pct_chg']].to_dict(orient='records'),
        "cyb": cyb_df[['date', 'close', 'pct_chg']].to_dict(orient='records')
    }

# 保存数据为 JSON 文件
def save_to_json(data, filename='market_data.json'):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# 主函数
def main():
    print("Starting market data update...")
    market_data = get_index_history()  # 获取数据
    save_to_json(market_data)  # 保存为 JSON 文件
    print("Market data update completed.")

# 执行主函数
if __name__ == "__main__":
    main()
