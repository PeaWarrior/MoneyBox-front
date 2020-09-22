import { getStockDataRequest, getStockNewsRequest } from '../../api';

export const fetchStockData = (query) => {
    return function(dispatch) {
        getStockDataRequest(query)
        .then(data => {
            console.log(data)
            dispatch(setStock(data))
        })
    }
};

export const fetchStockNewsData = (ticker) => {
    return function(dispatch) {
        getStockNewsRequest(ticker)
        .then(data => {
            console.log(data)
            // dispatch(setStock(data))
        })
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