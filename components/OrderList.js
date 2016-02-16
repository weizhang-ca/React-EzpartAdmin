import React, {Component, PropTypes} from 'react'
import OrderSearchForm from './OrderSearchForm'
import OrderItem from './OrderItem'
class OrderList extends Component{

  render(){
    console.log(this.props)
    const {orderList, orderParts, isFetchingOrders, partFetchingOrderId, isFetchingOrderParts, isUpdatingOrder, isEditingOrder, updatingOrderId} = this.props.storeState.order
    const{actions} = this.props
    var orderArray;
    if(isFetchingOrders){
      orderArray = <div>Fetching orders...</div>
    }
    else if(orderList!==null&&orderList!==undefined&&Object.keys(orderList).length>0){
      orderArray = []
      for(var key in orderList){
        orderArray.push(
          <OrderItem
            orderId={key}
            partFetchingOrderId={partFetchingOrderId}
            orderItem={orderList[key]}
            orderParts={orderParts}
            {...actions}
            isFetchingOrderParts={isFetchingOrderParts}
            isUpdatingOrder={isUpdatingOrder}
            isEditingOrder={isEditingOrder}
            updatingOrderId={updatingOrderId}
            />
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
