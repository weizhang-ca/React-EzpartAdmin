import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import GarageItem from './GarageItem';
class GarageList extends Component{

  render(){
    console.log('render GarageList');
    const{garageList, actions} = this.props;

    var garageItemList = [];
    for(let index in garageList){
      garageItemList.push(
        <GarageItem
          garageId={index}
          garage={garageList[index]}
          {...actions}
        />
      );
    }
    return(
      <ul>{garageItemList}</ul>
    );
  }
}
GarageList.propTypes = {
  garageList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default GarageList;
