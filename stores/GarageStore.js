var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var GarageStore = assign({}, EventEmitter.prototype, {

    garages: [
              {garageName:'Test1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'test1@test.com'},
              {garageName:'Test2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'test2@test.com'}
              ],

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
    updateGarageHandler: function(garage){
      this.garages = assign({}, this.garages, {garage: garage});
    }
});

module.exports = GarageStore;
