import { createNewActivityRequest, sellActivityRequest } from '../../api';
import { setCurrentPortfolio } from '../portfolio/portfolioActions';
import { setStocks } from '../stock/stockActions';

export const createAndFetchNewActivity = (form) => {
    return function(dispatch) {
        if (form.category === 'Sell') {
            sellActivityRequest(form)
            .then(data => {
                dispatch(setStocks(data.portfolio.stocks));
                dispatch(setCurrentPortfolio(data.portfolio));
            })
        } else {
            createNewActivityRequest(form)
            .then(data => {
                dispatch(createActivity(data.activity));
                dispatch(clearActivityForm());
            })
        }
    }
};

export const createActivity = (activityData) => {
    return {
        type: 'CREATE_ACTIVITY',
        payload: activityData
    }
}

export const setActivityInput = (inputData) => {
    return {
        type: 'SET_ACTIVITY_INPUT',
        payload: inputData
    };
};

export const clearActivityForm = () => {
    return {
        type: 'CLEAR_ACTIVITY_FORM'
    }
}