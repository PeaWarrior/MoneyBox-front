export const createNewPortfolioRequest = (event) => {
    return fetch('http://localhost:3001/portfolios', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: "newPortfolioName"})
    })
    .then(resp => resp.json());
};

export const getPortfoliosRequest = () => {
    return fetch('http://localhost:3001/portfolios', {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json());
}