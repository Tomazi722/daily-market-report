import akshare as ak
import json
from datetime import datetime, timedelta

def get_market_data():
    # 获取当前日期和五天前的日期
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d')

    # 获取三大指数近五日数据
    indices_data = ak.stock_zh_index_daily_tx(symbol="sh000001", start_date=start_date, end_date=end_date)[['date', 'close']]
    indices_data = indices_data.rename(columns={"close": "上证指数"})
    
    # 传递start_date和end_date来确保数据的正确性
    indices_data['深证成指'] = ak.stock_zh_index_daily_tx(symbol="sz399001", start_date=start_date, end_date=end_date)[['close']].values
    indices_data['创业板指'] = ak.stock_zh_index_daily_tx(symbol="czse399006", start_date=start_date, end_date=end_date)[['close']].values

    # 获取概念资金流数据
    concept_fund_flow = ak.stock_fund_flow_concept(symbol="即时")
    concept_fund_flow = concept_fund_flow[['行业', '流入资金', '流出资金', '净额']].head(5)
    concept_fund_flow.columns = ['行业', '流入资金', '流出资金', '净流入_流出']

    # 获取行业资金流数据
    industry_fund_flow = ak.stock_fund_flow_industry(symbol="即时")
    industry_fund_flow = industry_fund_flow[['行业', '流入资金', '流出资金', '净额']].head(5)
    industry_fund_flow.columns = ['行业', '流入资金', '流出资金', '净流入_流出']

    # 创建市场数据字典
    market_data = {
        "indices": indices_data.to_dict(orient="records"),
        "concept_fund_flow": concept_fund_flow.to_dict(orient="records"),
        "industry_fund_flow": industry_fund_flow.to_dict(orient="records")
    }

    # 保存为 JSON 文件
    with open("market_data.json", "w", encoding="utf-8") as f:
        json.dump(market_data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    get_market_data()
