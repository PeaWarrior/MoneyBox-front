const URL = 'http://localhost:3001/'

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

export const getPortfoliosRequest = () => {
    return fetch(`${URL}portfolios`, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json());
};

// TRANSACTION REQUESTS

export const createNewTransactionRequest = (transactionFormData) => {
    return fetch(`${URL}transactions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionFormData)
    })
    .then(resp => resp.json())
}