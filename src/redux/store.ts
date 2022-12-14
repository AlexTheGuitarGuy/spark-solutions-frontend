import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { ThunkAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import authReducer from './auth-reducer/auth-reducer'
import appReducer from './app-reducer/app-reducer'

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = any

export type InferAction<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type InferThunk<A extends Action, P = void> = ThunkAction<Promise<P>, RootState, unknown, A>

export default store
