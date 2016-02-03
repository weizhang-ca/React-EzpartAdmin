import React, {Component, PropTypes} from 'react'
import OrderSearchForm from './OrderSearchForm'

class OrderList extends Component{

  handleOrderClick(key){
    //console.log('find part list of order '+key)
    //console.log(this.props.actions)
    this.props.actions.fetchOrderParts(key)
  }

  render(){
    console.log(this.props)
    const {orderList, orderParts, isFetchingOrders, orderId, isFetchingOrderParts} = this.props
    var orderArray;
    if(isFetchingOrders){
      orderArray = <div>Fetching orders...</div>
    }
    else if(orderList!==null&&orderList!==undefined&&Object.keys(orderList).length>0){
      orderArray = []
      for(var key in orderList){
        var orderPartsArray;
        if(isFetchingOrderParts&&key==orderId){
          orderPartsArray=<div>Fetching part...</div>
        }
        else if(orderParts!==null&&orderParts!==undefined&&Object.keys(orderParts).length>0){
            var orderKey = Object.keys(orderParts)[0]
            orderPartsArray = []
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
        else{
          orderPartsArray = []
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
    else{
      orderArray = <div></div>
    }
    //console.log('Orderlist says: ')
    return(
      <div>
        <OrderSearchForm fetchOrders={this.props.actions.fetchOrders}/>
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
