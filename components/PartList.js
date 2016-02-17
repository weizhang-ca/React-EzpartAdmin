import React, {Component} from 'react'
import PartItem from './PartItem'
class PartList extends Component{

  render(){
    const {partList, orderId, storeState} = this.props
    console.log('xsdfsdfasdf')
    console.log(partList)
    const {actions} = this.props
    let partArray = []
    for(var key in partList){
      partArray.push(
        <PartItem
          partId={key}
          {...actions}
          storeState={storeState}
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
