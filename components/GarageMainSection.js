var React = require('react');
var GarageItem = require('./GarageItem');
var GarageStore = require('../stores/GarageStore');
var GarageActions = require('../actions/GarageActions');

var GarageMainSection = React.createClass({
    getInitialState: function(){
      console.log("the state is: " + GarageStore.getAll());
      return {
        allGarages: GarageStore.getAll(),
        allEditables: GarageStore.getAllEditable()
      };
    },

    componentDidMount: function(){
      GarageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
      GarageStore.removeChangeListener(this._onChange);
    },
    render: function(){
      var allGarages = this.state.allGarages;
      var allEditables = this.state.allEditables;
      var garages = [];
      for(var key in allGarages){
        garages.push(
          <GarageItem
              garage={allGarages[key]}
              garageId={key}
              saveGarage={this._saveGarage}
              editGarage={this._editGarage}
              updateGarageInput={this._updateGarageInput}
              isEditing={allEditables[key]}
          />
      );
      }

      return(
        <ul>{garages}</ul>
      );
    },
    _saveGarage: function(garageId){
      GarageActions.saveGarage(garageId);
    },
    _editGarage: function(garageId){
      GarageActions.editGarage(garageId);
    },
    _updateGarageInput: function(garage){
      console.log(garage);
      GarageActions.updateGarageInput(garage);
    },
    _onChange: function(){
      this.setState({
        allGarages: GarageStore.getAll(),
        allEditables: GarageStore.getAllEditable()
      });
    }
});

module.exports = GarageMainSection;
