import { createFundRequest } from '../../api';
import { setCurrentPortfolio } from '../portfolio/portfolioActions';

export const createFund = (form) => {
    return function(dispatch) {
        createFundRequest(form)
        .then(data => {
            dispatch(setCurrentPortfolio(data.portfolio));
        });
    }
};