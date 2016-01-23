var React = require('react');
var ReactPropTypes = React.PropTypes;
var ENTER_KEY_CODE = 13;

var NewBlog = React.createClass({

    getInitialState: function(){
        return {
            title: this.props.title || '',
            content: this.props.content || ''
        };
    },
    render:function(){
        return (<div>
                <input type = "text" placeHolder="Title" name="title" id="title"
                  onKeyDown={this._onKeyDown}
                />
                <input type = "text" placeHolder="Content" name="content" id="content"
                  onKeyDown={this._onKeyDown}
                  />
                <button onClick={this._save}>Submit</button>
            </div>
        );
    },
    _onKeyDown: function(event){
        if(event.keyCode === ENTER_KEY_CODE){
            if(event.target.name==='title'){

            }
            else{
                this._save();
            }
        }
    },

    _save: function(event){
        this.setState({
            title: event.target.value,
            content: ''
        });
        this.props.newBlogSumbit(this.state);
        this.setState({
            title: '',
            content: ''
        });
    }

});

module.exports = NewBlog;
