import React, {Component, PropTypes} from 'react';
import GarageList from './GarageList';

class MainSection extends Component{

  render(){
    const{actions, garageList, supplierList} = this.props;
    console.log(this.props);
    return(
        <div>
          <GarageList
            garageList = {garageList}
            actions = {actions}
          />
        </div>
    );
  }
}
MainSection.propTypes = {
  actions: PropTypes.object.isRequired,
  garageList: PropTypes.object.isRequired
}

export default MainSection;
