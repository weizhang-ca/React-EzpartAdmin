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
    console.log('render GarageItem');
    var inputGarageName;
    var inputAddress;
    var inputCity;
    var inputPhone;
    var inputEmail;
    var saveButton;
    var garageId = this.props.garageId;
    if(this.state.editable){
      inputGarageName = <input type="text" name="garageName" value={this.state.garage.garageName} onChange={this.handleChange.bind(this)}/>;
      inputAddress = <input type="text" name="address" value={this.state.garage.address}  onChange={this.handleChange.bind(this)}/>;
      inputCity = <input type="text" name="city" value={this.state.garage.city}  onChange={this.handleChange.bind(this)}/>;
      inputPhone = <input type="text" name="phone" value={this.state.garage.phone}  onChange={this.handleChange.bind(this)}/>;
      inputEmail = <input type="text" name="email" value={this.state.garage.email}  onChange={this.handleChange.bind(this)}/>;
      saveButton = <button onClick={this.handleSaveClick.bind(this)}>Save</button>;
    }
    return <li
            className={classNames({
              'editing': this.state.editable
            })}
            >
            <table>
              <tr>
              <td><div className="view">{this.props.garage.garageName}</div>{inputGarageName}</td>
              <td><div className="view">{this.props.garage.address}</div>{inputAddress}</td>
              <td><div className="view">{this.props.garage.city}</div>{inputCity}</td>
              <td><div className="view">{this.props.garage.phone}</div>{inputPhone}</td>
              <td><div className="view">{this.props.garage.email}</div>{inputEmail}</td>
              <td><div className="view"><button onClick={this.handleEditClick.bind(this)}>edit</button></div>{saveButton}</td>
              <td><button onClick={this._handleDeleteOnClick}>delete</button></td>
              <td><Link to={`/garages/${garageId}/supplierlist`}>supllier list</Link></td>
            </tr>
            </table>
          </li>;
  }

  handleEditClick(){
    this.setState({editable:true});
  }

  handleChange(event){
    var garageId = this.props.garageId;
    var updatedGarage = {};
    updatedGarage = this.state.garage;
    switch(event.target.name){
       case 'garageName':
         updatedGarage = assign({}, this.state.garage, {garageName:event.target.value});
         break;
       case 'address':
         updatedGarage = assign({}, this.state.garage, {address:event.target.value});
         break;
       case 'city':
         updatedGarage = assign({}, this.state.garage, {city:event.target.value});
         break;
       case 'phone':
         updatedGarage = assign({}, this.state.garage, {phone:event.target.value});
         break;
       case 'email':
         updatedGarage = assign({}, this.state.garage, {email:event.target.value});
         break;
    }
    this.setState({garage:updatedGarage});
  }
  handleSaveClick(){
      this.setState({editable:false});
      this.props.saveGarage(this.props.garageId, this.state.garage);
  }
}
GarageItem.propTypes = {
  saveGarage: PropTypes.func.isRequired,
  garage: PropTypes.object.isRequired,
  garageId: PropTypes.string.isRequired
}
export default GarageItem;
