
import "./App.css"
import React, { Component } from "react";
import Bar from "./components/Bar"


class App extends Component
{
  state = {
    array: [],
    arrayStep: [],
    colorKey: [],
    colorsSteps: [],
    currentStep:0,
    count:10,
    delay:100,
    algorithm:"",
    timeouts: [],
  };

  componentDidMount(){
    this.generateRandomArray();
  }

  generateRandomNumber=(min,max)=> {
    return Math.floor(Math.random()*(max-min)+min)
  }

  generateRandomArray=()=> {
    const count = this.state.count;
    const temp = [];
    for(let i=0;i<count;i++)
    {
      temp.push(this.generateRandomNumber(50,200));
    }
    // console.log(temp);
    this.setState({
      array:temp,
      arraySteps:[temp],
      currentStep:0,
    });
  }

  changeArray = (index,value) =>
  {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array:arr,
      arraySteps:[arr],
      currentStep:0,
    });
  }

  render()
  {
    let bars = this.state.array.map((value,index)=>{
      return (
      <Bar 
        key = {index}
        index = {index}
        length = {value}
        color = {0}
        changeArray = {this.changeArray}
      />);
    });
    
    
    return (
  
        <div className='app'>
          <div className="frame">
            <div className="barsDiv container card">{bars}</div>
          </div>
          <div className="control-panel"></div>
          <div className="panel"></div>
        </div>
    );
  }
}

export default App;