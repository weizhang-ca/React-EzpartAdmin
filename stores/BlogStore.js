var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var CHANGE_EVENT = 'change';
var BlogStore = assign({}, EventEmitter.prototype, {
    _blogs: [],
    
    getAll: function(){
        return this._blogs;
    },
    
    addNewBlogHandler: function(blog){
        this._blogs.push(blog);
    },
    
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }
});

module.exports = BlogStore;

