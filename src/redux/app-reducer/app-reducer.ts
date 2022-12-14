import { Alert } from '../../types/types'
import { InferAction, InferThunk } from '../store'

import { loginByToken } from '../auth-reducer/auth-reducer'

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED'
const SET_ALERT = 'IN_LINK/APP_REDUCER/SET_ALERT'

const initialState = {
  isAppInitialized: false,
  alert: { message: '', type: 'alert' } as Alert,
}

export type AppReducerState = typeof initialState

type AppAction = InferAction<typeof appActions>

type AppThunk = InferThunk<AppAction>

const appReducer = (state = initialState, action: AppAction): AppReducerState => {
  switch (action.type) {
    case APP_INITIALIZED:
    case SET_ALERT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const appActions = {
  initializeSuccess: () =>
    ({
      type: APP_INITIALIZED,
      payload: { isAppInitialized: true },
    } as const),

  setAlert: (alert: Alert) =>
    ({
      type: SET_ALERT,
      payload: { alert },
    } as const),
}

export const setAlertFromThunk =
  (alert: Alert): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAlert(alert))
  }

export const initializeApp = (): AppThunk => async (dispatch) => {
  const authPromise = dispatch(loginByToken())

  await Promise.all([authPromise])

  dispatch(appActions.initializeSuccess())
}

export default appReducer
