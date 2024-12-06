window.onload = function() {
    // 示例数据：三大指数最近五天的数据
    const indicesData = [
        {
            date: "2024-12-02",
            上证指数: 3363.982,
            深证成指: 10756.548,
            创业板指: 2255.498
        },
        {
            date: "2024-12-03",
            上证指数: 3378.806,
            深证成指: 10713.578,
            创业板指: 2245.499
        },
        {
            date: "2024-12-04",
            上证指数: 3364.65,
            深证成指: 10604.012,
            创业板指: 2213.406
        },
        {
            date: "2024-12-05",
            上证指数: 3368.855,
            深证成指: 10634.489,
            创业板指: 2221.457
        },
        {
            date: "2024-12-06",
            上证指数: 3404.076,
            深证成指: 10791.339,
            创业板指: 2267.064
        }
    ];

    // 提取时间和三大指数数据
    const dates = indicesData.map(item => item.date);
    const shIndex = indicesData.map(item => item['上证指数']);
    const szIndex = indicesData.map(item => item['深证成指']);
    const cybIndex = indicesData.map(item => item['创业板指']);

    // 创建上证指数的折线图
    const shChart = new Chart(document.getElementById('shChart'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '上证指数',
                data: shIndex,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: false
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // 创建深证成指的折线图
    const szChart = new Chart(document.getElementById('szChart'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '深证成指',
                data: szIndex,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: false
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // 创建创业板指的折线图
    const cybChart = new Chart(document.getElementById('cybChart'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '创业板指',
                data: cybIndex,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: false
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
