var EventEmitter = require('events').EventEmitter;
var React = require('react');
var assign = require('object-assign');
var SectionStore = assign({}, EventEmitter.prototype, {
    mainSection: '',

    addNewSectionListener: function(callback){
       this.on("newSection", callback);
    },

    removeNewSectionListener: function(callback){
       this.removeListener('newSection', callback);
    },

    emitNewSection: function(){
      this.emit('newSection');
    },

    getCurrentSection: function(){
       return this.mainSection;
    },
    updateCurrentSection: function(section){
      this.mainSection = section;
    }
});

module.exports = SectionStore;
