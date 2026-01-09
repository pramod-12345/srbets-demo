import { combineReducers } from 'redux';
import authSlice from "./authSlice"
import dashboard from './dashboard'
import search from './search'
import gameSlice from './gameSlice'
import walletSlice from './walletSlice'

const appReducer = combineReducers({
    auth : authSlice,
    dashboard: dashboard,
    search: search,
    game : gameSlice,
    wallet: walletSlice
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        // eslint-disable-next-line no-param-reassign
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer