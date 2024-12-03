import akshare as ak
import json
import pandas as pd
import datetime

# 获取概念资金流数据
def get_concept_fund_flow(symbol="即时"):
    try:
        df = ak.stock_fund_flow_concept(symbol=symbol)
        # 选择所需的列并格式化数据
        df = df[['序号', '行业', '行业指数', '行业-涨跌幅', '流入资金', '流出资金', '净额', '公司家数', '领涨股', '领涨股-涨跌幅', '当前价']]
        return df
    except Exception as e:
        print(f"Error fetching concept fund flow data: {e}")
        return None

# 获取行业资金流数据
def get_industry_fund_flow(symbol="即时"):
    try:
        df = ak.stock_fund_flow_industry(symbol=symbol)
        # 选择所需的列并格式化数据
        df = df[['序号', '行业', '行业指数', '行业-涨跌幅', '流入资金', '流出资金', '净额', '公司家数', '领涨股', '领涨股-涨跌幅', '当前价']]
        return df
    except Exception as e:
        print(f"Error fetching industry fund flow data: {e}")
        return None

def main():
    # 设置日期范围
    end_date = datetime.datetime.today().strftime('%Y-%m-%d')
    start_date = (datetime.datetime.today() - datetime.timedelta(days=180)).strftime('%Y-%m-%d')

    # 获取概念资金流数据
    concept_fund_flow_df = get_concept_fund_flow(symbol="即时")
    # 获取行业资金流数据
    industry_fund_flow_df = get_industry_fund_flow(symbol="即时")

    if concept_fund_flow_df is not None and industry_fund_flow_df is not None:
        # 格式化数据并保存为 JSON
        market_data = {
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
