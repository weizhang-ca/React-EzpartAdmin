import React, {Component} from 'react'
import SupplierItem from './SupplierItem'
import {Link} from 'react-router'
class SupplierList extends Component{

  componentDidMount(){
    this.props.actions.fetchSupplierList()
  }

  render(){
    var supplierArray = []
    var addNewSupplierButton = null
    const {supplierList, garage, isUpdatingSupplier, isFetchingSupplierList,
            isFailedFetchSupplierList} = this.props.storeState.supplier
    const{actions} = this.props
    //if(this.props.params.garageId>0){
    //  addNewSupplierButton = <button><Link to={`/garages/${this.props.params.garageId}/addSupplier`}>Add New Supplier</Link></button>
    //}
    if(isFetchingSupplierList){
      return <div>Fetching Suppliers....</div>
    }
    else{
      if(isFailedFetchSupplierList===true){
        return(<div>Faield to get supplier list. Please try a again later</div>)
      }

    for(var key in supplierList){
      supplierArray.push(
        <SupplierItem
          supplierId={key}
          supplier={supplierList[key]}
          isUpdatingSupplier={isUpdatingSupplier}
          {...actions}
          />
      )
    }
    return(
      <table className="table table-bordered table-hover table-condensed table-responsive">
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>City</th>
          <th>Region</th>
          <th>Country</th>
          <th>Master</th>
          <th></th>
        </tr>
        {supplierArray}
      </table>
    )
    }
  }
}
export default SupplierList
