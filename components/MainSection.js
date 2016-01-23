var React = require('react');
var GarageMainSection = require('./GarageMainSection');
var MainSection = React.createClass({

  render: function(){
    var currentSection;
    if(this.props.section==='garage')
      currentSection = <GarageMainSection/>
    if(this.props.section==='supplier')
      currentSection = <SupplierMainSection/>
    return(
      <div>
        {currentSection}
      </div>
    );
  }
});

module.exports = MainSection;
