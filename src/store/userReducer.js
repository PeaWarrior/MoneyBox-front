const defaultState = {
    username: '',
    password: '',
    password_confirmation: '',
    currentUser: null,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_INPUT':
            return {
                ...state,
                ...action.payload
            }
        case 'CLEAR_FORM':
            return {
                ...state,
                username: '',
                password: '',
                password_confirmation: ''
            }
        default:
            return state;
    }
}

export default reducer;