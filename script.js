// 获取后端传来的市场数据
async function fetchMarketData() {
    try {
        // 假设你的后端接口是 '/market_data.json'，通过 fetch 获取数据
        const response = await fetch('/market_data.json');
        const marketData = await response.json();
        
        if (marketData) {
            renderIndicesChart(marketData.indices);
            renderConceptFundFlow(marketData.concept_fund_flow);
            renderIndustryFundFlow(marketData.industry_fund_flow);
        }
    } catch (error) {
        console.error("Error fetching market data:", error);
    }
}

function renderIndicesChart(indicesData) {
    const indicesChart = echarts.init(document.getElementById('indicesChart'));

    const dates = indicesData.map(item => item.date);
    const szIndexData = indicesData.map(item => item["上证指数"]);
    const szciIndexData = indicesData.map(item => item["深证成指"]);
    const cybIndexData = indicesData.map(item => item["创业板指"]);

    const option = {
        title: {
            text: '三大指数近五日走势',
            subtext: '数据来自 Akshare'
        },
        legend: {
            data: ['上证指数', '深证成指', '创业板指']
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: dates
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '上证指数',
                type: 'line',
                data: szIndexData
            },
            {
                name: '深证成指',
                type: 'line',
                data: szciIndexData
            },
            {
                name: '创业板指',
                type: 'line',
                data: cybIndexData
            }
        ]
    };
    
    indicesChart.setOption(option);
}

function renderConceptFundFlow(conceptData) {
    const conceptCardsContainer = document.getElementById('concept-cards');
    conceptCardsContainer.innerHTML = '';

    conceptData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${item.名称}</h3>
            <p>流入资金: ${item["今日主力净流入-净额"]} 亿</p>
            <p>流出资金: ${item["今日主力净流入-净额"]} 亿</p>
        `;
        conceptCardsContainer.appendChild(card);
    });
}

function renderIndustryFundFlow(industryData) {
    const industryCardsContainer = document.getElementById('industry-cards');
    industryCardsContainer.innerHTML = '';

    industryData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${item.名称}</h3>
            <p>流入资金: ${item["今日主力净流入-净额"]} 亿</p>
            <p>流出资金: ${item["今日主力净流入-净额"]} 亿</p>
        `;
        industryCardsContainer.appendChild(card);
    });
}

// 页面加载时渲染图表和表格
document.addEventListener('DOMContentLoaded', function() {
    fetchMarketData();
});
