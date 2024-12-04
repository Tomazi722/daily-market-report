// Fetch the market data from the JSON file
fetch('market_data.json')
    .then(response => response.json())
    .then(data => {
        // Populate the 3 indices chart
        const indices = data.indices.slice(0, 5); // Get last 5 days data
        const indexLabels = indices.map(item => item.date);
        const indexData = {
            labels: indexLabels,
            datasets: [
                {
                    label: '上证指数',
                    data: indices.map(item => item.上证指数),
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false
                },
                {
                    label: '深证成指',
                    data: indices.map(item => item.深证成指),
                    borderColor: 'rgb(153, 102, 255)',
                    fill: false
                },
                {
                    label: '创业板指',
                    data: indices.map(item => item.创业板指),
                    borderColor: 'rgb(255, 159, 64)',
                    fill: false
                }
            ]
        };

        const ctx = document.getElementById('indexChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: indexData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '日期'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '指数值'
                        }
                    }
                }
            }
        });

        // Populate the Concept Fund Flow table
        const conceptFlow = data.concept_fund_flow.slice(0, 5); // Top 5 concept fund flows
        const conceptTableBody = document.getElementById('concept-fund-flow').getElementsByTagName('tbody')[0];

        conceptFlow.forEach(item => {
            const row = conceptTableBody.insertRow();
            row.insertCell(0).textContent = item.行业;
            row.insertCell(1).textContent = item.流入资金;
            row.insertCell(2).textContent = item.流出资金;
            row.insertCell(3).textContent = item.净流入_流出;
        });

        // Populate the Industry Fund Flow table
        const industryFlow = data.industry_fund_flow.slice(0, 5); // Top 5 industry fund flows
        const industryTableBody = document.getElementById('industry-fund-flow').getElementsByTagName('tbody')[0];

        industryFlow.forEach(item => {
            const row = industryTableBody.insertRow();
            row.insertCell(0).textContent = item.行业;
            row.insertCell(1).textContent = item.流入资金;
            row.insertCell(2).textContent = item.流出资金;
            row.insertCell(3).textContent = item.净流入_流出;
        });
    })
    .catch(error => {
        console.error('Error loading market data:', error);
    });
