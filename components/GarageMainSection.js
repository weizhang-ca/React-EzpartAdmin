var React = require('react');
var GarageItem = require('./GarageItem');
var GarageStore = require('../stores/GarageStore');
var GarageActions = require('../actions/GarageActions');

var GarageMainSection = React.createClass({
    getInitialState: function(){
      console.log("the state is: " + GarageStore.getAll());
      return {allGarages: GarageStore.getAll()};
    },

    componentDidMount: function(){
      GarageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
      GarageStore.removeChangeListener(this._onChange);
    },
    render: function(){
      var allGarages = this.state.allGarages;
      var garages = [];
      for(var key in allGarages){
        garages.push(<GarageItem garage={allGarages[key]} updateGarage={this._updateGarage}/>);
      }

      return(
        <ul>{garages}</ul>
      );
    },
    _updateGarage: function(garage){
        GarageActions.updateGarage(garage);
    },
    _onChange: function(){
      this.setState({
        allGarages: GarageStore.getAll()
      });
    }
});

module.exports = GarageMainSection;
