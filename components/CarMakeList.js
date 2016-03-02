import React, {Component} from 'react'
import CarMake from './CarMake'
class CarMakeList extends Component{

  componentDidMount(){
    this.props.actions.fetchCarMakeList()
  }
  render(){
    let carMakeRows = []
    //console.log(this.props.storeState)
    const{carMakeList, isFetchingCarMakeList} = this.props.storeState.carmake
    if(carMakeList!=undefined&&carMakeList!=null){
      carMakeList.forEach((element, index)=>{
        carMakeRows.push(
          <CarMake
            carMake={element}
            saveCarMake={this.props.actions.saveCarMake}
          />
        )
      })
    }
    return(
      <div className="row">
      <div className="col-md-4">
      <table className="table table-bordered table-hover table-condensed table-responsive">
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Active</th>
          <th></th>
        </tr>
        {carMakeRows}
      </table>
      </div>
      </div>
    )
  }
}
export default CarMakeList
