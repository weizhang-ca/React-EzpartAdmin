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
    handleSaveClick(partId){
        this.props.savePart(this.state.partItem, partId)
        this.setState({editable:false})
    }
    handleChange(event){
      let newState
      switch(event.target.name){
        case 'partName':
          newState = (Object.assign({}, this.state.partItem, {partName:event.target.value}))
          break;
        case 'partNumber':
          newState = (Object.assign({}, this.state.partItem, {partNumber:event.target.value}))
          break;
        case 'partList':
          newState = (Object.assign({}, this.state.partItem, {partList:event.target.value}))
          break;
        case 'partNet':
          newState = (Object.assign({}, this.state.partItem, {partNet:event.target.value}))
          break;
        case 'partType':
          newState = (Object.assign({}, this.state.partItem, {partType:event.target.value}))
          break;
      }
      this.setState({partItem:newState})
    }
    render(){
      const {partItem, partId} = this.props
      const {isUpdatingPart, updatingPartId} = this.props.storeState.part

      var inputPartName
      var inputPartNumber
      var inputPartList
      var inputPartNet
      var inputPartType
      var inputQty
      var saveButton
      var editButtonValue='Edit'
      var saveButtonValue='Save'
      var disabled=false
      if(isUpdatingPart&&updatingPartId==partId){
        editButtonValue='Updating...'
        saveButtonValue='Updating...'
        disabled = true;
      }
      if(this.state.editable){
        inputPartName = <input type="text" className="form-control" name="partName" value={this.state.partItem.partName} onChange={this.handleChange.bind(this)}/>
        inputPartNumber = <input type="text" className="form-control" name="partNumber" value={this.state.partItem.partNumber} onChange={this.handleChange.bind(this)}/>
        inputPartList = <input type="text" className="form-control" name="partList" value={this.state.partItem.partList} onChange={this.handleChange.bind(this)}/>
        inputPartNet = <input type="text" className="form-control" name="partNet" value={this.state.partItem.partNet} onChange={this.handleChange.bind(this)}/>
        inputPartType = <input type="text" className="form-control" name="partType" value={this.state.partItem.partType} onChange={this.handleChange.bind(this)}/>
        saveButton = <button className="btn btn-default" onClick={this.handleSaveClick.bind(this, partId)} disabled={disabled}>{saveButtonValue}</button>
      }

      return(
          <tr className={classNames({
            'editing': this.state.editable
          })}>
              <td><div className="view">{partItem.partName}</div>{inputPartName}</td>
              <td><div className="view">{partItem.partNumber}</div>{inputPartNumber}</td>
              <td><div className="view">{partItem.partList}</div>{inputPartList}</td>
              <td><div className="view">{partItem.partNet}</div>{inputPartNet}</td>
              <td><div className="view">{partItem.partType}</div>{inputPartType}</td>
              <td><div className="view"><button className="btn btn-default" onClick={this.handleEditClick.bind(this)} disabled={disabled}>{editButtonValue}</button></div>{saveButton}</td>
            </tr>
      )
    }
}

export default PartItem
