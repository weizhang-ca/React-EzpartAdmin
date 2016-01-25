var React = require('react');
var GarageMainSection = require('./GarageMainSection');
var MainSection = React.createClass({

  render: function(){
    var currentSection;
    if(this.props.section==='garage' ||this.props.section==="garageSupplierList")
      currentSection = <GarageMainSection section={this.props.section}/>
    if(this.props.section==='supplier')
      currentSection = <SupplierMainSection section={this.props.section}/>
    return(
      <div>
        {currentSection}
      </div>
    );
  }
});

module.exports = MainSection;
