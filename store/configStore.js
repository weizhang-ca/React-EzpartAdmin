import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'

var initialState = {
      garageList:{
        "1":{garageName:'Test1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'test1@test.com'},
        "2":{garageName:'Test2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'test2@test.com'}
      }
};
export default function configStore(initialState){
  const store = createStore(rootReducer, initialState);
  if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers')
        store.replaceReducer(nextReducer)
      })
    }
  return store;
}
