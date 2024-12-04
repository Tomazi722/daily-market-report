import akshare as ak
import json
import pandas as pd

# 获取三大指数的数据，分别获取上证指数、深证成指、创业板指的近5日数据
def get_indices_data():
    try:
        # 获取上证指数的近5日数据
        sz_index = ak.stock_zh_index_daily(symbol="sh000001")  # 上证指数
        sz_index = sz_index[['date', 'close']].rename(columns={'close': '上证指数'})
        sz_index['date'] = pd.to_datetime(sz_index['date'])  # 转换日期格式为 datetime
        sz_index['date'] = sz_index['date'].dt.strftime('%Y-%m-%d')  # 将日期转换为字符串格式
        sz_index = sz_index.tail(5)  # 取最近5日的数据

        # 获取深证成指的近5日数据
        szci_index = ak.stock_zh_index_daily(symbol="sz399001")  # 深证成指
        szci_index = szci_index[['date', 'close']].rename(columns={'close': '深证成指'})
        szci_index['date'] = pd.to_datetime(szci_index['date'])  # 转换日期格式为 datetime
        szci_index['date'] = szci_index['date'].dt.strftime('%Y-%m-%d')  # 将日期转换为字符串格式
        szci_index = szci_index.tail(5)  # 取最近5日的数据

        # 获取创业板指的近5日数据
        cyb_index = ak.stock_zh_index_daily(symbol="sz399006")  # 创业板指
        cyb_index = cyb_index[['date', 'close']].rename(columns={'close': '创业板指'})
        cyb_index['date'] = pd.to_datetime(cyb_index['date'])  # 转换日期格式为 datetime
        cyb_index['date'] = cyb_index['date'].dt.strftime('%Y-%m-%d')  # 将日期转换为字符串格式
        cyb_index = cyb_index.tail(5)  # 取最近5日的数据

        # 合并三大指数数据
        indices_data = pd.merge(sz_index, szci_index, on='date')
        indices_data = pd.merge(indices_data, cyb_index, on='date')

        return indices_data
    except Exception as e:
        print(f"Error fetching indices data: {e}")
        return None

# 获取行业资金流（根据净流入资金排名前五）
def get_industry_fund_flow():
    try:
        # 获取行业资金流排名
        df = ak.stock_sector_fund_flow_rank(indicator="今日", sector_type="行业资金流")
        df = df[['名称', '今日主力净流入-净额', '今日主力净流入最大股']]
        df = df.nlargest(5, '今日主力净流入-净额')  # 获取净流入最多的前5个概念
        return df
    except Exception as e:
        print(f"Error fetching industry fund flow data: {e}")
        return None

# 获取概念资金流（根据净流入资金排名前五）
def get_concept_fund_flow():
    try:
        # 获取概念资金流排名
        df = ak.stock_sector_fund_flow_rank(indicator="今日", sector_type="概念资金流")  # 用 "概念" 获取概念板块资金流
        df = df[['名称', '今日主力净流入-净额', '今日主力净流入最大股']]
        df = df.nlargest(5, '今日主力净流入-净额')  # 获取净流入最多的前5个概念
        return df
    except Exception as e:
        print(f"Error fetching concept fund flow data: {e}")
        return None

# 主程序
def main():
    # 获取三大指数的近五日数据
    indices_data = get_indices_data()

    # 获取行业资金流的前五个
    industry_fund_flow_df = get_industry_fund_flow()

    # 获取概念资金流的前五个
    concept_fund_flow_df = get_concept_fund_flow()

    if indices_data is not None and industry_fund_flow_df is not None and concept_fund_flow_df is not None:
        # 格式化数据并保存为 JSON
        market_data = {
            "indices": indices_data.to_dict(orient="records"),
            "industry_fund_flow": industry_fund_flow_df.to_dict(orient="records"),
            "concept_fund_flow": concept_fund_flow_df.to_dict(orient="records"),
        }

        # 保存为 JSON 文件
        with open('market_data.json', 'w', encoding='utf-8') as f:
            json.dump(market_data, f, ensure_ascii=False, indent=4)
        print("Market data updated successfully!")
    else:
        print("Failed to fetch all required data.")

if __name__ == "__main__":
    main()
