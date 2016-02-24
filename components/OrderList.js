import React, {Component, PropTypes} from 'react'
import OrderSearchForm from './OrderSearchForm'
import OrderItem from './OrderItem'
import Spinner from 'react-spinkit'
class OrderList extends Component{

  render(){
    console.log(this.props)
    const {orderList, orderParts, isFetchingOrderList, partFetchingOrderId, isFetchingOrderParts, isUpdatingOrder, isEditingOrder, updatingOrderId} = this.props.storeState.order
    const{actions} = this.props
    const{storeState} = this.props
    var orderArray
    console.log('orderArray')
    console.log(isFetchingOrderList)
    if(isFetchingOrderList===true){
      var divStyle={
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100px',
        height: '100px',
      }
        orderArray=<div style={divStyle}><Spinner spinnerName='circle'/></div>
    }
    else if(orderList!==null&&orderList!==undefined){
      orderArray = []
      for(var key in orderList){
        orderArray.push(
          <OrderItem
            orderId={orderList[key].orderId}
            orderItem={orderList[key]}
            {...actions}
            isUpdatingOrder={isUpdatingOrder}
            isEditingOrder={isEditingOrder}
            updatingOrderId={updatingOrderId}
            storeState={this.props.storeState}
            actions={actions}
            />
        )
      }
    }
    else{
      orderArray = <tr></tr>
    }

    return(
      <div>
        <OrderSearchForm fetchOrderList={this.props.actions.fetchOrderList}/>
          <table>
            <tr>
              <th>Garage</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>PO</th>
              <th>Value #</th>
              <th>Part #</th>
              <th>Note</th>
              <th>Claim</th>
            </tr>
              {orderArray}
        </table>
      </div>
    )
  }
}
OrderList.propTypes = {
  orderList: PropTypes.object.isRequired,
  orderParts: PropTypes.object.isRequired
}
export default OrderList
