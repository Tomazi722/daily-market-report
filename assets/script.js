fetch('data/market_data.json')
    .then(response => response.json())
    .then(data => {
        displayMarketData(data);
        displayIndexCharts(data);
    })
    .catch(error => {
        console.error('无法获取市场数据：', error);
        document.getElementById('market-data').innerHTML = '<p>无法加载市场数据。</p>';
    });

function displayMarketData(data) {
    const container = document.getElementById('market-data');
    let htmlContent = '';

    data.forEach(section => {
        // 跳过指数历史数据部分
        if (section.type === 'index_history') {
            return;
        }
        htmlContent += `<h2>${section.title}</h2>`;
        if (section.type === 'table') {
            htmlContent += '<table class="table">';
            htmlContent += '<tr>';
            section.headers.forEach(header => {
                htmlContent += `<th>${header}</th>`;
            });
            htmlContent += '</tr>';
            section.rows.forEach(row => {
                htmlContent += '<tr>';
                row.forEach(cell => {
                    htmlContent += `<td>${cell}</td>`;
                });
                htmlContent += '</tr>';
            });
            htmlContent += '</table>';
        } else if (section.type === 'text') {
            htmlContent += `<p>${section.content}</p>`;
        }
    });

    container.innerHTML = htmlContent;
}

function displayIndexCharts(data) {
    // 提取指数历史数据
    let indexHistorySection = data.find(section => section.type === 'index_history');
    if (!indexHistorySection) {
        console.error('没有找到指数历史数据');
        return;
    }
    let indexHistory = indexHistorySection.content;

    // 准备ECharts的数据格式
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    // 设置X轴的日期
    let dates = [];
    for (let indexName in indexHistory) {
        dates = indexHistory[indexName].dates;
        break;  // 所有指数的日期应该是相同的
    }
    option.xAxis.data = dates;

    // 添加每个指数的数据
    for (let indexName in indexHistory) {
        option.legend.data.push(indexName);
        option.series.push({
            name: indexName,
            type: 'line',
            data: indexHistory[indexName].close
        });
    }

    // 初始化并绘制图表
    let chartDom = document.getElementById('chart-container');
    let myChart = echarts.init(chartDom);
    myChart.setOption(option);
}
