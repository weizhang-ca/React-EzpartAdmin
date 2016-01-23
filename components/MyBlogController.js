/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var React = require('react');
var BlogStore = require('../stores/BlogStore');
var BlogActions= require('../actions/BlogActions');
var NewBlog= require('./NewBlog');
var MyBlogController = React.createClass({
    getInitialState: function() {
        return{
            blogs: BlogStore.getAll()
        };
    },
    componentDidMount: function(){
        BlogStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        BlogStore.removeChangeListener(this._onChange);
    },
    _addNewBlog: function(blog){
        BlogActions.addNewBlog(blog);
    },

    render: function(){
        return <NewBlog
                newBlogSumbit={this._addNewBlog}
                />;
    },

    _onChange: function(){
        this.setState(BlogStore.getAll());
    }
});

module.exports = MyBlogController;
