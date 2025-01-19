fetch('https://raw.githubusercontent.com/Tomazi722/daily-market-report/main/market_data.json')
    .then(response => response.json())
    .then(data => {
        // 填充数据的逻辑和上面一致
    })
    .catch(error => {
        console.error('Error fetching market data:', error);
    });
