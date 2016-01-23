var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var GarageStore = require('../stores/GarageStore');

AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case "UPDATE_GARAGE":
      GarageStore.updateGarageHandler(action.garage);
      GarageStore.emitChange();
      break;
    default:
      // no op
  }
})

module.exports = AppDispatcher;
