import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as EzpartActions from '../actions/ezpartActions';

class App extends Component{
  render(){
    const {garageList, actions} = this.props;
    console.log('App says 2: ');
    console.log(garageList);
    return(
      <div>
        <Header getGarageList={actions.getGarageList} />
        <MainSection garageList={garageList} actions={actions}/>
      </div>
    );
  }
}

App.propTypes = {
  garageList: PropTypes.object.isRequired
}

function mapStateToProps(state){
      console.log('App says 1: ');
      console.log(state.garage.garageList);
  return{
    garageList: state.garage.garageList
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
