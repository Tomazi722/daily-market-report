// 模拟获取数据
const marketData = {
    "sh": [
        { "date": "2024-11-01", "close": 3200.0, "pct_chg": 0.5 },
        { "date": "2024-11-02", "close": 3220.0, "pct_chg": 0.625 },
        { "date": "2024-11-03", "close": 3180.0, "pct_chg": -1.24 },
        { "date": "2024-11-04", "close": 3190.0, "pct_chg": 0.31 }
    ],
    "sz": [
        { "date": "2024-11-01", "close": 13000.0, "pct_chg": 1.0 },
        { "date": "2024-11-02", "close": 13100.0, "pct_chg": 0.5 },
        { "date": "2024-11-03", "close": 12950.0, "pct_chg": -0.5 },
        { "date": "2024-11-04", "close": 13050.0, "pct_chg": 0.77 }
    ],
    "cyb": [
        { "date": "2024-11-01", "close": 4000.0, "pct_chg": 1.2 },
        { "date": "2024-11-02", "close": 4050.0, "pct_chg": 1.25 },
        { "date": "2024-11-03", "close": 3950.0, "pct_chg": -2.5 },
        { "date": "2024-11-04", "close": 4005.0, "pct_chg": 1.4 }
    ]
};

// 将数据填充到页面
function populateData() {
    const indexCards = document.getElementById("index-cards");
    const indexTableBody = document.getElementById("index-table").getElementsByTagName('tbody')[0];
    
    // 清空之前的内容
    indexCards.innerHTML = '';
    indexTableBody.innerHTML = '';

    // 填充卡片展示
    for (let index in marketData) {
        let latestData = marketData[index][marketData[index].length - 1];
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${index === 'sh' ? '上证指数' : index === 'sz' ? '深证成指' : '创业板'}</h3>
            <p>收盘价：${latestData.close}</p>
            <p>涨跌幅：${latestData.pct_chg}%</p>
        `;
        indexCards.appendChild(card);

        // 填充表格
        marketData[index].forEach(row => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.date}</td>
                <td>${index === 'sh' ? '上证指数' : index === 'sz' ? '深证成指' : '创业板'}</td>
                <td>${row.close}</td>
                <td>${row.pct_chg}%</td>
            `;
            indexTableBody.appendChild(tr);
        });
    }
}

// 绘制指数走势图
function plotChart() {
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

document.addEventListener("DOMContentLoaded", () => {
    populateData();
    plotChart();
});
