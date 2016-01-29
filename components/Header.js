var React = require('react');
import { Router, Route, Link, browserHistory } from 'react-router';
var Header = React.createClass({

  render: function(){
    return(
      <div>
      <Link to="/garages">garage</Link>&nbsp;&nbsp;
      <Link to="/suppliers">supplier</Link>&nbsp;&nbsp;
      </div>
    );
  },
});
module.exports = Header;
