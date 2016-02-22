import React, {Component} from 'react'
import classNames from 'classnames'
class SupplierItem extends Component{
  constructor(props, context){
    super(props, context);
    this.state={
      editable:false,
      supplier:this.props.supplier //This is anti-pattern! But only for UI state update. Do not use this for any other purposes
    }
  }
  handleEditClick(){
    this.setState(Object.assign({},this.state,{editable:true}))
  }
  handleSaveClick(){
    this.props.fetchUpdateSupplier(this.state.supplier)
  }
  handleChange(event){
    var supplierId = this.props.supplierId;
    var updatedSupplier = {};
    updatedSupplier = this.state.supplier;
    switch(event.target.name){
       case 'garageName':
         updatedSupplier = Object.assign({}, this.state.supplier, {garageName:event.target.value})
         break;
       case 'address':
         updatedSupplier = Object.assign({}, this.state.supplier, {address:event.target.value})
         break;
       case 'city':
         updatedSupplier = Object.assign({}, this.state.supplier, {city:event.target.value})
         break;
       case 'phone':
         updatedSupplier = Object.assign({}, this.state.supplier, {phone:event.target.value})
         break;
       case 'email':
         updatedSupplier = Object.assign({}, this.state.supplier, {email:event.target.value})
         break;
      case 'masterId':
         updatedSupplier = Object.assign({}, this.state.supplier, {masterId:event.target.value})
         break;
    }
    this.setState({supplier:updatedSupplier});
  }
  render(){
    const{isUpdatingSupplier} = this.props
    var editButtonValue = 'Edit'
    var saveButtonValue = 'Save'
    var inputSupplierName, inputPhone, inputEmail, inputAddress, inputCity,
        inputRegion, inputCountry, inputMaster, saveButton
    var disabled = false
    if(this.state.editable){
      inputSupplierName = <input type='text' name='supplierName' value={this.state.supplier.supplierName} onChange={this.handleChange.bind(this)}></input>
      inputPhone = <input type='text' name='phone' value={this.state.supplier.phone} onChange={this.handleChange.bind(this)}></input>
      inputEmail = <input type='text' name='email' value={this.state.supplier.email} onChange={this.handleChange.bind(this)}></input>
      inputAddress = <input type='text' name='address' value={this.state.supplier.address} onChange={this.handleChange.bind(this)}></input>
      inputCity = <input type='text' name='city' value={this.state.supplier.city} onChange={this.handleChange.bind(this)}></input>
      inputRegion = <input type='text' name='region' value={this.state.supplier.region} onChange={this.handleChange.bind(this)}></input>
      inputCountry = <input type='text' name='country' value={this.state.supplier.country} onChange={this.handleChange.bind(this)}></input>
      var options = []
      options.push(<option value='0'>None</option>)
      options.push(<option value='3'>Advantage</option>)
      inputMaster =
      <select name='masterId' value={this.state.supplier.masterId} onChange={this.handleChange.bind(this)}>
        {options}
      </select>
      saveButton = <button onClick={this.handleSaveClick.bind(this)} disabled={disabled}>{saveButtonValue}</button>;
    }

    console.log(this.props.supplier)
        return <tr
                className={classNames({
                  'editing': this.state.editable
                })}
                >
            <td><div className="view">{this.props.supplier.supplierName}</div>{inputSupplierName}</td>
            <td><div className="view">{this.props.supplier.phone}</div>{inputPhone}</td>
            <td><div className="view">{this.props.supplier.email}</div>{inputEmail}</td>
            <td><div className="view">{this.props.supplier.address}</div>{inputAddress}</td>
            <td><div className="view">{this.props.supplier.city}</div>{inputCity}</td>
            <td><div className="view">{this.props.supplier.region}</div>{inputRegion}</td>
            <td><div className="view">{this.props.supplier.country}</div>{inputCountry}</td>
            <td><div className="view">{this.props.supplier.master}</div>{inputMaster}</td>
            <td><div className="view"><button onClick={this.handleEditClick.bind(this)}>{editButtonValue}</button></div>{saveButton}</td>
            </tr>
      }
}
export default SupplierItem
