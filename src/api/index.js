const URL = 'http://localhost:3001/';
const FINNHUB_URL = 'https://finnhub.io/api/v1/company-news';

// PORTFOLIO REQUESTS

export const createNewPortfolioRequest = (newPortfolioName) => {
    return fetch(`${URL}portfolios`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: newPortfolioName})
    })
    .then(resp => resp.json());
};

export const getPortfolioRequest = (id) => {
    return fetch(`${URL}portfolios/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json());
};

export const getPortfoliosRequest = () => {
    return fetch(`${URL}portfolios`, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json());
};

// ACTIVITY REQUESTS

export const createNewActivityRequest = (activityFormData) => {
    return fetch(`${URL}activities`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityFormData)
    })
    .then(resp => resp.json())
};

// STOCK REQUESTS

export const getStockDataRequest = (query) => {
    return fetch(`${URL}stocks/${query}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
};

export const getStockQuotesRequest = (queries) => {
    return fetch(`${URL}quotes/${queries}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
};