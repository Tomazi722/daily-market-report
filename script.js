document.addEventListener("DOMContentLoaded", function() {
    // 加载数据
    fetch('market_data.json')
        .then(response => response.json())
        .then(data => {
            // 更新三大指数折线图
            updateIndicesChart(data.indices);

            // 更新概念资金流展示
            updateConceptFundFlow(data.concept_fund_flow);

            // 更新行业资金流展示
            updateIndustryFundFlow(data.industry_fund_flow);
        });

    // 更新三大指数折线图
    function updateIndicesChart(indicesData) {
        const ctx = document.getElementById('indicesChart').getContext('2d');
        const labels = indicesData.map(item => item.date);
        const data = {
            labels: labels,
            datasets: [
                {
                    label: '上证指数',
                    data: indicesData.map(item => item['上证指数']),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                {
                    label: '深证成指',
                    data: indicesData.map(item => item['深证成指']),
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false
                },
                {
                    label: '创业板指',
                    data: indicesData.map(item => item['创业板指']),
                    borderColor: 'rgba(255, 159, 64, 1)',
                    fill: false
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: '日期'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '指数值'
                        }
                    }
                }
            }
        };

        const indicesChart = new Chart(ctx, config);
    }

    // 更新概念资金流展示
    function updateConceptFundFlow(conceptData) {
        const conceptCards = document.getElementById("concept-cards");
        conceptCards.innerHTML = "";  // 清空原有内容

        conceptData.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${item.行业}</h3>
                <p>流入资金: ${item.流入资金} 亿</p>
                <p>流出资金: ${item.流出资金} 亿</p>
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
                <p>流入资金: ${item.流入资金} 亿</p>
                <p>流出资金: ${item.流出资金} 亿</p>
            `;
            industryCards.appendChild(card);
        });
    }
});
