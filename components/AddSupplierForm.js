import React, {Component} from 'react'

class AddSupplierForm extends Component{

  constructor(props, context){
    super(props)
    context.router
    this.state = {
      supplier:{}
    }
  }

  render(){
    //console.log("AddSupplier says: ")
    //console.log(this.context.router)
    return(
      <div>
        <div>Company Name<br/> <input type="text" name="supplierName" value={this.state.supplier.supplierName} onChange={this.handleChange.bind(this)}/></div>
        <div>Address<br/> <input type="text" name="address" value={this.state.supplier.address}  onChange={this.handleChange.bind(this)}/></div>
        <div>City<br/> <input type="text" name="city" value={this.state.supplier.city}  onChange={this.handleChange.bind(this)}/></div>
        <div>Phone<br/> <input type="text" name="phone" value={this.state.supplier.phone}  onChange={this.handleChange.bind(this)}/></div>
        <div>Email<br/> <input type="text" name="email" value={this.state.supplier.email}  onChange={this.handleChange.bind(this)}/></div>
        <div><button onClick={this.handleSaveClick.bind(this)}>Save</button> <button onClick={this.handleBackClick.bind(this)}>Back</button></div>
      </div>
    )
  }
  handleChange(e){
    var supplier
    switch(e.target.name){
      case "supplierName":
        supplier =  Object.assign({}, this.state.supplier, {supplierName: e.target.value})
        break;
      case "address":
        supplier =  Object.assign({}, this.state.supplier, {address: e.target.value})
        break;
      case "city":
        supplier =  Object.assign({}, this.state.supplier, {city: e.target.value})
        break;
      case "phone":
        supplier =  Object.assign({}, this.state.supplier, {phone: e.target.value})
        break;
      case "email":
        supplier =  Object.assign({}, this.state.supplier, {email: e.target.value})
        break;
    }
    this.setState({
      supplier: supplier
    })
  }
  handleSaveClick(){
    this.props.actions.addSupplier({"5":this.state.supplier})
    this.context.router.push('/garages/'+this.props.params.garageId+'/supplierlist')
  }
  handleBackClick(){
    this.context.router.push('/garages/'+this.props.params.garageId+'/supplierlist')
  }
}
AddSupplierForm.contextTypes = {
    router: React.PropTypes.func.isRequired
};
export default AddSupplierForm
