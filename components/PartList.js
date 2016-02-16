import React, {Component} from 'react'
import PartItem from './PartItem'
class PartList extends Component{

  render(){
    const {partList, orderId} = this.props
    let partArray = []
    for(var key in partList){
      partArray.push(
        <PartItem
          partId={key}
          partItem={partList[key]}
        />
      )
    }
    return (
      <div>{partArray}</div>
    )
  }
}
export default PartList
