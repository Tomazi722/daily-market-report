// 获取市场数据
fetch('/api/market-data')
    .then(response => response.json())
    .then(data => {
        // 填充股指数据
        const indicesTable = document.getElementById('indicesTable').getElementsByTagName('tbody')[0];
        data.indices.forEach(item => {
            const row = indicesTable.insertRow();
            row.innerHTML = `<td>${item.date}</td><td>${item['上证指数']}</td><td>${item['深证成指']}</td><td>${item['创业板指']}</td>`;
        });

        // 填充行业资金流入数据
        const industryTable = document.getElementById('industryFundFlowTable').getElementsByTagName('tbody')[0];
        data.industry_fund_flow.forEach(item => {
            const row = industryTable.insertRow();
            row.innerHTML = `<td>${item.名称}</td><td>${item['今日主力净流入-净额']}</td><td>${item['今日主力净流入最大股']}</td>`;
        });

        // 填充概念资金流入数据
        const conceptTable = document.getElementById('conceptFundFlowTable').getElementsByTagName('tbody')[0];
        data.concept_fund_flow.forEach(item => {
            const row = conceptTable.insertRow();
            row.innerHTML = `<td>${item.名称}</td><td>${item['今日主力净流入-净额']}</td><td>${item['今日主力净流入最大股']}</td>`;
        });
    })
    .catch(error => console.error('Error fetching market data:', error));
