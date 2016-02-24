import React, {Component} from 'react'
import classNames from 'classnames'
import assign from 'object-assign'
import PartList from './PartList'
import SkyLight from 'react-skylight'
import Spinner from 'react-spinkit'
class OrderItem extends Component{
    constructor(props, context){
      super(props, context)
      this.state={
        editable:this.props.isEditingOrder,
        orderItem: this.props.orderItem
      }
    }

    handleOrderClick(orderId){
      this.props.fetchPartList(orderId)
      this.refs.orderPartScreen.show()
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
      const partScreenStyle = {
          backgroundColor: '#fff',
          color: '#fff',
          width: '70%',
          height: '500px',
          marginTop: '-300px',
          marginLeft: '-35%',
        }
      const closeButtonStyle ={
          color:'#000',
          cursor: 'pointer',
          position: 'absolute',
          fontSize: '1.8em',
          right: '10px',
          top: '0'
        }
        const{  orderItem, isFetchingOrderList, orderId, isUpdatingOrder,
                updatingOrderId, savePart, storeState, actions,
                } = this.props;
        const{isFetchingPartList, isFailedFetchPartList, partList} = this.props.storeState.part
        let thePartList
        console.log(isFetchingPartList)
        if(isFetchingPartList===true){
          var divStyle={
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
          }
            thePartList=<div style={divStyle}><Spinner spinnerName='circle'/></div>
        }
        else if(partList!==null&&partList!==undefined){
            thePartList = <PartList
                        savePart={savePart}
                        partList={partList}
                        storeState={storeState}
                        actions={actions}
                        />

        }
        //console.log('xxxxxxxxxxxxxx')
        console.log(thePartList)
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
        var part=[{partId:1, partName:'test', partNumber:'test', partList:123, partNet:111, partType:'OEM'}]
        return (
            <tr>
              <td onClick={this.handleOrderClick.bind(this)}>{orderItem.garageName}</td>
              <td>{orderItem.supplierName}</td>
              <td>{orderItem.orderDate}</td>
              <td>{orderItem.poNumber}</td>
              <td>{orderItem.totalValue}</td>
              <td>{orderItem.totalPart}</td>
              <td>{orderItem.orderNote}</td>
              <td><div>
                {orderItem.claim}
                <SkyLight hideOnOverlayClicked ref="orderPartScreen" title=""
                  dialogStyles={partScreenStyle}
                  closeButtonStyle={closeButtonStyle}
                  >
                      {thePartList}
                </SkyLight>
              </div></td>
            </tr>
        )
    }
}
export default OrderItem
