// 页面加载完成后运行
window.onload = function() {
    // 获取 JSON 数据并渲染到页面
    fetch('/market_data.json')
        .then(response => response.json())
        .then(data => {
            // 渲染三大指数卡片
            renderIndices(data.indices);
            // 渲染概念资金流卡片
            renderConceptFundFlow(data.concept_fund_flow);
            // 渲染行业资金流卡片
            renderIndustryFundFlow(data.industry_fund_flow);
        })
        .catch(error => console.error("Error fetching market data:", error));
};

// 渲染三大指数卡片
function renderIndices(indices) {
    const container = document.getElementById("indices-cards");
    container.innerHTML = ''; // 清空容器

    indices.forEach(index => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${index.date}</h3>
            <p>上证指数: ${index['上证指数']} 点</p>
            <p>深证成指: ${index['深证成指']} 点</p>
            <p>创业板指: ${index['创业板指']} 点</p>
        `;
        container.appendChild(card);
    });
}

// 渲染概念资金流卡片
function renderConceptFundFlow(conceptData) {
    const container = document.getElementById("concept-cards");
    container.innerHTML = ''; // 清空容器

    conceptData.forEach(concept => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${concept['名称']}</h3>
            <p>净流入资金: ${concept['今日主力净流入-净额']} 亿</p>
            <p>最大流入股票: ${concept['今日主力净流入最大股']}</p>
        `;
        container.appendChild(card);
    });
}

// 渲染行业资金流卡片
function renderIndustryFundFlow(industryData) {
    const container = document.getElementById("industry-cards");
    container.innerHTML = ''; // 清空容器

    industryData.forEach(industry => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${industry['名称']}</h3>
            <p>净流入资金: ${industry['今日主力净流入-净额']} 亿</p>
            <p>最大流入股票: ${industry['今日主力净流入最大股']}</p>
        `;
        container.appendChild(card);
    });
}
