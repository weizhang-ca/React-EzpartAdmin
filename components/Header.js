var React = require('react');
var GarageActions = require('../actions/GarageActions');
var SectionStore = require('../stores/SectionStore');
import { Router, Route, Link, browserHistory } from 'react-router';
var Header = React.createClass({

  render: function(){
    return(
      <div>
      <a onClick={this._onClickGarage}><Link to='/garage'>garage</Link></a>&nbsp;&nbsp;
      <a onClick={this._onClickSupplier}>supplier</a>&nbsp;&nbsp;
      </div>
    );
  },
  _onClickGarage: function(){
    GarageActions.displayGarageSection();
  }
});
module.exports = Header;
