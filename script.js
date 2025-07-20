// Singapore Stock Exchange Analyzer - EMA & Bollinger Band Scanner
// Mock data and calculations for demonstration purposes

// Popular SGX stocks for demonstration
const POPULAR_SGX_STOCKS = [
    'D05.SI', // DBS Group Holdings
    'U11.SI', // United Overseas Bank
    'O39.SI', // Oversea-Chinese Banking Corp
    'C6L.SI', // Singapore Airlines
    'V03.SI', // Venture Corporation
    'S68.SI', // Singapore Exchange
    'C52.SI', // ComfortDelGro Corporation
    'A17U.SI', // Ascendas REIT
    'M44U.SI', // Mapletree Logistics Trust
    'S63.SI'  // Singapore Technologies Engineering
];

// App State
let stockData = new Map();
let activeFilters = {
    emaBullish: true,
    emaBearish: false,
    bbOversold: true,
    bbOverbought: false,
    bbSqueeze: true
};

let stockChart = null;

// DOM Elements
const stockSymbolInput = document.getElementById('stock-symbol');
const addStockBtn = document.getElementById('add-stock-btn');
const scanPopularBtn = document.getElementById('scan-popular-btn');
const refreshAllBtn = document.getElementById('refresh-all-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const stockList = document.getElementById('stock-list');
const loadingIndicator = document.getElementById('loading-indicator');
const totalStocksEl = document.getElementById('total-stocks');
const filteredStocksEl = document.getElementById('filtered-stocks');
const stockModal = document.getElementById('stock-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Filter checkboxes
const emaBullishCb = document.getElementById('ema-bullish');
const emaBearishCb = document.getElementById('ema-bearish');
const bbOversoldCb = document.getElementById('bb-oversold');
const bbOverboughtCb = document.getElementById('bb-overbought');
const bbSqueezeCb = document.getElementById('bb-squeeze');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadSavedStocks();
    registerServiceWorker();
});

// Register Service Worker for PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Event Listeners
function setupEventListeners() {
    addStockBtn.addEventListener('click', handleAddStock);
    scanPopularBtn.addEventListener('click', handleScanPopular);
    refreshAllBtn.addEventListener('click', handleRefreshAll);
    clearAllBtn.addEventListener('click', handleClearAll);
    modalCloseBtn.addEventListener('click', closeModal);
    
    stockSymbolInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddStock();
        }
    });

    // Filter event listeners
    emaBullishCb.addEventListener('change', updateFilters);
    emaBearishCb.addEventListener('change', updateFilters);
    bbOversoldCb.addEventListener('change', updateFilters);
    bbOverboughtCb.addEventListener('change', updateFilters);
    bbSqueezeCb.addEventListener('change', updateFilters);

    // Modal close on background click
    stockModal.addEventListener('click', function(e) {
        if (e.target === stockModal) {
            closeModal();
        }
    });
}

// Generate Mock Stock Data
function generateMockStockData(symbol) {
    // Generate 50 days of mock price data
    const days = 50;
    const basePrice = Math.random() * 50 + 10; // Base price between 10-60
    const prices = [];
    const volumes = [];
    
    let currentPrice = basePrice;
    
    for (let i = 0; i < days; i++) {
        // Random walk with slight upward bias
        const change = (Math.random() - 0.48) * 2; // Slight upward bias
        currentPrice = Math.max(0.1, currentPrice + change);
        prices.push(parseFloat(currentPrice.toFixed(2)));
        
        // Random volume between 100K and 2M
        volumes.push(Math.floor(Math.random() * 1900000) + 100000);
    }
    
    return {
        symbol: symbol,
        prices: prices,
        volumes: volumes,
        lastUpdated: new Date()
    };
}

// Calculate EMA
function calculateEMA(prices, period) {
    const k = 2 / (period + 1);
    const emas = [];
    
    // Start with SMA for first value
    let sum = 0;
    for (let i = 0; i < period; i++) {
        sum += prices[i];
    }
    emas[period - 1] = sum / period;
    
    // Calculate EMA for remaining values
    for (let i = period; i < prices.length; i++) {
        emas[i] = prices[i] * k + emas[i - 1] * (1 - k);
    }
    
    return emas;
}

