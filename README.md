# SGX Stock Analyzer - EMA & Bollinger Band Scanner

A Progressive Web App (PWA) for analyzing Singapore Stock Exchange (SGX) stocks using technical indicators including Exponential Moving Averages (EMA) and Bollinger Bands.

## Features

### Technical Analysis
- **5-Day & 10-Day EMA Crossover**: Detects bullish and bearish signals when the 5-day EMA crosses above or below the 10-day EMA
- **Bollinger Bands**: Identifies overbought/oversold conditions and volatility squeezes
- **Real-time Analysis**: Analyzes stock patterns and provides trading signals

### Stock Management
- Add individual SGX stocks by symbol (e.g., D05, U11, O39)
- Scan popular SGX stocks automatically
- Refresh all stock data with one click
- Persistent storage of analyzed stocks

### Filtering & Visualization
- Filter stocks by EMA crossover patterns
- Filter by Bollinger Band signals (oversold, overbought, squeeze)
- Interactive charts showing price, EMAs, and Bollinger Bands
- Clean, modern interface optimized for mobile and desktop

### PWA Features
- Works offline with cached data
- Install as native app on mobile devices
- Background sync for stock data updates
- Push notifications for stock alerts

## How to Use

1. **Add Stocks**: Enter SGX stock symbols (e.g., "D05" for DBS) or use "Scan Popular" to add common stocks
2. **Apply Filters**: Use the filter checkboxes to show only stocks matching your criteria
3. **View Details**: Click on any stock card to see detailed charts and analysis
4. **Monitor Signals**: Watch for EMA crossovers and Bollinger Band signals for trading opportunities

## Technical Indicators Explained

### EMA Crossover
- **Bullish Signal**: When 5-day EMA crosses above 10-day EMA, indicating potential upward momentum
- **Bearish Signal**: When 5-day EMA crosses below 10-day EMA, indicating potential downward momentum

### Bollinger Bands
- **Oversold**: Price near lower band suggests potential buying opportunity
- **Overbought**: Price near upper band suggests potential selling pressure
- **Squeeze**: Narrow bands indicate low volatility and potential breakout

## Installation

This is a Progressive Web App that can be:
1. Used directly in any modern web browser
2. Installed as a native app on mobile devices
3. Added to home screen for quick access

## Demo Data

The app uses simulated stock data for demonstration purposes. In a production environment, this would connect to real SGX market data feeds.

## Technology Stack

- Vanilla JavaScript (ES6+)
- Chart.js for interactive charts
- CSS Grid & Flexbox for responsive layout
- Service Worker for PWA functionality
- Web App Manifest for native app experience

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Future Enhancements

- Real SGX market data integration
- More technical indicators (RSI, MACD, etc.)
- Price alerts and notifications
- Portfolio tracking
- Advanced charting features