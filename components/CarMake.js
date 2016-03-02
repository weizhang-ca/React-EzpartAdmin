import React, {Component} from 'react'

class CarMake extends Component{
  constructor(props, context){
    super(props, context)
    this.state={
      carMake: this.props.carMake
    }
  }
  handleChange(e){
    let newCarMake = Object.assign({}, this.state.carMake, {isActive:e.target.value})
    this.setState(Object.assign({}, this.state, newCarMake))
  }
  handleClick(){
    this.props.saveCarMake(this.state.carMake)
  }
  render(){
    const{carMake} = this.props
    let make = carMake.make
    return (
    <tr>
      <td>{make}</td>
      <td>Model</td>
      <td>
      <select className='form-control' name='isActive' value={this.state.carMake.isActive} onChange={this.handleChange.bind(this)}>
        <option value='-1'>Active</option>
        <option value='1'>Inactive</option>
      </select>
      </td>
      <td>
      <button className='form-control' onClick={this.handleClick.bind(this)}>Save</button>
      </td>
    </tr>
    )
  }
}
export default CarMake
