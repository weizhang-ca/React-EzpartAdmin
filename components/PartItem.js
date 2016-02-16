import React, {Component} from 'react'
import classNames from 'classnames'

class PartItem extends Component{
    constructor(props, context){
      super(props, context)
      this.state={
        editable: false,
        partItem: this.props.partItem
      }
    }
    handleEditClick(){
      this.setState({editable:true})
    }
    render(){
      var inputPartName
      var inputPartNumber
      var inputPartList
      var inputPartNet
      var inputPartType
      var inputQty
      var saveButton;
      if(this.state.editable){
        inputPartName = <input type="text" name="partName" value={this.state.partItem.partName}/>
        inputPartNumber = <input type="text" name="partNumber" value={this.state.partItem.partNumber}/>
        inputPartList = <input type="text" name="partList" value={this.state.partItem.partList}/>
        inputPartNet = <input type="text" name="partNet" value={this.state.partItem.partNet}/>
        inputPartType = <input type="text" name="partType" value={this.state.partItem.partType}/>
        inputQty = <input type="text" name="qty" value={this.state.partItem.qty}/>
        saveButton = <button>Save</button>
      }
      const {partItem} = this.props
      return(
        <div className={classNames({
          'editing': this.state.editable
        })}>
          <table>
            <tr>
              <td><div className="view">{partItem.partName}</div>{inputPartName}</td>
              <td><div className="view">{partItem.partNumber}</div>{inputPartNumber}</td>
              <td><div className="view">{partItem.partList}</div>{inputPartList}</td>
              <td><div className="view">{partItem.partNet}</div>{inputPartNet}</td>
              <td><div className="view">{partItem.partType}</div>{inputPartType}</td>
              <td><div className="view">{partItem.qty}</div>{inputQty}</td>
              <td><div className="view"><button onClick={this.handleEditClick.bind(this)}>Edit</button></div>{saveButton}</td>
            </tr>
          </table>
        </div>
      )
    }
}

export default PartItem
