var React = require('react');
var ReactDOM = require('react-dom');
var Page = require('./components/Page');
var MainSection = require('./components/MainSection');
var Header = require('./components/Header');
var GarageList = require('./components/GarageList');
var GarageItem = require('./components/GarageItem');
var SupplierList = require('./components/SupplierList');
import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render(
  (
  <Router>
    <Route path="/" component={Page}>
      <Route component={MainSection}>
        <Route path="gareges" component={GarageList} />
        <Route path="garages/:garageId/supplierlist" handler={require('./components/SupplierList')} />
      </Route>
    </Route>
  </Router>
  ),
  document.querySelector('#example')
);
