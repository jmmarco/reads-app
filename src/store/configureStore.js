import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore(initalState) {

  return createStore(
    rootReducer,
    initalState,
    applyMiddleware(thunk)
  )

}
