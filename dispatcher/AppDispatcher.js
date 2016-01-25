var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var GarageStore = require('../stores/GarageStore');
var SectionStore = require('../stores/SectionStore');
AppDispatcher.register(function (action) {
  switch(action.actionType) {
    case "SAVE_GARAGE":
      GarageStore.updateGarageHandler(action.garageId);
      GarageStore.emitChange();
      break;
    case 'UPDATE_GARAGE_INPUT':
      GarageStore.updateGarageInputHandler(action.garage);
      GarageStore.emitChange();
      break;
    case 'EDIT_GARAGE':
      GarageStore.updateGarageEditableHandler(action.garageId);
      GarageStore.emitChange();
    case 'DISPLAY_GARAGESECTION':
      SectionStore.updateCurrentSection('garage');
      SectionStore.emitNewSection();
      break;
    case 'DISPLAY_SUPPLIERLIST' :
      GarageStore.getGarageSupplierList(action.garageId);
      SectionStore.updateCurrentSection('garageSupplierList');
      SectionStore.emitNewSection();
      // no op
  }
})

module.exports = AppDispatcher;
