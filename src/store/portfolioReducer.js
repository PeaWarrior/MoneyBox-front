const defaultState = {
    portfolios: [],
    form: {
        name: ''
    }
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_PORTFOLIO':
            return {
                ...state,
                portfolios: [
                    ...state.portfolios,
                    action.payload
                ]
            }
        case 'SET_NEW_PORTFOLIO_FORM_NAME':
            return {
                ...state,
                form: {
                    ...state.form,
                    name: action.payload
                }
            }
        case 'SET_PORTFOLIOS':
            return {
                ...state,
                portfolios: [
                    ...state.portfolios,
                    ...action.payload
                ]
            }
        default:
            return state;
    }
}

export default reducer;