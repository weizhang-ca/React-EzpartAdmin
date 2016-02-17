import React, {Component} from 'react'
import classNames from 'classnames'
import assign from 'object-assign'
import PartList from './PartList'

class OrderItem extends Component{
    constructor(props, context){
      super(props, context)
      this.state={
        editable:this.props.isEditingOrder,
        orderItem: this.props.orderItem
      }
    }

    handleOrderClick(key){
      //console.log('find part list of order '+key)
      //console.log(this.props.actions)
      if(this.props.partFetchingOrderId==key){
        this.props.clearOrderParts(key)
      }
      else{
        this.props.fetchOrderParts(key)
      }
    }
    handleEditClick(key){
      this.setState({editable:true})
    }
    handleChange(event){
      switch(event.target.name){
        case 'orderDate':
          //console.log(event.target.value+'update orderDate..................')
          var newState = assign({}, this.state.orderItem, {orderDate:event.target.value});
          //console.log(newState)
          this.setState({orderItem:newState})
          break;
      }
    }
    handleSaveClick(orderId){
      this.props.saveOrder(this.state.orderItem, orderId);
      this.setState({editable:false})
    }
    render(){
        const{ orderItem, isFetchingOrderParts, orderParts, partFetchingOrderId, orderId, isUpdatingOrder, updatingOrderId, savePart, storeState, actions} = this.props;
        //console.log(this.props)
        let partList=null;
        if(isFetchingOrderParts&&orderId==partFetchingOrderId){
          partList=<div>Fetching part...</div>
        }
        else if(orderParts!==null&&orderParts!==undefined){
            partList = <PartList
                        savePart={savePart}
                        partList={orderParts[orderId]}
                        storeState={storeState}
                        actions={actions}
                        />

        }
        var inputOrderDate
        var saveButton
        var buttonValue;
        var editButtonValue;
        buttonValue ='save'
        editButtonValue = 'edit'
        var disabled=false;
        if(isUpdatingOrder){
          if( updatingOrderId==orderId){
              buttonValue = 'Updating...'
              editButtonValue = 'Updating...'
            }
            disabled = true;
          }

        if(this.state.editable){
          inputOrderDate = <input type="text" name="orderDate" value={this.state.orderItem.orderDate}  onChange={this.handleChange.bind(this)} disabled={disabled}/>;
          saveButton = <button name="save" onClick={this.handleSaveClick.bind(this,orderId)} disabled={disabled}>{buttonValue}</button>;
        }
        return (
          <div className={classNames({
            'editing': this.state.editable
          })}
          >
            <table>
            <tbody>
            <tr>
              <td>{orderItem.garageName}</td>
              <td>{orderItem.supplierName}</td>
              <td><div className="view">{orderItem.orderDate}</div>{inputOrderDate}</td>
              <td>{orderItem.totalValue}</td>
              <td>{orderItem.totalPart}</td>
              <td><div className="view"><button onClick={this.handleEditClick.bind(this)} disabled={disabled}>{editButtonValue}</button></div>{saveButton}</td>
              <td><button name="viewParts" onClick={this.handleOrderClick.bind(this, orderId)} disabled={disabled}>View Parts</button></td>
            </tr>
            <tr><td colSpan='7'>
              {
                  partList
              }
            </td></tr>
            </tbody>
            </table>
          </div>
        );
    }
}
export default OrderItem
