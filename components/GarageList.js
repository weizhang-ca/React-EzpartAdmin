import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import GarageItem from './GarageItem';
class GarageList extends Component{

  componentDidMount(){
    var list = {
                "1":{garageName:'Test1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'test1@test.com', masterId:3, master:'Advantage'},
                "2":{garageName:'Test2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'test2@test.com', masterId:0, master:'None'}
              };

    this.props.actions.displayGarageList(list);
  }
  render(){
    console.log('render GarageList');
    console.log(this.props.storeState)
    const{garageList} = this.props.storeState.garage;
    const{actions} = this.props;
        var masterList = {3:'Advantage'}
    console.log(actions)
    var garageItemList = [];

    for(let index in garageList){
      garageItemList.push(
        <GarageItem
          masterList={masterList}
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
  //garageList: PropTypes.object.isRequired,
  //actions: PropTypes.object.isRequired
}

export default GarageList;
