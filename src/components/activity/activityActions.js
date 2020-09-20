import { createNewActivityRequest } from '../../api';

export const createAndFetchNewActivity = (form) => {
    return function(dispatch) {
        createNewActivityRequest(form)
        .then(data => {
            dispatch(createActivity(data.activity))
            dispatch(clearActivityForm());
        })
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