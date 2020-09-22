const defaultState = {
    stocks: [],
    stock: {}
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_STOCKS':
            return {
                ...state,
                stocks: [...action.payload]
            }
        case 'SET_STOCK':
        return {
            ...state,
            stock: {...action.payload}
        }
        default:
            return state;
    }
};

export default reducer;