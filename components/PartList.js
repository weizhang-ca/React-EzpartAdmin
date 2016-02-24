import React, {Component} from 'react'
import PartItem from './PartItem'
class PartList extends Component{

  render(){
    const {partList, orderId, storeState} = this.props
    console.log('aaaaaa')
    console.log(partList)
    const {actions} = this.props
    let partArray = []
    for(var key in partList){
      partArray.push(
        <PartItem
          partId={partList[key].partId}
          {...actions}
          storeState={storeState}
          partItem={partList[key]}
        />
      )
    }
    return (
      <table>
        <tr>
          <th>Description</th>
          <th>Number</th>
          <th>List</th>
          <th>Net</th>
          <th>Type</th>
          <th></th>
        </tr>
        {partArray}
      </table>
    )
  }
}
export default PartList
