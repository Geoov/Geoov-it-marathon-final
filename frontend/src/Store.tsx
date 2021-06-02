import { createStore } from 'redux'
import { tokenReducer } from './reducers/tokenReducer'
export const Store = createStore(tokenReducer)
