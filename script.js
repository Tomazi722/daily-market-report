// 获取后端传来的市场数据
async function fetchMarketData() {
    try {
        // 假设你的后端接口是 '/market_data.json'，通过 fetch 获取数据
        const response = await fetch('/market_data.json');
        const marketData = await response.json();
        
        if (marketData) {
            renderIndicesChart(marketData.indices);
            renderFundFlowTable(marketData.industry_fund_flow, marketData.concept_fund_flow);
        }
    } catch (error) {
        console.error("Error fetching market data:", error);
    }
}

function renderIndicesChart(indicesData) {
    // 上证指数图
    let szIndexChart = echarts.init(document.getElementById('sz-index-chart'));
    szIndexChart.setOption({
        title: { text: '上证指数近5日', subtext: '数据来自 Akshare' },
        xAxis: { type: 'category', data: indicesData.map(item => item.date) },
        yAxis: { type: 'value' },
        series: [{
            data: indicesData.map(item => item["上证指数"]),
            type: 'line'
        }]
    });

    // 深证成指图
    let szciIndexChart = echarts.init(document.getElementById('szci-index-chart'));
    szciIndexChart.setOption({
        title: { text: '深证成指近5日', subtext: '数据来自 Akshare' },
        xAxis: { type: 'category', data: indicesData.map(item => item.date) },
        yAxis: { type: 'value' },
        series: [{
            data: indicesData.map(item => item["深证成指"]),
            type: 'line'
        }]
    });

    // 创业板指图
    let cybIndexChart = echarts.init(document.getElementById('cyb-index-chart'));
    cybIndexChart.setOption({
        title: { text: '创业板指近5日', subtext: '数据来自 Akshare' },
        xAxis: { type: 'category', data: indicesData.map(item => item.date) },
        yAxis: { type: 'value' },
        series: [{
            data: indicesData.map(item => item["创业板指"]),
            type: 'line'
        }]
    });
}

function renderFundFlowTable(industryFundFlow, conceptFundFlow) {
    // 渲染行业资金流
    let industryTable = document.getElementById('industry-fund-flow').getElementsByTagName('tbody')[0];
    industryFundFlow.forEach(item => {
        let row = industryTable.insertRow();
        row.insertCell(0).textContent = item.名称;
        row.insertCell(1).textContent = item["今日主力净流入-净额"].toLocaleString();
        row.insertCell(2).textContent = item["今日主力净流入最大股"];
    });

    // 渲染概念资金流
    let conceptTable = document.getElementById('concept-fund-flow').getElementsByTagName('tbody')[0];
    conceptFundFlow.forEach(item => {
        let row = conceptTable.insertRow();
        row.insertCell(0).textContent = item.名称;
        row.insertCell(1).textContent = item["今日主力净流入-净额"].toLocaleString();
        row.insertCell(2).textContent = item["今日主力净流入最大股"];
    });
}

// 页面加载时渲染图表和表格
document.addEventListener('DOMContentLoaded', function() {
    fetchMarketData();
});
