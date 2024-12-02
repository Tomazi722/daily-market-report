// 获取数据并展示
fetch('market_data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);  // 打印数据检查

        // 更新三大指数卡片部分
        const indexCards = document.getElementById('index-cards');
        indexCards.innerHTML = `
            <div class="index-card">
                <h2>上证指数</h2>
                <p>最新收盘：${data.sh[0].收盘}</p>
                <p>涨跌幅：${data.sh[0].涨跌幅}%</p>
            </div>
            <div class="index-card">
                <h2>深证成指</h2>
                <p>最新收盘：${data.sz[0].收盘}</p>
                <p>涨跌幅：${data.sz[0].涨跌幅}%</p>
            </div>
            <div class="index-card">
                <h2>创业板指数</h2>
                <p>最新收盘：${data.cyb[0].收盘}</p>
                <p>涨跌幅：${data.cyb[0].涨跌幅}%</p>
            </div>
        `;

        // 填充指数数据到表格
        const tableBody = document.getElementById('index-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = `
            ${data.sh.map(item => `
                <tr>
                    <td>${item.日期}</td>
                    <td>上证指数</td>
                    <td>${item.收盘}</td>
                    <td>${item.涨跌幅}%</td>
                </tr>
            `).join('')}
            ${data.sz.map(item => `
                <tr>
                    <td>${item.日期}</td>
                    <td>深证成指</td>
                    <td>${item.收盘}</td>
                    <td>${item.涨跌幅}%</td>
                </tr>
            `).join('')}
            ${data.cyb.map(item => `
                <tr>
                    <td>${item.日期}</td>
                    <td>创业板指数</td>
                    <td>${item.收盘}</td>
                    <td>${item.涨跌幅}%</td>
                </tr>
            `).join('')}
        `;

        // 生成图表数据
        const ctx = document.getElementById('index-chart-canvas').getContext('2d');
        const chartData = {
            labels: data.sh.map(item => item.日期),
            datasets: [
                {
                    label: '上证指数',
                    data: data.sh.map(item => item.收盘),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: '深证成指',
                    data: data.sz.map(item => item.收盘),
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: '创业板指数',
                    data: data.cyb.map(item => item.收盘),
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        };

        const chartOptions = {
            responsive: true,
            scales: {
                x: {
                    type: 'category',
                    labels: data.sh.map(item => item.日期)
                },
                y: {
                    ticks: {
                        beginAtZero: false
                    }
                }
            }
        };

        // 创建图表
        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    })
    .catch(error => console.error('Error loading market data:', error));
