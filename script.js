// 获取并显示市场数据
async function fetchMarketData() {
    try {
        const response = await fetch('market_data.json');  // 加载 JSON 数据
        const marketData = await response.json();  // 解析 JSON 数据

        // 填充数据
        populateData(marketData);
        plotChart(marketData);

    } catch (error) {
        console.error("Error fetching market data:", error);
    }
}

// 将数据填充到页面
function populateData(marketData) {
    const indexCards = document.getElementById("index-cards");
    const indexTableBody = document.getElementById("index-table").getElementsByTagName('tbody')[0];

    // 清空之前的内容
    indexCards.innerHTML = '';
    indexTableBody.innerHTML = '';

    // 填充卡片展示
    for (let name in marketData) {
        let latestData = marketData[name][marketData[name].length - 1];
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${name === 'sh' ? '上证指数' : name === 'sz' ? '深证成指' : '创业板'}</h3>
            <p>收盘价：${latestData.close}</p>
            <p>涨跌幅：${latestData.pct_chg}%</p>
        `;
        indexCards.appendChild(card);

        // 填充表格
        marketData[name].forEach(row => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.date}</td>
                <td>${name === 'sh' ? '上证指数' : name === 'sz' ? '深证成指' : '创业板'}</td>
                <td>${row.close}</td>
                <td>${row.pct_chg}%</td>
            `;
            indexTableBody.appendChild(tr);
        });
    }
}

// 绘制指数走势图
function plotChart(marketData) {
    const ctx = document.getElementById('index-chart-canvas').getContext('2d');

    const labels = marketData.sh.map(data => data.date);
    const data = {
        labels: labels,
        datasets: [
            {
                label: '上证指数',
                data: marketData.sh.map(data => data.close),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: '深证成指',
                data: marketData.sz.map(data => data.close),
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: '创业板',
                data: marketData.cyb.map(data => data.close),
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                fill: false
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '三大指数走势图'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw;
                        }
                    }
                }
            }
        });
}

// 页面加载时自动获取数据
document.addEventListener("DOMContentLoaded", () => {
    fetchMarketData();
});
