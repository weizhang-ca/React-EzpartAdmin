import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configStore'
import { Router, Route, browserHistory } from 'react-router'
import MainSection from './components/MainSection'
import GarageList from './components/GarageList'
import SupplierList from './components/SupplierList'
import GarageItem from './components/GarageItem'
import AddSupplierForm from './components/AddSupplierForm'
const store = configureStore()

render(
  (<Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route component={MainSection}>
          <Route path="garages" component={GarageList}></Route>
          <Route path="garages/:garageId/supplierlist" component={SupplierList}></Route>
          <Route path="suppliers" component={SupplierList}></Route>
          <Route path="garages/:garageId/addSupplier" component={AddSupplierForm}></Route>
        </Route>
      </Route>
    </Router>
  </Provider>),
  document.getElementById('root')
)
