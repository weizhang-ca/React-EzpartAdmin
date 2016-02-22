import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import GarageItem from './GarageItem';
class GarageList extends Component{

  componentDidMount(){
    this.props.actions.fetchGarageList();
  }
  render(){
    const{garageList, isFetchingGarageList, fetchGarageListFailed,
          isUpdatingGarage, updatingGarageId, error} = this.props.storeState.garage;
    const{actions} = this.props;
    var masterList = {3:'Advantage'}
    var garageItemList = [];
    if(isFetchingGarageList){
      return <div>Fetching Garages....</div>
    }
    else{
      if(fetchGarageListFailed===true){
        return(<div>Faield to get garage list. Please try a again later</div>)
      }
      //console.log(garageList);
      for(let index in garageList){
        garageItemList.push(
          <GarageItem
            masterList={masterList}
            garageId={garageList[index].garageId}
            garage={garageList[index]}
            isUpdatingGarage = {isUpdatingGarage}
            updatingGarageId = {updatingGarageId}
            {...actions}
          />
        );
      }
      return(
        <table>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Region</th>
            <th>Country</th>
            <th>Master</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          {garageItemList}
        </table>
      );
    }
  }
}
GarageList.propTypes = {
  //garageList: PropTypes.object.isRequired,
  //actions: PropTypes.object.isRequired
}

export default GarageList;
