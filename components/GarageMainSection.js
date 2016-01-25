var React = require('react');
var GarageItem = require('./GarageItem');
var SupplierItem = require('./SupplierItem');
var GarageStore = require('../stores/GarageStore');
var GarageActions = require('../actions/GarageActions');

var GarageMainSection = React.createClass({
    getInitialState: function(){
      return {
        allGarages: GarageStore.getAll(),
        allEditables: GarageStore.getAllEditable(),
        supplierList: GarageStore.getGarageSupplierList()
      };
    },

    componentDidMount: function(){
      GarageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
      GarageStore.removeChangeListener(this._onChange);
    },
    render: function(){
      var currentSection;
      if(this.props.section==='garage'){
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
                displaySupplierList={this._getSupplierList}
            />
        );
        }
        currentSection = garages;
      }
      else if(this.props.section==='garageSupplierList'){
        var supplierList = this.state.supplierList;
        console.log(supplierList);
        var garageSuppliers = [];
        for(var key in supplierList){
          garageSuppliers.push(
            <SupplierItem
              supplier = {supplierList[key]}
              supplierId = {key}
              />
          );
        }
        currentSection = garageSuppliers;
      }
      return(
        <ul>{currentSection}</ul>
      );
    },
    _saveGarage: function(garageId){
      GarageActions.saveGarage(garageId);
    },
    _editGarage: function(garageId){
      GarageActions.editGarage(garageId);
    },
    _updateGarageInput: function(garage){
      GarageActions.updateGarageInput(garage);
    },
    _getSupplierList: function(garageId){
      GarageActions.displaySupplierList(garageId);
    },
    _onChange: function(){
      this.setState({
        allGarages: GarageStore.getAll(),
        allEditables: GarageStore.getAllEditable(),
        supplierList: GarageStore.getGarageSupplierList()
      });
    }
});

module.exports = GarageMainSection;
