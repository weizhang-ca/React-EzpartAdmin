var React = require('react');
import { Router, Route, Link, browserHistory } from 'react-router';
var Header = React.createClass({

  render: function(){
    return(
      <div>
      <a onClick={this.handleClickGarage}>garage</a>&nbsp;&nbsp;
      <a>supplier</a>&nbsp;&nbsp;
      </div>
    );
  },
  handleClickGarage: function(){
    var list = {
                "1":{garageName:'Test1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'test1@test.com'},
                "2":{garageName:'Test2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'test2@test.com'}
              };
    this.props.getGarageList(list);
  }
});
module.exports = Header;
