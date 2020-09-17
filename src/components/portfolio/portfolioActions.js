import { createNewPortfolioRequest, getPortfoliosRequest } from '../../api';

export const createNewPortfolio = (newPortfolioName) => {
    return function(dispatch) {
        createNewPortfolioRequest(newPortfolioName)
            .then(data => dispatch(createPortfolio(data)));
    }
};

export const fetchPortfolios = () => {
    return function(dispatch) {
        getPortfoliosRequest()
            .then(data => dispatch(setPortfolios(data.portfolios)));
    }
}


// UTILITY

export const createPortfolio = (data) => {
    return {
        type: 'CREATE_PORTFOLIO',
        payload: data.portfolio
    };
};

export const setNewPortfolioFormName = newPortfolioFormName => {
    return {
        type: 'SET_NEW_PORTFOLIO_FORM_NAME',
        payload: newPortfolioFormName
    }
};

export const setPortfolios = (portfolios) => {
    return {
        type: 'SET_PORTFOLIOS',
        payload: portfolios
    }
}