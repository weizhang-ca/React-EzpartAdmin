var AppDispatcher = require('../dispatcher/AppDispatcher');

var GarageActions = {
    updateGarage: function(garage){
      AppDispatcher.dispatch({
        actionType: 'UPDATE_GARAGE',
        garage: garage
      });
    }
}
module.exports = GarageActions;
