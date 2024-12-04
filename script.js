document.addEventListener('DOMContentLoaded', function() {
    // Fetch market data from the JSON endpoint
    fetch('/market_data')
        .then(response => response.json())
        .then(data => {
            // Display the indices data
            const indicesData = data.indices;
            indicesData.forEach(index => {
                const card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<h3>${index.date}</h3>
                                <p>上证指数: ${index.上证指数}</p>
                                <p>深证成指: ${index.深证成指}</p>
                                <p>创业板指: ${index.创业板指}</p>`;
                document.getElementById('indices-cards').appendChild(card);
            });

            // Display industry fund flow data
            const industryData = data.industry_fund_flow;
            industryData.forEach(item => {
                const card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<h3>${item.名称}</h3>
                                <p>净流入金额: ${item['今日主力净流入-净额']}</p>
                                <p>最大流入股: ${item['今日主力净流入最大股']}</p>`;
                document.getElementById('industry-fund-flow-cards').appendChild(card);
            });

            // Display concept fund flow data
            const conceptData = data.concept_fund_flow;
            conceptData.forEach(item => {
                const card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<h3>${item.名称}</h3>
                                <p>净流入金额: ${item['今日主力净流入-净额']}</p>
                                <p>最大流入股: ${item['今日主力净流入最大股']}</p>`;
                document.getElementById('concept-fund-flow-cards').appendChild(card);
            });

            // Optional: Add charts for visualizations (e.g., line charts, bar charts, etc.)
        })
        .catch(error => {
            console.error('Error fetching market data:', error);
        });
});
