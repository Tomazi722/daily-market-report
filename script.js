document.addEventListener('DOMContentLoaded', () => {
    // 使用 fetch 从 GitHub 加载 market_data.json
    fetch('https://raw.githubusercontent.com/Tomazi722/daily-market-report/main/market_data.json')
        .then(response => response.json())
        .then(data => {
            // 填充股指数据
            const indicesContainer = document.getElementById('indicesData');
            data.indices.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card-item');
                card.innerHTML = `
                    <h3>${item.date}</h3>
                    <p>上证指数: ${item['上证指数']}</p>
                    <p>深证成指: ${item['深证成指']}</p>
                    <p>创业板指: ${item['创业板指']}</p>
                `;
                indicesContainer.appendChild(card);
            });

            // 填充行业资金流入数据
            const industryContainer = document.getElementById('industryFundFlowData');
            data.industry_fund_flow.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card-item');
                card.innerHTML = `
                    <h3>${item.名称}</h3>
                    <p>今日主力净流入-净额: ${item['今日主力净流入-净额']}</p>
                    <p>今日主力净流入最大股: ${item['今日主力净流入最大股']}</p>
                `;
                industryContainer.appendChild(card);
            });

            // 填充概念资金流入数据
            const conceptContainer = document.getElementById('conceptFundFlowData');
            data.concept_fund_flow.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card-item');
                card.innerHTML = `
                    <h3>${item.名称}</h3>
                    <p>今日主力净流入-净额: ${item['今日主力净流入-净额']}</p>
                    <p>今日主力净流入最大股: ${item['今日主力净流入最大股']}</p>
                `;
                conceptContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching market data:', error);
        });
});
