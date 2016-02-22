import React, {Component,PropTypes} from 'react'

class OrderSearchForm extends Component{
  constructor(props, context){
    super(props, context)
    this.state={
      garageId:-1,
      supplierId:-1
    }
  }
  handleSubmit(){
    //console.log(this.state)
    let criteria = this.state
    //this.props.displayOrderList(orderList)
    this.props.fetchOrderList()
  }
  handleChange(e){
    switch(e.target.name){
      case 'garage':
        this.setState({garageId:e.target.value})
        break
      case 'supplier':
        this.setState({supplierId:e.target.value})
        break
    }
  }
  render(){
    //console.log('OrderSearchForm says')
    return(
      <div>
        Garage
        <select name="garage"  value={this.state.garageId} onChange={this.handleChange.bind(this)}>
          <option value="-1">All</option>
          <option value="1">Garage1</option>
          <option value="2">Garage2</option>
        </select>

        Supplier
        <select name="supplier" value={this.state.supplierId} onChange={this.handleChange.bind(this)}>
          <option value="-1">All</option>
          <option value="1">Supplier1</option>
          <option value="2">Supplier2</option>
        </select>
        <input type='button' onClick={this.handleSubmit.bind(this)} value='submit'/>
      </div>
    )
  }
}
OrderSearchForm.propTypes = {
}
export default OrderSearchForm
