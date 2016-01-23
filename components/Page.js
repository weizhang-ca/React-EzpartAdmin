var React = require('react');
var SectionStore = require('../stores/SectionStore');
var Header = require('./Header');
var MainSection = require('./MainSection');
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
        <MainSection section={this.state.section}/>
        
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
