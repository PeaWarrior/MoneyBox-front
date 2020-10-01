const defaultState = {
    activities: [],
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_ACTIVITY':
            return {
                ...state,
                activities: [
                    ...state.activities,
                    action.payload
                ]
            }
        case 'SET_ACTIVITY_INPUT':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default reducer;