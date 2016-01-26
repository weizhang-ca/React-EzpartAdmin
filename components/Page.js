var React = require('react');
var SectionStore = require('../stores/SectionStore');
var Header = require('./Header');
var MainSection = require('./MainSection');
import { Router, Route, Link } from 'react-router';
var Page = React.createClass({

  getInitialState: function(){
    return{
      section: SectionStore.getCurrentSection()
    }
  },
  componentDidMount: function(){
    SectionStore.addNewSectionListener(this._onChange);
  },
  componentWillUnmount:function(){
    SectionStore.removeNewSectionListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        <Header/>
        {this.props.children}
       </div>
    )
  },
  _onChange: function(){
    this.setState({
      section: SectionStore.getCurrentSection()
    });
  }
});

module.exports = Page;
