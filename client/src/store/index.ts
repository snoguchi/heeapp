import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';

import room from './room';
import config from './config';

const reducer = combineReducers({ room, config });

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;