// Calculate Bollinger Bands
function calculateBollingerBands(prices, period = 20, stdDev = 2) {
    const sma = [];
    const upperBand = [];
    const lowerBand = [];
    
    for (let i = period - 1; i < prices.length; i++) {
        // Calculate SMA
        const slice = prices.slice(i - period + 1, i + 1);
        const mean = slice.reduce((a, b) => a + b, 0) / period;
        sma[i] = mean;
        
        // Calculate standard deviation
        const variance = slice.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / period;
        const std = Math.sqrt(variance);
        
        upperBand[i] = mean + (stdDev * std);
        lowerBand[i] = mean - (stdDev * std);
    }
    
    return { sma, upperBand, lowerBand };
}

// Analyze Stock
function analyzeStock(data) {
    const prices = data.prices;
    const currentPrice = prices[prices.length - 1];
    
    // Calculate EMAs
    const ema5 = calculateEMA(prices, 5);
    const ema10 = calculateEMA(prices, 10);
    
    // Calculate Bollinger Bands
    const bb = calculateBollingerBands(prices);
    
    const currentEma5 = ema5[ema5.length - 1];
    const currentEma10 = ema10[ema10.length - 1];
    const currentBBUpper = bb.upperBand[bb.upperBand.length - 1];
    const currentBBLower = bb.lowerBand[bb.lowerBand.length - 1];
    const currentBBMiddle = bb.sma[bb.sma.length - 1];
    
    // Determine signals
    const signals = [];
    
    // EMA Crossover signals
    if (currentEma5 > currentEma10) {
        signals.push({ type: 'bullish', text: '5 EMA > 10 EMA' });
    } else {
        signals.push({ type: 'bearish', text: '5 EMA < 10 EMA' });
    }
    
    // Bollinger Band signals
    const bbPosition = (currentPrice - currentBBLower) / (currentBBUpper - currentBBLower);
    
    if (bbPosition < 0.2) {
        signals.push({ type: 'bullish', text: 'Near Lower BB (Oversold)' });
    } else if (bbPosition > 0.8) {
        signals.push({ type: 'bearish', text: 'Near Upper BB (Overbought)' });
    }
    
    // Band squeeze detection (when bands are narrow)
    const bandWidth = (currentBBUpper - currentBBLower) / currentBBMiddle;
    if (bandWidth < 0.1) {
        signals.push({ type: 'neutral', text: 'Band Squeeze (Low Volatility)' });
    }
    
    // Overall sentiment
    const bullishSignals = signals.filter(s => s.type === 'bullish').length;
    const bearishSignals = signals.filter(s => s.type === 'bearish').length;
    
    let sentiment = 'neutral';
    if (bullishSignals > bearishSignals) {
        sentiment = 'bullish';
    } else if (bearishSignals > bullishSignals) {
        sentiment = 'bearish';
    }
    
    return {
        currentPrice,
        ema5: currentEma5,
        ema10: currentEma10,
        bbUpper: currentBBUpper,
        bbLower: currentBBLower,
        bbMiddle: currentBBMiddle,
        volume: data.volumes[data.volumes.length - 1],
        signals,
        sentiment,
        fullData: {
            prices,
            ema5,
            ema10,
            ...bb,
            volumes: data.volumes
        }
    };
}

