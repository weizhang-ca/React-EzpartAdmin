import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as EzpartActions from '../actions/ezpartActions';

class App extends Component{
  render(){
    //console.log('App says 2: ');
    //console.log(this.props)
    const {garageList, actions, supplierList, orderList, orderParts} = this.props;
    var children = null
    if(this.props.children !== null){
      children = cloneElement(
        this.props.children,
        {
          garageList: garageList,
          actions: actions,
          supplierList: supplierList,
          orderList: orderList,
          orderParts: orderParts
        }
      )
    }
    return(
      <div>
        <Header displayGarageList={actions.displayGarageList||{}} />
        {
          children
        }
      </div>
    );
  }
}

App.propTypes = {
  garageList: PropTypes.object.isRequired
}

function mapStateToProps(state){
      //console.log('App says 1: ');
      //console.log(state)
      //console.log(state.garage.garageList);
      //console.log(state.supplier.supplierList)
  return{
    garageList: state.garage.garageList,
    supplierList: state.supplier.supplierList,
    orderList: state.order.orderList,
    orderParts: state.order.orderParts
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(EzpartActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
