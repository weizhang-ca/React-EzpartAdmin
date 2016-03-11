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
        order: this.props.order
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
          var newState = assign({}, this.state.order, {orderDate:event.target.value});
          //console.log(newState)
          this.setState({order:newState})
          break;
      }
    }
    handleSaveClick(orderId){
      this.props.actions.updateOrder(this.state.order);
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
        const{  order, isUpdatingOrder,
                updatingOrderId, savePart, storeState, actions,
                } = this.props;
        const{isFetchingPartList, isFailedFetchPartList, partList} = this.props.storeState.part
        let thePartList
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
        var inputOrderDate
        var saveButton
        var buttonValue;
        var editButtonValue;
        buttonValue ='save'
        editButtonValue = 'edit'
        var disabled=false;
        if(isUpdatingOrder){
          if( updatingOrderId==order.orderId){
              buttonValue = 'Updating...'
              editButtonValue = 'Updating...'
            }
            disabled = true;
          }

        if(this.state.editable){
          inputOrderDate = <input type="text" className="form-control"  name="orderDate" value={this.state.order.orderDate}  onChange={this.handleChange.bind(this)} disabled={disabled}/>;
          saveButton = <button name="save" onClick={this.handleSaveClick.bind(this,order.orderId)} disabled={disabled}>{buttonValue}</button>;
        }
        var part=[{partId:1, partName:'test', partNumber:'test', partList:123, partNet:111, partType:'OEM'}]
        return (
            <tr>
              <td onClick={this.handleOrderClick.bind(this)}>{order.garageName}</td>
              <td>{order.supplierName}</td>
              <td>{order.orderDate}</td>
              <td>{order.poNumber}</td>
              <td>{order.totalValue}</td>
              <td>{order.totalPart}</td>
              <td>{order.orderNote}</td>
              <td><div>
                {order.claim}
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
