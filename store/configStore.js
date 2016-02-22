import { createStore, applyMiddleware, compose  } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
/*
State shape
{
  garage:{
    isFetchingGarage: false,
    garageList:[{id:1, name:'Garage1', address:'',city:'',
                region:'', country:'', email:'', phone:'',
                masterId:'', master:''}]
            },
  supplier:{
    isFetchingSupplier: false,
    supplierList:[{id:1, name:'', address:'', city:'', region:'',
                    country:'', zip:'', email:'', phone:'', masterId:'',
                    master:''}]
              }
  order:{
      isFetchingOrder: false,
      orderList:[{id:1, poNumber:'', status:''}]
        }
  part:{
      isFetchingPart: false,
      partList:[{id:1, partDescription:'', partNumber:'', partListprice:,
                partNetprice:, status:'', dateOrder:'', dateView:'', dateBo:''
                dateShip:'', dateReceive:'', invoiceNumber:''}]
      }
  master:{
      masterList:[{id:3, name:'Advantage'}]
  }
}
*/
var initialState = {

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
