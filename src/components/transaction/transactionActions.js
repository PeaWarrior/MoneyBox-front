import store from '../../store';
import { createNewTransactionRequest } from '../../api';

export const createAndFetchNewTransaction = () => {
    return function(dispatch) {
        createNewTransactionRequest(store.getState().transaction.form)
        .then(data => {
            dispatch(createTransaction(data.transaction))
            dispatch(clearTransactionForm());
        })
    }
};

export const createTransaction = (transactionData) => {
    return {
        type: 'CREATE_TRANSACTION',
        payload: transactionData
    }
}

export const setTransactionInput = (inputData) => {
    return {
        type: 'SET_TRANSACTION_INPUT',
        payload: inputData
    };
};

export const clearTransactionForm = () => {
    return {
        type: 'CLEAR_TRANSACTION_FORM'
    }
}