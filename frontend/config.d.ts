import 'react-redux'
import { tokenState } from './src/reducers/tokenReducer'
declare module 'react-redux' {
    interface tokenReducer extends tokenState {}
}
