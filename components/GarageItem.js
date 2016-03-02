import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import assign from 'object-assign'
import { Router, Route, Link, browserHistory } from 'react-router'


class GarageItem extends Component{
  constructor(props, context){
    super(props, context);
    this.state={
      editable:false,
      garage:this.props.garage //This is anti-pattern! But only for UI state update. Do not use this for any other purposes
    }
  }

  render(){
    //console.log('render GarageItem');
    var inputGarageName
    var inputAddress
    var inputCity
    var inputPhone
    var inputEmail
    var saveButton
    var inputMaster
    var inputRegion, inputCountry
    var editButtonValue = 'Edit'
    var saveButtonValue = 'Save'
    var disabled = false
    var garageId = this.props.garageId
    const{garage, isUpdatingGarage, updatingGarageId} = this.props
    var masterList = this.props.masterList
    //console.log(masterList)
    if(isUpdatingGarage === true&&updatingGarageId==garageId){
      saveButtonValue = 'Updating...'
      editButtonValue = 'Updating...'
      disabled = true
    }
    if(this.state.editable){
      inputGarageName = <input type="text"  className="form-control"   name="garageName" value={this.state.garage.garageName} onChange={this.handleChange.bind(this)}/>;
      inputPhone = <input type="text"  className="form-control"  name="phone" value={this.state.garage.phone} onChange={this.handleChange.bind(this)}/>;
      inputEmail = <input type="text"  className="form-control"  name="email" value={this.state.garage.email} onChange={this.handleChange.bind(this)}/>;
      inputAddress = <input type="text"  className="form-control"  name="address" value={this.state.garage.address}  onChange={this.handleChange.bind(this)}/>;
      inputCity = <input type="text"  className="form-control"  name="city" value={this.state.garage.city}  onChange={this.handleChange.bind(this)}/>;
      inputPhone = <input type="text"  className="form-control"  name="phone" value={this.state.garage.phone}  onChange={this.handleChange.bind(this)}/>;
      inputEmail = <input type="text"  className="form-control"  name="country" value={this.state.garage.country}  onChange={this.handleChange.bind(this)}/>;
      inputRegion = <input type="text"  className="form-control"  name="region" value={this.state.garage.region}  onChange={this.handleChange.bind(this)}/>;

      var options = []
      options.push(<option value='0'>None</option>)
      for(var props in masterList){
        options.push(<option value='3'>{masterList[props]}</option>)
      }
      inputMaster =
      <select name='masterId' className="form-control" value={this.state.garage.masterId} onChange={this.handleChange.bind(this)}>
      {options}
    </select>
      /*
      <Select
        name="masterId"
        value="3"
        options={options}
        />
        */
      saveButton = <button  className="btn btn-default" onClick={this.handleSaveClick.bind(this)} disabled={disabled}>{saveButtonValue}</button>;
    }
    return <tr
            className={classNames({
              'editing': this.state.editable
            })}
            >
              <td><div className="view">{this.state.garage.garageName}</div>{inputGarageName}</td>
              <td><div className="view">{this.state.garage.phone}</div>{inputAddress}</td>
              <td><div className="view">{this.state.garage.email}</div>{inputCity}</td>
              <td><div className="view">{this.state.garage.address}</div>{inputPhone}</td>
              <td><div className="view">{this.state.garage.city}</div>{inputCity}</td>
              <td><div className="view">{this.state.garage.region}</div>{inputRegion}</td>
              <td><div className="view">{this.state.garage.country}</div>{inputCountry}</td>
              <td><div className="view">{this.state.garage.master}</div>{inputMaster}</td>
              <td><div className="view"><button  className="btn btn-default" onClick={this.handleEditClick.bind(this)} disabled={disabled}>{editButtonValue}</button></div>{saveButton}</td>
              <td><button  className="btn btn-default" onClick={this._handleDeleteOnClick}>delete</button></td>
              <td><Link to={`/garages/${garageId}/supplierlist`}>supllier list</Link></td>
          </tr>;
  }

  handleEditClick(){
    this.setState({editable:true});
  }

  handleChange(event){
    var garageId = this.props.garageId;
    var updatedGarage = {};
    updatedGarage = this.state.garage;
    //console.log(event.target.name)
    switch(event.target.name){
       case 'garageName':
         updatedGarage = assign({}, this.state.garage, {garageName:event.target.value})
         break;
       case 'address':
         updatedGarage = assign({}, this.state.garage, {address:event.target.value})
         break;
       case 'city':
         updatedGarage = assign({}, this.state.garage, {city:event.target.value})
         break;
       case 'phone':
         updatedGarage = assign({}, this.state.garage, {phone:event.target.value})
         break;
       case 'email':
         updatedGarage = assign({}, this.state.garage, {email:event.target.value})
         break;
      case 'masterId':
         updatedGarage = assign({}, this.state.garage, {masterId:event.target.value})
         break;
    }
    this.setState({garage:updatedGarage});
  }
  handleSaveClick(){
      this.setState({editable:false})
      console.log('click save button')
      console.log(this.state.garage)
      console.log('bbbbbbbb')
      this.props.fetchUpdateGarage(this.state.garage)
  }
}
GarageItem.propTypes = {
  saveGarage: PropTypes.func.isRequired,
  garage: PropTypes.object.isRequired,
  garageId: PropTypes.string.isRequired
}
export default GarageItem
