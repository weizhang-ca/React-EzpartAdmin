var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var GarageStore = assign({}, EventEmitter.prototype, {

    garages: {
              "1":{garageName:'Test1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'test1@test.com'},
              "2":{garageName:'Test2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'test2@test.com'}
              },
    isEditables: {
              '1':false,
              '2':false
    },

    addChangeListener: function(callback){
      this.on('change',callback);
    },
    removeChangeListener: function(callback){
      this.removeListener('change', callback);
    },
    emitChange: function(){
      this.emit('change');
    },
    getAll: function(){
      return this.garages;
    },
    getAllEditable: function(){
      return this.isEditables;
    },
    updateGarageHandler: function(garageId){
      //this.garages = assign({}, this.garages, garage);
      this.isEditables[garageId] = false;
    },
    updateGarageInputHandler: function(garage){
      console.log(garage);
      console.log(this.garages);
      this.garages = assign({}, this.garages, garage);
    },
    updateGarageEditableHandler: function(garageId){
      this.isEditables[garageId] = true;
    }
});

module.exports = GarageStore;
