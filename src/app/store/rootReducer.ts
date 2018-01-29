import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { customerProfileReducer } from './profileReducer/profileReducer';

export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
        customerProfile: customerProfileReducer,
    }));
