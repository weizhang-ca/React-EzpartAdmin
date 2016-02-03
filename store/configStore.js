import { createStore, applyMiddleware, compose  } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

var initialState = {
      garageList:{
        "1":{garageName:'Test1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'test1@test.com'},
        "2":{garageName:'Test2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'test2@test.com'}
      }
};
export default function configStore(initialState){

  /* This way does not work!! Do the following way to add middleware. It's from thunk official website
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
  */
  let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
  const store = createStoreWithMiddleware(rootReducer)
  console.log('store is: ')
  console.log(store)
  if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers/rootReducer', () => {
        const nextReducer = require('../reducers/rootReducer')
        store.replaceReducer(nextReducer)
      })
    }
  return store;
}
