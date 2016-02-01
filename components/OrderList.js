import React, {Component, PropTypes} from 'react'
import OrderSearchForm from './OrderSearchForm'

class OrderList extends Component{

  handleOrderClick(key){
    //console.log('find part list of order '+key)
    var parts={
      1:{partName:'Bumper', partNumber:'839182', partList:'100', partNet:'90', partType:'OEM', qty:1},
      2:{partName:'Head light', partNumber:'124123', partList:'220', partNet:'190', partType:'OEM', qty:1},
      3:{partName:'Clamp', partNumber:'123123', partList:'10', partNet:'8', partType:'Aftermarket', qty:4}
    }
    var orderParts={
      1: parts
    }
    setTimeout(this.UpdateParts, 5000);
    console.log('asdfasdfasdfasdf')
    //console.log(this.props.actions)
    this.props.actions.displayOrderParts(orderParts)
  }
  render(){
    console.log(this.props)
    const {orderList, orderParts} = this.props
    var orderArray = []
    if(orderList!==null&&orderList!==undefined&&Object.keys(orderList).length>0){

      for(var key in orderList){
        var orderPartsArray = []
        if(orderParts!==null&&orderParts!==undefined&&Object.keys(orderParts).length>0){
            var orderKey = Object.keys(orderParts)[0]
            if(orderKey == key){
              for(var partKey in orderParts[orderKey]){
                orderPartsArray.push(
                  <tr>
                    <td>{orderParts[orderKey][partKey].partName}</td>
                    <td>{orderParts[orderKey][partKey].partNumber}</td>
                    <td>{orderParts[orderKey][partKey].partList}</td>
                    <td>{orderParts[orderKey][partKey].partNet}</td>
                    <td>{orderParts[orderKey][partKey].partType}</td>
                    <td>{orderParts[orderKey][partKey].qty}</td>
                  </tr>
                  )
                }
            }
        }
        orderArray.push(
          <div>
            <table>
            <tbody>
            <tr onClick={this.handleOrderClick.bind(this, key)}>
              <td>{orderList[key].garageName}</td>
              <td>{orderList[key].supplierName}</td>
              <td>{orderList[key].orderDate}</td>
              <td>{orderList[key].totalValue}</td>
              <td>{orderList[key].totalPart}</td>
            </tr>
              {
                orderPartsArray
              }
            </tbody>
            </table>
          </div>
        )
      }
    }
    //console.log('Orderlist says: ')
    return(
      <div>
        <OrderSearchForm displayOrderList={this.props.actions.displayOrderList}/>
        {orderArray}
      </div>
    )
  }
}
OrderList.propTypes = {
  orderList: PropTypes.object.isRequired,
  orderParts: PropTypes.object.isRequired
}
export default OrderList
