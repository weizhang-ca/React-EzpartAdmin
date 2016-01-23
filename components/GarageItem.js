var React = require('react');
var classNames = require('classNames');
var assign = require('object-assign');

var GarageItem = React.createClass({
  getInitialState: function(){
    return {
      isEditing: false,
      garage:this.props.garage
    };
  },
  render: function(){
    var inputGarageName;
    var inputAddress;
    var inputCity;
    var inputPhone;
    var inputEmail;
    var saveButton;
    if(this.state.isEditing){
      inputGarageName = <input type="text" name="garageName" value={this.state.garage.garageName} onChange={this._handleChange}/>;
      inputAddress = <input type="text" name="address" value={this.state.garage.address}  onChange={this._handleChange}/>;
      inputCity = <input type="text" name="city" value={this.state.garage.city}  onChange={this._handleChange}/>;
      inputPhone = <input type="text" name="phone" value={this.state.garage.phone}  onChange={this._handleChange}/>;
      inputEmail = <input type="text" name="email" value={this.state.garage.email}  onChange={this._handleChange}/>;
      saveButton = <button onClick={this._saveOnClick}>Save</button>;
    }
    return <li
            className={classNames({
              'editing': this.state.isEditing
            })}
            >
            <table>
            <tr>
              <td><div className="view">{this.state.garage.garageName}</div>{inputGarageName}</td>
              <td><div className="view">{this.state.garage.address}</div>{inputAddress}</td>
              <td><div className="view">{this.state.garage.city}</div>{inputCity}</td>
              <td><div className="view">{this.state.garage.phone}</div>{inputPhone}</td>
              <td><div className="view">{this.state.garage.email}</div>{inputEmail}</td>
              <td><div className="view"><button onClick={this._editOnClick}>edit</button></div>{saveButton}</td>
              <td><button onClick={this.props.deleteOnClick}>delete</button></td>
            </tr>
            </table>
          </li>;
  },

  _editOnClick: function() {
   this.setState({isEditing: true});
 },
 _saveOnClick: function() {
   this.props.updateGarage(this.state.garage);
   this.setState({
     isEditing:false
   });
 },
 _handleChange: function(event){
   switch(event.target.name){
      case 'garageName':
        var updatedGarage = assign({}, this.state.garage, {garageName:event.target.value});
        this.setState({
          garage: updatedGarage
        });
        break;
      case 'address':
        var updatedGarage = assign({}, this.state.garage, {address:event.target.value});
        this.setState({
          garage: updatedGarage
        });
        break;
      case 'city':
        var updatedGarage = assign({}, this.state.garage, {city:event.target.value});
        this.setState({
          garage: updatedGarage
        });
        break;
      case 'phone':
        var updatedGarage = assign({}, this.state.garage, {phone:event.target.value});
        this.setState({
          garage: updatedGarage
        });
        break;
      case 'email':
        var updatedGarage = assign({}, this.state.garage, {email:event.target.value});
        this.setState({
          garage: updatedGarage
        });
        break;
   }
 }
});

module.exports = GarageItem;
