import React, {Component, PropTypes, cloneElement} from 'react';
import GarageList from './GarageList';

class MainSection extends Component{

  render(){
    const{actions, garageList, supplierList} = this.props;
    console.log('Main section says: ')
    console.log(supplierList)
    var children = this.props.children==null?
    this.props.children:
    cloneElement(
      this.props.children,
      {
        garageList:garageList,
        actions: actions,
        supplierList:supplierList
      }
      )
    console.log(children)
    return(
        <div>
          {children}
        </div>
    );
  }
}
MainSection.propTypes = {
  actions: PropTypes.object.isRequired,
  garageList: PropTypes.object.isRequired,
  supplierList: PropTypes.object.isRequired
}

export default MainSection;
