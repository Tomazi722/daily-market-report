// script.js

// 获取市场数据并显示在表格中
fetch('market_data.json')
    .then(response => response.json())
    .then(data => {
        // 更新表格数据
        const tableBody = document.querySelector('#market-data-table tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.index}</td>
                <td>${row.value}</td>
                <td>${row.change}</td>
            `;
            tableBody.appendChild(tr);
        });

        // 使用 Chart.js 绘制市场数据图表
        const ctx = document.getElementById('marketChart').getContext('2d');
        const marketChart = new Chart(ctx, {
            type: 'line',  // 选择折线图
            data: {
                labels: data.map(row => row.index),  // X轴为指数
                datasets: [{
                    label: 'Market Value',
                    data: data.map(row => row.value),  // Y轴为值
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading market data:', error);
    });
