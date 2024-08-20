const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3005;

// cors middleware
app.use(cors());

// Mock data for demonstration
const mockPriceData = {
    "AAPL": [
        ["2024-08-10", 179.23],
        ["2024-08-11", 181.45],
        ["2024-08-12", 183.67]
    ],
    "GOOGL": [
        ["2024-08-10", 131.22],
        ["2024-08-11", 133.50],
        ["2024-08-12", 135.76]
    ]
};

// API endpoint to get live price data
app.get('/api/price', (req, res) => {
    console.log("****************************Request received");
    console.log(req.query.num_days);
    console.log(req.query.ticker);
    const ticker = req.query.ticker.toUpperCase();
    const numDays = parseInt(req.query.num_days) || 1;

    // Simulate fetching data (e.g., from a database or an external API)
    const priceData = mockPriceData[ticker] ? mockPriceData[ticker].slice(0, numDays) : [];
    console.log("****************************Sending response");
    //console.log(priceData);

    // Structure the response as expected by the frontend
    res.json({
        ticker: ticker,
        price_data: priceData
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
