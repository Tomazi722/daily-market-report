import akshare as ak
import json
import pandas as pd
import datetime

# 获取三大指数的数据
def get_indices_data():
    try:
        # 获取上证指数、深证成指、创业板指的日线数据
        sz_index = ak.stock_zh_index_daily(symbol="sh000001")  # 上证指数
        sz_index = sz_index[['date', 'close']].rename(columns={'close': '上证指数'})
        
        szci_index = ak.stock_zh_index_daily(symbol="sz399001")  # 深证成指
        szci_index = szci_index[['date', 'close']].rename(columns={'close': '深证成指'})
        
        cyb_index = ak.stock_zh_index_daily(symbol="sz399006")  # 创业板指
        cyb_index = cyb_index[['date', 'close']].rename(columns={'close': '创业板指'})

        # 合并数据
        indices_data = pd.merge(sz_index, szci_index, on='date')
        indices_data = pd.merge(indices_data, cyb_index, on='date')

        # 选择最近一日的收盘数据
        indices_data['date'] = pd.to_datetime(indices_data['date'])
        indices_data = indices_data[indices_data['date'] == indices_data['date'].max()]

        return indices_data
    except Exception as e:
        print(f"Error fetching indices data: {e}")
        return None

# 获取概念资金流数据（流入和流出资金最多的前5个）
def get_concept_fund_flow(symbol="即时"):
    try:
        df = ak.stock_fund_flow_concept(symbol=symbol)
        # 选择所需的列并格式化数据
        df = df[['行业', '流入资金', '流出资金']]
        # 按流入资金和流出资金排序，获取最多的5个
        df = df.nlargest(5, '流入资金')
        return df
    except Exception as e:
        print(f"Error fetching concept fund flow data: {e}")
        return None

# 获取行业资金流数据（流入和流出资金最多的前5个）
def get_industry_fund_flow(symbol="即时"):
    try:
        df = ak.stock_fund_flow_industry(symbol=symbol)
        # 选择所需的列并格式化数据
        df = df[['行业', '流入资金', '流出资金']]
        # 按流入资金和流出资金排序，获取最多的5个
        df = df.nlargest(5, '流入资金')
        return df
    except Exception as e:
        print(f"Error fetching industry fund flow data: {e}")
        return None

def main():
    # 获取三大指数数据
    indices_data = get_indices_data()
    # 获取概念资金流数据
    concept_fund_flow_df = get_concept_fund_flow(symbol="即时")
    # 获取行业资金流数据
    industry_fund_flow_df = get_industry_fund_flow(symbol="即时")

    if indices_data is not None and concept_fund_flow_df is not None and industry_fund_flow_df is not None:
        # 格式化数据并保存为 JSON
        market_data = {
            "indices": indices_data.to_dict(orient="records"),
            "concept_fund_flow": concept_fund_flow_df.to_dict(orient="records"),
            "industry_fund_flow": industry_fund_flow_df.to_dict(orient="records"),
        }

        with open('market_data.json', 'w', encoding='utf-8') as f:
            json.dump(market_data, f, ensure_ascii=False, indent=4)
        print("Market data updated successfully!")
    else:
        print("Failed to fetch all required data.")

if __name__ == "__main__":
    main()
