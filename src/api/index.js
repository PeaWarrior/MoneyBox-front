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
}