window.onload = function () {
    fetch('market_data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Market data loaded:', data);  // 检查数据
            const indicesData = data.indices;

            const dates = indicesData.map(item => item.date);
            const shIndex = indicesData.map(item => item['上证指数']);
            const szIndex = indicesData.map(item => item['深证成指']);
            const cybIndex = indicesData.map(item => item['创业板指']);

            createBarChart('shChart', '上证指数', dates, shIndex, '#3498db');
            createBarChart('szChart', '深证成指', dates, szIndex, '#e74c3c');
            createBarChart('cybChart', '创业板指', dates, cybIndex, '#2ecc71');
        })
        .catch(error => {
            console.error('Error loading market_data.json:', error);
        });
};

function createBarChart(canvasId, label, labels, data, color) {
    const ctx = document.getElementById(canvasId);

    if (!ctx) {
        console.error(`Canvas element with id ${canvasId} not found!`);
        return;
    }

    const minY = Math.min(...data) * 0.95;
    const maxY = Math.max(...data) * 1.05;

    console.log(`Creating chart for ${label}, MinY: ${minY}, MaxY: ${maxY}`);  // 调试信息

    // 创建柱状图
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 2
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
                    min: minY,
                    max: maxY,
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
