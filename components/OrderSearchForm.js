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
    var orderList={
      1:{garageId:1, supplierId:1, garageName:'Test Garage1', supplierName:'Test Supplier1', orderDate:'2016-01-30', po:"123123", totalValue:123.31, totalPart:8},
      2:{garageId:1, supplierId:2, garageName:'Test Garage1', supplierName:'Test Supplier2', orderDate:'2016-01-30', po:"444512", totalValue:513.1, totalPart:6},
      3:{garageId:2, supplierId:1, garageName:'Test Garage2', supplierName:'Test Supplier1', orderDate:'2016-01-30', po:"4134", totalValue:636.41, totalPart:2},
      4:{garageId:2, supplierId:2, garageName:'Test Garage2', supplierName:'Test Supplier2', orderDate:'2016-01-30', po:"31414", totalValue:3241.123, totalPart:15}
    }
    let criteria = this.state
    //this.props.displayOrderList(orderList)
    this.props.fetchOrders(criteria)
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
        <form>
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
        </form>
      </div>
    )
  }
}
OrderSearchForm.propTypes = {
}
export default OrderSearchForm
