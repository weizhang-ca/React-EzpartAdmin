var React = require('react');
var classNames = require('classNames');
var assign = require('object-assign');
import { Router, Route, Link, browserHistory } from 'react-router';

var GarageItem = React.createClass({

  render: function(){
    var inputGarageName;
    var inputAddress;
    var inputCity;
    var inputPhone;
    var inputEmail;
    var saveButton;
    var garageId = this.props.garageId;
    if(this.props.isEditing){
      inputGarageName = <input type="text" name="garageName" value={this.props.garage.garageName} onChange={this._handleChange}/>;
      inputAddress = <input type="text" name="address" value={this.props.garage.address}  onChange={this._handleChange}/>;
      inputCity = <input type="text" name="city" value={this.props.garage.city}  onChange={this._handleChange}/>;
      inputPhone = <input type="text" name="phone" value={this.props.garage.phone}  onChange={this._handleChange}/>;
      inputEmail = <input type="text" name="email" value={this.props.garage.email}  onChange={this._handleChange}/>;
      saveButton = <button onClick={this._saveOnClick}>Save</button>;
    }
    return <li
            className={classNames({
              'editing': this.props.isEditing
            })}
            >
            <table>
              <tr>
              <td><div className="view">{this.props.garage.garageName}</div>{inputGarageName}</td>
              <td><div className="view">{this.props.garage.address}</div>{inputAddress}</td>
              <td><div className="view">{this.props.garage.city}</div>{inputCity}</td>
              <td><div className="view">{this.props.garage.phone}</div>{inputPhone}</td>
              <td><div className="view">{this.props.garage.email}</div>{inputEmail}</td>
              <td><div className="view"><button onClick={this._handleEditOnClick}>edit</button></div>{saveButton}</td>
              <td><button onClick={this._handleDeleteOnClick}>delete</button></td>
              <td><button onClick={this._handleSupplierListOnClick}><Link to="garageSupplier" params={{garageId:this.props.garageId}}>supllier list</Link></button></td>
            </tr>
            </table>
          </li>;
  },

  _handleEditOnClick: function() {
   this.props.editGarage(this.props.garageId);
 },
 _handleDeleteOnClick: function(){

 },
 _handleSupplierListOnClick: function(){
   this.props.displaySupplierList(this.props.garageId);
 },
 _saveOnClick: function() {
   this.props.saveGarage(this.props.garageId);
 },
 _handleChange: function(event){
   var key = this.props.garageId;
   var updatedGarage = {};
   switch(event.target.name){
      case 'garageName':
        updatedGarage[key] = assign({}, this.props.garage, {garageName:event.target.value});
        this.props.updateGarageInput(updatedGarage);
        break;
      case 'address':
        updatedGarage[key] = assign({}, this.props.garage, {address:event.target.value});
        this.props.updateGarageInput(updatedGarage);
        break;
      case 'city':
        updatedGarage[key] = assign({}, this.props.garage, {city:event.target.value});
        this.props.updateGarageInput(updatedGarage);
        break;
      case 'phone':
        updatedGarage[key] = assign({}, this.props.garage, {phone:event.target.value});
        this.props.updateGarageInput(updatedGarage);
        break;
      case 'email':
        updatedGarage[key] = assign({}, this.props.garage, {email:event.target.value});
        this.props.updateGarageInput(updatedGarage);
        break;
   }
 }
});

module.exports = GarageItem;
