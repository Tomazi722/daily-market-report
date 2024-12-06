window.onload = function () {
    // 动态加载 market_data.json 文件的数据
    fetch('market_data.json')
        .then(response => response.json())
        .then(data => {
            // 从 market_data.json 中提取三大指数数据
            const indicesData = data.indices;

            // 提取日期和三大指数数据
            const dates = indicesData.map(item => item.date);
            const shIndex = indicesData.map(item => item['上证指数']);
            const szIndex = indicesData.map(item => item['深证成指']);
            const cybIndex = indicesData.map(item => item['创业板指']);

            // 创建三个折线图
            createChart('shChart', '上证指数', dates, shIndex, '#3498db');
            createChart('szChart', '深证成指', dates, szIndex, '#e74c3c');
            createChart('cybChart', '创业板指', dates, cybIndex, '#2ecc71');
        })
        .catch(error => console.error('Error loading market_data.json:', error));
};

// 创建折线图的通用函数
function createChart(canvasId, label, labels, data, color) {
    const ctx = document.getElementById(canvasId);

    // 计算数据中的最小值和最大值
    const minData = Math.min(...data);
    const maxData = Math.max(...data);

    // 根据数据范围自动计算纵轴范围，保留一定边距
    const padding = (maxData - minData) * 0.05;  // 增加5%的边距
    const minY = Math.floor(minData - padding);   // 向下取整，确保不露出数据
    const maxY = Math.ceil(maxData + padding);    // 向上取整，确保有足够空白

    // 设置合适的步长
    const stepSize = Math.ceil((maxY - minY) / 5); // 根据总范围设置纵轴步长

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: `${color}33`, // 半透明的背景颜色
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // 不保持宽高比例
            scales: {
                x: {
                    type: 'category',
                    ticks: {
                        autoSkip: false
                    }
                },
                y: {
                    beginAtZero: false,
                    min: minY, // 设置纵轴最小值
                    max: maxY, // 设置纵轴最大值
                    stepSize: stepSize, // 设置纵轴步长
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0); // 保留整数
                        }
                    }
                }
            }
        }
    });
}
