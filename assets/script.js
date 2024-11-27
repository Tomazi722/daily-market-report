fetch('data/market_data.json')
    .then(response => response.json())
    .then(data => {
        displayMarketData(data);
    })
    .catch(error => {
        console.error('无法获取市场数据：', error);
        document.getElementById('market-data').innerHTML = '<p>无法加载市场数据。</p>';
    });

function displayMarketData(data) {
    const container = document.getElementById('market-data');
    let htmlContent = '';

    data.forEach(section => {
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
