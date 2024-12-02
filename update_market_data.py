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

    # 上证指数
    try:
        sh_df = ak.index_zh_a_hist(symbol="sh000001", period="daily", start_date=start_date, end_date=end_date)
        print(sh_df)
        if sh_df is None or sh_df.empty:
            print(f"Error: No data returned for 上证指数 (sh000001) from {start_date} to {end_date}")
            sh_df = pd.DataFrame()  # 空数据框
        else:
            sh_df['日期'] = pd.to_datetime(sh_df['日期'])
            sh_df['日期'] = sh_df['日期'].dt.strftime('%Y-%m-%d')
    except Exception as e:
        print(f"Error fetching 上证指数 data: {e}")
        sh_df = pd.DataFrame()  # 空数据框

    # 深证成指
    try:
        sz_df = ak.index_zh_a_hist(symbol="sz399001", period="daily", start_date=start_date, end_date=end_date)
        if sz_df is None or sz_df.empty:
            print(f"Error: No data returned for 深证成指 (sz399001) from {start_date} to {end_date}")
            sz_df = pd.DataFrame()  # 空数据框
        else:
            sz_df['日期'] = pd.to_datetime(sz_df['日期'])
            sz_df['日期'] = sz_df['日期'].dt.strftime('%Y-%m-%d')
    except Exception as e:
        print(f"Error fetching 深证成指 data: {e}")
        sz_df = pd.DataFrame()  # 空数据框

    # 创业板指数
    try:
        cyb_df = ak.index_zh_a_hist(symbol="sz399006", period="daily", start_date=start_date, end_date=end_date)
        if cyb_df is None or cyb_df.empty:
            print(f"Error: No data returned for 创业板指数 (sz399006) from {start_date} to {end_date}")
            cyb_df = pd.DataFrame()  # 空数据框
        else:
            cyb_df['日期'] = pd.to_datetime(cyb_df['日期'])
            cyb_df['日期'] = cyb_df['日期'].dt.strftime('%Y-%m-%d')
    except Exception as e:
        print(f"Error fetching 创业板指数 data: {e}")
        cyb_df = pd.DataFrame()  # 空数据框

    # 返回数据
    # 这里根据您的需求，将数据转换为指定的格式
    return {
        "sh": sh_df[['日期', '收盘', '涨跌幅']].to_dict(orient='records'),
        "sz": sz_df[['日期', '收盘', '涨跌幅']].to_dict(orient='records'),
        "cyb": cyb_df[['日期', '收盘', '涨跌幅']].to_dict(orient='records')
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
