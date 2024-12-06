// 页面加载时获取数据并渲染
window.onload = function() {
    fetch('marketdata.json')  // 读取本地的 marketdata.json 文件
        .then(response => response.json())
        .then(data => {
            renderIndices(data.indices);  // 渲染三大指数
            renderConceptFundFlow(data.concept_fund_flow);  // 渲染概念资金流
            renderIndustryFundFlow(data.industry_fund_flow);  // 渲染行业资金流
        })
        .catch(error => console.error('Error loading the data: ', error));
};

// 渲染三大指数
function renderIndices(indices) {
    const indicesSection = document.getElementById('indices');
    const canvas = document.getElementById('indicesChart');
    const ctx = canvas.getContext('2d');

    // 数据准备：每个指数的近5日数据
    const dates = indices.map(item => item.date);
    const szIndexData = indices.map(item => item['上证指数']);
    const szciIndexData = indices.map(item => item['深证成指']);
    const cybIndexData = indices.map(item => item['创业板指']);

    // 绘制折线图
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: '上证指数',
                    data: szIndexData,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                },
                {
                    label: '深证成指',
                    data: szciIndexData,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                },
                {
                    label: '创业板指',
                    data: cybIndexData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        }
    });
}

// 渲染概念资金流
function renderConceptFundFlow(conceptData) {
    const conceptCardsContainer = document.getElementById('concept-cards');
    conceptData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${item.名称}</h3>
            <p>净流入资金: ${formatMoney(item['今日主力净流入-净额'])} 元</p>
            <p>最大流入股: ${item['今日主力净流入最大股']}</p>
        `;
        conceptCardsContainer.appendChild(card);
    });
}

// 渲染行业资金流
function renderIndustryFundFlow(industryData) {
    const industryCardsContainer = document.getElementById('industry-cards');
    industryData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${item.名称}</h3>
            <p>净流入资金: ${formatMoney(item['今日主力净流入-净额'])} 元</p>
            <p>最大流入股: ${item['今日主力净流入最大股']}</p>
        `;
        industryCardsContainer.appendChild(card);
    });
}

// 格式化货币，转换为以万/亿为单位的字符串
function formatMoney(amount) {
    if (amount >= 1e8) {
        return (amount / 1e8).toFixed(2) + ' 亿';
    } else if (amount >= 1e4) {
        return (amount / 1e4).toFixed(2) + ' 万';
    } else {
        return amount.toFixed(2);
    }
}
