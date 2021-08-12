
import "./App.css"
import React, { Component } from "react";
import Bar from "./components/Bar"
import {BsFillPlayFill} from "react-icons/bs";
import {BsSkipForwardFill} from "react-icons/bs";
import {BsSkipBackwardFill} from "react-icons/bs";
import {BsPause} from "react-icons/bs";
import BubbleSort from "./algorithmns/BS";

class App extends Component
{
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorsSteps: [],
    currentStep:0,
    count:10,
    delay:100,
    algorithm:"Bubble sort",
    timeouts: [],
  };

  ALGORITHMS = {
    'Bubble sort':BubbleSort,
  }

  componentDidMount(){
    this.generateRandomArray();
  }

  generateSteps = () => {
    var array = this.state.array.slice();
    var steps = this.state.arraySteps.slice();
    var colorsSteps = this.state.colorsSteps.slice();

    this.ALGORITHMS[this.state.algorithm](array,0,steps,colorsSteps);
    this.setState({
      arraySteps:steps,
      colorsSteps:colorsSteps,
    })
  }

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey : blankKey,
      colorsSteps:[blankKey]
    })
  }

  generateRandomNumber=(min,max)=> {
    return Math.floor(Math.random()*(max-min)+min)
  }

  generateRandomArray=()=> {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    for(let i=0;i<count;i++)
    {
      temp.push(this.generateRandomNumber(50,200));
    }
    // console.log(temp);
    // temp.sort((a, b) => {
    //   if (a < b) {
    //     return -1;
    //   }
    //   if (a > b) {
    //     return 1;
    //   }
    //   return 0;
    // });
    this.setState({
      array:temp,
      arraySteps:[temp],
      currentStep:0,
    },() => {this.generateSteps()});
  }

  changeArray = (index,value) =>
  {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array:arr,
      arraySteps:[arr],
      currentStep:0,
    },()=>{this.generateSteps();});
  }

  previousState = () => {
    let currentStep = this.state.currentStep;
    if(currentStep === 0)
    {
      return;
    }
    else{
      currentStep -= 1
      this.setState({
        currentStep:currentStep,
        array:this.state.arraySteps[currentStep],
        colorKey:this.state.colorsSteps[currentStep],
      })
    }
  };

  nextState = () => {
    let currentStep = this.state.currentStep;
    if(currentStep >= this.state.arraySteps.length-1)
    {
      return;
    }
    else{
      currentStep += 1
      this.setState({
        currentStep:currentStep,
        array:this.state.arraySteps[currentStep],
        colorKey:this.state.colorsSteps[currentStep],
      })
    }
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout)=>clearTimeout(timeout));
    this.setState({
      timeouts: [],
    })
  }

  start = () => {
    let steps = this.state.arraySteps;
    let colorsSteps = this.state.colorsSteps;
    this.clearTimeouts();
    let timeouts = [];
    let i =0;
    while(i < steps.length)
    {
      let timeout = setTimeout(()=>{
        let currentStep = this.state.currentStep;
        this.setState({
          array:steps[currentStep],
          colorKey:colorsSteps[currentStep],
          currentStep:currentStep+1,
        });
        timeouts.push(timeout);
      },this.state.delay*i);
      i++;
    }
    this.setState({
      timeouts:timeouts,
    });
  };

  render()
  {
    let bars = this.state.array.map((value,index)=>{
      return (
      <Bar 
        key = {index}
        index = {index}
        length = {value}
        color = {this.state.colorKey[index]}
        changeArray = {this.changeArray}
      />);
    });
    let playButton;
    if(this.state.arraySteps.length === this.state.currentStep)
    {
      playButton = (
        <button className="controller">
          <BsPause></BsPause>
        </button>
      )
    }else{
      playButton = (
        <button className = "controller" onClick={this.start}>
          <BsFillPlayFill></BsFillPlayFill>
        </button>
      )
    }
    
    return (
  
        <div className='app'>
          <div className="frame">
            <div className="barsDiv container card">{bars}</div>
          </div>
          <div className="control-panel">
            <div className="control-buttons">
              <button className = "controller" onClick={this.previousState}>
                <BsSkipBackwardFill></BsSkipBackwardFill>
              </button>
              {playButton}
              <button className = "controller" onClick={this.nextState}>
                <BsSkipForwardFill></BsSkipForwardFill>
              </button>
            </div>
          </div>
          <div className="panel"></div>
        </div>
    );
  }
}

export default App;