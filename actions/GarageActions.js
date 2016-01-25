var AppDispatcher = require('../dispatcher/AppDispatcher');

var GarageActions = {
    saveGarage: function(garageId){
      AppDispatcher.dispatch({
        actionType: 'SAVE_GARAGE',
        garageId: garageId
      });
    },
    updateGarageInput: function(garage){
      AppDispatcher.dispatch({
        actionType: 'UPDATE_GARAGE_INPUT',
        garage: garage
      })
    },
    editGarage: function(garageId){
      AppDispatcher.dispatch({
        actionType: 'EDIT_GARAGE',
        garageId: garageId
      })
    },
    displayGarageSection: function(){
      AppDispatcher.dispatch({
        actionType: 'DISPLAY_GARAGESECTION'
      })
    },
    displaySupplierList: function(garageId){
      AppDispatcher.dispatch({
        actionType: 'DISPLAY_SUPPLIERLIST',
        garageId: garageId
      });
    }
}
module.exports = GarageActions;
