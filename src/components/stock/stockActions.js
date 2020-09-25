import { getStockDataRequest, getStockQuotesRequest } from '../../api';

export const fetchStockData = query => {
    return function(dispatch) {
        getStockDataRequest(query)
        .then(data => {
            dispatch(setStock(data))
        })
    }
};

export const fetchStockQuotes = queries => {
    return function(dispatch) {
        getStockQuotesRequest(queries)
        .then(data => {
            dispatch(setQuotes(data))
        })
    }
}

export const setQuotes = (quotes) => {
    return {
        type: 'SET_QUOTES',
        payload: quotes
    }
};

export const setStocks = (stocks) => {
    return {
        type: 'SET_STOCKS',
        payload: stocks
    }
};

export const setStock = (stock) => {
    return {
        type: 'SET_STOCK',
        payload: stock
    }
};

// UTILITY

export const calculateChange = (currentPrice, openPrice, shares = 1) => {
    return function() {
        const type = currentPrice > openPrice ? '+' : '-';
        const amountChange = (Math.abs(currentPrice - openPrice) * shares).toFixed(2)
        const percentChange = (Math.abs((currentPrice/openPrice)-1) * shares).toFixed(2)
        return {
            type: type,
            message: `
                ${type}
                $${amountChange} 
                (${percentChange}%) 
            `
        };
    };
};