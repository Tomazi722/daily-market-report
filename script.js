window.onload = function () {
    fetch('market_data.json')
        .then(response => response.json())
        .then(data => {
            const indicesData = data.indices;

            const dates = indicesData.map(item => item.date);
            const shIndex = indicesData.map(item => item['上证指数']);
            const szIndex = indicesData.map(item => item['深证成指']);
            const cybIndex = indicesData.map(item => item['创业板指']);

            createChart('shChart', '上证指数', dates, shIndex, '#3498db');
            createChart('szChart', '深证成指', dates, szIndex, '#e74c3c');
            createChart('cybChart', '创业板指', dates, cybIndex, '#2ecc71');
        })
        .catch(error => console.error('Error loading market_data.json:', error));
};

function createChart(canvasId, label, labels, data, color) {
    const ctx = document.getElementById(canvasId);

    // 设置纵轴范围，避免无限拉伸
    const minY = Math.min(...data) * 0.95;  // 确保纵轴有5%的空白
    const maxY = Math.max(...data) * 1.05;  // 保持5%的空白

    // 创建折线图
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: `${color}33`,  // 背景色带透明
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        autoSkip: false
                    }
                },
                y: {
                    beginAtZero: false,
                    min: minY,  // 设置纵轴最小值
                    max: maxY,  // 设置纵轴最大值
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}
