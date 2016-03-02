import React, {Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import classNames from 'classnames'
class Header extends Component{
  constructor(props, context){
    super(props, context)
    this.state={
      isSelectGarage:false,
      isSelectSupplier:false,
      isSelectOrder:false,
      isSelectCarMake:false,
      isSelectInvoice:false
    }
  }
  handleClick(item){
    //console.log('item is xxxxxxxxx'+item)
    switch(item){
      case 'garage':
        this.setState(Object.assign({}, this.state, {isSelectGarage:true,isSelectSupplier:false,isSelectOrder:false,isSelectCarMake:false,isSelectInvoice:false}))
        break
      case 'supplier':
        this.setState(Object.assign({}, this.state, {isSelectGarage:false,isSelectSupplier:true,isSelectOrder:false,isSelectCarMake:false,isSelectInvoice:false}))
        break
      case 'order':
        this.setState(Object.assign({}, this.state, {isSelectGarage:false,isSelectSupplier:false,isSelectOrder:true,isSelectCarMake:false,isSelectInvoice:false}))
        break
      case 'carMake':
        this.setState(Object.assign({}, this.state, {isSelectGarage:false,isSelectSupplier:false,isSelectOrder:false,isSelectCarMake:true,isSelectInvoice:false}))
        break
      case 'invoice':
        this.setState(Object.assign({}, this.state, {isSelectGarage:false,isSelectSupplier:false,isSelectOrder:false,isSelectCarMake:false,isSelectInvoice:true}))
        break
      //default:
        //this.setState(Object.assign({}, this.state, {isSelectGarage:false,isSelectSupplier:false,isSelectOrder:false}))
        //break
    }
  }
  render(){

    return(
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
        <li className={classNames({
          'active': this.state.isSelectGarage
            })} onClick={this.handleClick.bind(this, 'garage')}><Link to="/garages">garage</Link></li>
        <li className={classNames({
          'active': this.state.isSelectSupplier
            })} onClick={this.handleClick.bind(this, 'supplier')}><Link to="/suppliers">supplier</Link></li>
        <li className={classNames({
          'active': this.state.isSelectOrder
            })}  onClick={this.handleClick.bind(this, 'order')}><Link to="/orders">order</Link></li>
        <li className={classNames({
          'active': this.state.isSelectCarMake
        })}  onClick={this.handleClick.bind(this, 'carMake')}><Link to="/carMakes">car make</Link></li>
        <li className={classNames({
          'active': this.state.isSelectInvoice
        })}  onClick={this.handleClick.bind(this, 'invoice')}><Link to="/invoices">invoice</Link></li>
        </ul>
        </div>
      </div>
    </nav>
    )
  }
}
module.exports = Header