// Handle Add Stock
async function handleAddStock() {
    const symbol = stockSymbolInput.value.trim().toUpperCase();
    if (!symbol) return;
    
    // Normalize SGX symbol format
    const normalizedSymbol = symbol.includes('.SI') ? symbol : symbol + '.SI';
    
    if (stockData.has(normalizedSymbol)) {
        alert('Stock already added!');
        return;
    }
    
    showLoading(true);
    
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = generateMockStockData(normalizedSymbol);
        const analysis = analyzeStock(data);
        
        stockData.set(normalizedSymbol, analysis);
        stockSymbolInput.value = '';
        
        updateStockList();
        saveStocks();
        
    } catch (error) {
        console.error('Error adding stock:', error);
        alert('Error adding stock. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Handle Scan Popular
async function handleScanPopular() {
    showLoading(true);
    
    try {
        for (const symbol of POPULAR_SGX_STOCKS) {
            if (!stockData.has(symbol)) {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 200));
                
                const data = generateMockStockData(symbol);
                const analysis = analyzeStock(data);
                stockData.set(symbol, analysis);
            }
        }
        
        updateStockList();
        saveStocks();
        
    } catch (error) {
        console.error('Error scanning popular stocks:', error);
        alert('Error scanning stocks. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Handle Refresh All
async function handleRefreshAll() {
    if (stockData.size === 0) {
        alert('No stocks to refresh!');
        return;
    }
    
    showLoading(true);
    
    try {
        const symbols = Array.from(stockData.keys());
        
        for (const symbol of symbols) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const data = generateMockStockData(symbol);
            const analysis = analyzeStock(data);
            stockData.set(symbol, analysis);
        }
        
        updateStockList();
        saveStocks();
        
    } catch (error) {
        console.error('Error refreshing stocks:', error);
        alert('Error refreshing stocks. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Handle Clear All
function handleClearAll() {
    if (stockData.size === 0) return;
    
    if (confirm('Are you sure you want to clear all stocks?')) {
        stockData.clear();
        updateStockList();
        saveStocks();
    }
}

// Update Filters
function updateFilters() {
    activeFilters = {
        emaBullish: emaBullishCb.checked,
        emaBearish: emaBearishCb.checked,
        bbOversold: bbOversoldCb.checked,
        bbOverbought: bbOverboughtCb.checked,
        bbSqueeze: bbSqueezeCb.checked
    };
    
    updateStockList();
}

// Check if stock matches filters
function matchesFilters(analysis) {
    const { signals, sentiment } = analysis;
    
    // Check EMA filters
    if (activeFilters.emaBullish && sentiment === 'bullish') return true;
    if (activeFilters.emaBearish && sentiment === 'bearish') return true;
    
    // Check Bollinger Band filters
    for (const signal of signals) {
        if (activeFilters.bbOversold && signal.text.includes('Oversold')) return true;
        if (activeFilters.bbOverbought && signal.text.includes('Overbought')) return true;
        if (activeFilters.bbSqueeze && signal.text.includes('Squeeze')) return true;
    }
    
    return false;
}

// Update Stock List
function updateStockList() {
    const totalStocks = stockData.size;
    const filteredStocks = Array.from(stockData.values()).filter(matchesFilters);
    
    totalStocksEl.textContent = `${totalStocks} stocks analyzed`;
    filteredStocksEl.textContent = `${filteredStocks.length} matching criteria`;
    
    if (totalStocks === 0) {
        stockList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-bar"></i>
                <h3>No stocks added yet</h3>
                <p>Add stock symbols above or scan popular stocks to get started</p>
            </div>
        `;
        return;
    }
    
    const stocksToShow = filteredStocks.length > 0 ? 
        Array.from(stockData.entries()).filter(([symbol, analysis]) => matchesFilters(analysis)) :
        Array.from(stockData.entries());
    
    stockList.innerHTML = stocksToShow.map(([symbol, analysis]) => 
        createStockItemHTML(symbol, analysis)
    ).join('');
    
    // Add click handlers for stock items
    stockList.querySelectorAll('.stock-item').forEach(item => {
        item.addEventListener('click', () => {
            const symbol = item.dataset.symbol;
            showStockDetails(symbol);
        });
    });
}

// Create Stock Item HTML
function createStockItemHTML(symbol, analysis) {
    const priceChange = Math.random() * 4 - 2; // Random change for demo
    const priceChangeClass = priceChange >= 0 ? 'price-positive' : 'price-negative';
    const priceChangeIcon = priceChange >= 0 ? '▲' : '▼';
    
    return `
        <div class="stock-item ${analysis.sentiment}" data-symbol="${symbol}">
            <div class="stock-header">
                <div class="stock-symbol">${symbol.replace('.SI', '')}</div>
                <div class="stock-price ${priceChangeClass}">
                    $${analysis.currentPrice.toFixed(2)}
                    <small>${priceChangeIcon} ${Math.abs(priceChange).toFixed(2)}%</small>
                </div>
            </div>
            
            <div class="stock-indicators">
                <div class="indicator">
                    <div class="indicator-label">5-Day EMA</div>
                    <div class="indicator-value">$${analysis.ema5.toFixed(2)}</div>
                </div>
                <div class="indicator">
                    <div class="indicator-label">10-Day EMA</div>
                    <div class="indicator-value">$${analysis.ema10.toFixed(2)}</div>
                </div>
                <div class="indicator">
                    <div class="indicator-label">BB Upper</div>
                    <div class="indicator-value">$${analysis.bbUpper.toFixed(2)}</div>
                </div>
                <div class="indicator">
                    <div class="indicator-label">BB Lower</div>
                    <div class="indicator-value">$${analysis.bbLower.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="stock-signals">
                ${analysis.signals.map(signal => 
                    `<span class="signal ${signal.type}">${signal.text}</span>`
                ).join('')}
            </div>
        </div>
    `;
}

// Show Stock Details Modal
function showStockDetails(symbol) {
    const analysis = stockData.get(symbol);
    if (!analysis) return;
    
    const modalStockName = document.getElementById('modal-stock-name');
    modalStockName.textContent = `${symbol.replace('.SI', '')} - Stock Analysis`;
    
    // Update detail cards
    document.getElementById('current-price').textContent = `$${analysis.currentPrice.toFixed(2)}`;
    document.getElementById('ema-5').textContent = `$${analysis.ema5.toFixed(2)}`;
    document.getElementById('ema-10').textContent = `$${analysis.ema10.toFixed(2)}`;
    document.getElementById('bb-upper').textContent = `$${analysis.bbUpper.toFixed(2)}`;
    document.getElementById('bb-lower').textContent = `$${analysis.bbLower.toFixed(2)}`;
    document.getElementById('volume').textContent = formatVolume(analysis.volume);
    
    // Create chart
    createStockChart(analysis.fullData);
    
    stockModal.style.display = 'flex';
}

// Create Stock Chart
function createStockChart(data) {
    const ctx = document.getElementById('stock-chart');
    
    if (stockChart) {
        stockChart.destroy();
    }
    
    const labels = data.prices.map((_, index) => `Day ${index + 1}`);
    
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Price',
                    data: data.prices,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: '5-Day EMA',
                    data: data.ema5,
                    borderColor: '#10b981',
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: '10-Day EMA',
                    data: data.ema10,
                    borderColor: '#f59e0b',
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'BB Upper',
                    data: data.upperBand,
                    borderColor: '#ef4444',
                    backgroundColor: 'transparent',
                    fill: false,
                    borderDash: [5, 5]
                },
                {
                    label: 'BB Lower',
                    data: data.lowerBand,
                    borderColor: '#ef4444',
                    backgroundColor: 'transparent',
                    fill: false,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Close Modal
function closeModal() {
    stockModal.style.display = 'none';
    if (stockChart) {
        stockChart.destroy();
        stockChart = null;
    }
}

// Show/Hide Loading
function showLoading(show) {
    loadingIndicator.style.display = show ? 'flex' : 'none';
}

// Format Volume
function formatVolume(volume) {
    if (volume >= 1000000) {
        return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
        return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
}

// Save Stocks to localStorage
function saveStocks() {
    const stocksArray = Array.from(stockData.entries()).map(([symbol, analysis]) => ({
        symbol,
        analysis: {
            ...analysis,
            fullData: undefined // Don't save full data to reduce storage
        }
    }));
    localStorage.setItem('sgxStocks', JSON.stringify(stocksArray));
}

// Load Saved Stocks
function loadSavedStocks() {
    try {
        const saved = localStorage.getItem('sgxStocks');
        if (saved) {
            const stocksArray = JSON.parse(saved);
            stocksArray.forEach(({ symbol, analysis }) => {
                // Regenerate full data for charts
                const data = generateMockStockData(symbol);
                const fullAnalysis = analyzeStock(data);
                stockData.set(symbol, fullAnalysis);
            });
            updateStockList();
        }
    } catch (error) {
        console.error('Error loading saved stocks:', error);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close modal
    if (e.key === 'Escape' && stockModal.style.display === 'flex') {
        closeModal();
    }
    
    // Enter to add stock when input is focused
    if (e.key === 'Enter' && document.activeElement === stockSymbolInput) {
        handleAddStock();
    }
});

// Auto-refresh every 5 minutes
setInterval(() => {
    if (stockData.size > 0) {
        console.log('Auto-refreshing stock data...');
        handleRefreshAll();
    }
}, 5 * 60 * 1000);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateEMA,
        calculateBollingerBands,
        analyzeStock
    };
}
