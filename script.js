document.addEventListener("DOMContentLoaded", function() {
    // 加载数据
    fetch('market_data.json')
        .then(response => response.json())
        .then(data => {
            // 更新概念资金流展示
            updateConceptFundFlow(data.concept_fund_flow);

            // 更新行业资金流展示
            updateIndustryFundFlow(data.industry_fund_flow);
        });

    // 更新概念资金流展示
    function updateConceptFundFlow(conceptData) {
        const conceptCards = document.getElementById("concept-cards");
        conceptCards.innerHTML = "";  // 清空原有内容

        conceptData.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${item.行业}</h3>
                <p>行业指数: ${item.行业指数}</p>
                <p>行业涨跌幅: ${item['行业-涨跌幅']}%</p>
                <p>流入资金: ¥${item['流入资金']} 亿</p>
                <p>流出资金: ¥${item['流出资金']} 亿</p>
                <p>净额: ¥${item.净额} 亿</p>
                <p>领涨股: ${item.领涨股} (${item['领涨股-涨跌幅']}%)</p>
                <p>当前价: ¥${item['当前价']}</p>
            `;
            conceptCards.appendChild(card);
        });
    }

    // 更新行业资金流展示
    function updateIndustryFundFlow(industryData) {
        const industryCards = document.getElementById("industry-cards");
        industryCards.innerHTML = "";  // 清空原有内容

        industryData.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${item.行业}</h3>
                <p>行业指数: ${item.行业指数}</p>
                <p>行业涨跌幅: ${item['行业-涨跌幅']}%</p>
                <p>流入资金: ¥${item['流入资金']} 亿</p>
                <p>流出资金: ¥${item['流出资金']} 亿</p>
                <p>净额: ¥${item.净额} 亿</p>
                <p>领涨股: ${item.领涨股} (${item['领涨股-涨跌幅']}%)</p>
                <p>当前价: ¥${item['当前价']}</p>
            `;
            industryCards.appendChild(card);
        });
    }
});
