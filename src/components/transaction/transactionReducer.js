const defaultState = {
    transactions: [],
    form: {
        portfolio_id: null,
        category: '',
        price: 0,
        shares: null,
        date: ''
    }
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_TRANSACTION':
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    ...action.payload
                ]
            }
        case 'SET_TRANSACTION_INPUT':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }
        case 'CLEAR_TRANSACTION_FORM':
            return {
                ...state,
                form: {
                    portfolio_id: null,
                    category: '',
                    price: 0,
                    shares: null,
                    date: ''
                }
            }
        default:
            return state;
    }
}

export default reducer;