var React = require('react');
var GarageActions = require('../actions/GarageActions');
var SectionStore = require('../stores/SectionStore');
var Header = React.createClass({

  render: function(){
    return(
      <div>
      <a onClick={this._onClickGarage}>garage</a>&nbsp;&nbsp;
      <a onClick={this._onClickSupplier}>supplier</a>&nbsp;&nbsp;
      </div>
    );
  },
  _onClickGarage: function(){
    GarageActions.displayGarageSection();
  }
});
module.exports = Header;
