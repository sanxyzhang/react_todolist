import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      date:new Date(),
      toggle:true
    };
    this.handleClick=this.handleClick.bind(this);
  }
  componentDidMount(){
    this.timeID=setInterval(()=>this.tick(),1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerID);  
  }
  tick(){
    this.setState({date:new Date()});
  }
  handleClick(){
    var otoggle=!this.toggle;
    this.setState(
        prevState => ({
        toggle:!prevState.toggle
      })
    )
  }
  render() {
    return (
      <div className="App">
        <h1>hello </h1>
        <h2>this is{this.state.date.toLocaleTimeString()}</h2>
        <button onClick={this.handleClick}>{this.state.toggle?"off":"on"}</button>
      </div>
    );
  }
}

export default App;
