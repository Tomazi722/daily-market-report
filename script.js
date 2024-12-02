document.addEventListener("DOMContentLoaded", function() {
    // 读取 JSON 数据
    fetch('market_data.json')
        .then(response => response.json())
        .then(data => {
            // 填充卡片数据
            fillIndexCards(data);
            // 更新图表
            updateChart(data);
        })
        .catch(error => console.error("Error loading market data:", error));

    // 填充指数卡片
    function fillIndexCards(data) {
        const indexCardsContainer = document.getElementById('index-cards');

        for (const [indexName, indexData] of Object.entries(data)) {
            const card = document.createElement('div');
            card.classList.add('index-card');
            card.innerHTML = `
                <h3>${getIndexFullName(indexName)}</h3>
                <p>收盘价: ${indexData[indexData.length - 1].收盘}</p>
                <p>涨跌幅: ${indexData[indexData.length - 1].涨跌幅}%</p>
            `;
            indexCardsContainer.appendChild(card);
        }
    }

    // 获取完整的指数名称
    function getIndexFullName(indexName) {
        switch (indexName) {
            case 'sh': return "上证指数";
            case 'sz': return "深证成指";
            case 'cyb': return "创业板指数";
            default: return "未知指数";
        }
    }

    // 更新图表
    function updateChart(data) {
        const ctx = document.getElementById('index-chart-canvas').getContext('2d');

        // 获取三个指数的历史数据
        const shData = data.sh;
        const szData = data.sz;
        const cybData = data.cyb;

        // 标签是日期
        const labels = shData.map(item => item.日期);

        // 收盘价数据
        const shClosing = shData.map(item => item.收盘);
        const szClosing = szData.map(item => item.收盘);
        const cybClosing = cybData.map(item => item.收盘);

        // 使用提供的涨跌幅数据
        const shDailyChange = shData.map(item => item.涨跌幅);
        const szDailyChange = szData.map(item => item.涨跌幅);
        const cybDailyChange = cybData.map(item => item.涨跌幅);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: '上证指数',
                    data: shDailyChange,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false
                },
                {
                    label: '深证成指',
                    data: szDailyChange,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false
                },
                {
                    label: '创业板指数',
                    data: cybDailyChange,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false
                }
            ]
        };

        const chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,  // 不强制从零开始
                    ticks: {
                        // 自适应范围：最小值是数据中的最小值，最大值是数据中的最大值，外加一定的缓冲区
                        min: Math.min(...shDailyChange.concat(szDailyChange, cybDailyChange)) * 1.1,
                        max: Math.max(...shDailyChange.concat(szDailyChange, cybDailyChange)) * 1.1
                    }
                }
            }
        };

        // 创建折线图
        const myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }
});
