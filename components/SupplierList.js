import React, {Component} from 'react'
import SupplierItem from './SupplierItem'
import {Link} from 'react-router'
class SupplierList extends Component{

  componentDidMount(){
    if(this.props.params.garageId == 1)
    {
      var supplierList = {
        "1":{supplierName:'Test Supplier 1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier1@test.com'},
        "2":{supplierName:'TestSupplier 2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier2@test.com'}
      }
    }
    else if(this.props.params.garageId == 2){
      var supplierList = {
        "3":{supplierName:'Test Supplier 3', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier3@test.com'},
        "4":{supplierName:'TestSupplier 4', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier4@test.com'}
      }
    }
    else{
      var supplierList = {
        "1":{supplierName:'Test Supplier 1', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier1@test.com'},
        "2":{supplierName:'TestSupplier 2', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier2@test.com'},
        "3":{supplierName:'Test Supplier 3', address:'123th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier3@test.com'},
        "4":{supplierName:'TestSupplier 4', address:'222th Avenue', city:'MTL', phone:'5145555555',email:'testSupplier4@test.com'}
      }
    }
    this.props.actions.dispalySupplierList(supplierList)
  }

  render(){
    var supplierArray = []
    var addNewSupplierButton = null
    const {supplierList, garage} = this.props
    if(this.props.params.garageId>0){
      addNewSupplierButton = <button><Link to={`/garages/${this.props.params.garageId}/addSupplier`}>Add New Supplier</Link></button>
    }
    for(var key in supplierList){
      supplierArray.push(
        <SupplierItem
          supplierId={key}
          supplier={supplierList[key]}
          />
      )
    }
    return(
      <div>
        <ul>{supplierArray}</ul>
        <div>{addNewSupplierButton}</div>
      </div>
    )
  }
}
export default SupplierList
