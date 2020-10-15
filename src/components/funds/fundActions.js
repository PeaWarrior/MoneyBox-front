import store from '../../store';
import { createFundRequest } from '../../api';
import { setCurrentPortfolio, updatePortfolios } from '../portfolio/portfolioActions';

export const createFund = (form) => {
    return function(dispatch) {
        createFundRequest(form)
        .then(data => {
            dispatch(setCurrentPortfolio(data.portfolio));
            const { portfolios } = store.getState().portfolio;
                const updatedPortfolios = portfolios.map(portfolio => {
                    if (portfolio.id === data.portfolio.id) {
                        return data.portfolio
                    } else {
                        return portfolio
                    }
                });
            dispatch(updatePortfolios(updatedPortfolios));
        });
    }
};