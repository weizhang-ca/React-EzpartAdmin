
var AppDispatcher = require("../dispatcher/AppDispatcher");

var BlogActions = {
    addNewBlog: function(blog){
        AppDispatcher.dispatch({
            actionType: "ADD_NEW_BLOG",
            text: blog
        });
    }
}

module.exports = BlogActions;


