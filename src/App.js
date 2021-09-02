
import "./App.css"
import React, { Component } from "react";
import Bar from "./components/Bar"
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {BsSkipForwardFill} from "react-icons/bs";
import {BsSkipBackwardFill} from "react-icons/bs";
import BubbleSort from "./algorithmns/BS";
import {BsArrowClockwise} from "react-icons/bs";
import InsertionSort from "./algorithmns/IS";
import SelectionSort from "./algorithmns/SL";
import CustomizedSlider from "./components/demo.js";
import Pathfinding from "./Pathfinding_algo/pathfinding.js";

class App extends Component
{
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorsSteps: [],
    currentStep:0,
    count:20,
    delay:500,
    algorithm:"Bubble sort",
    timeouts: [],
    count_click:1,
    set_button:true,
  };

  
  ALGORITHMS = {
    'Bubble sort':BubbleSort,
    'Insertion sort':InsertionSort,
    'Selection sort':SelectionSort,
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
      count_click:1,
    },() => {this.generateSteps()});
  }

  changeArray = (index,value) =>
  {
    let arr = this.state.array;
    this.clearColorKey();
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
        count_click:1,
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
        count_click:1,
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
    
    this.setState({
      count_click:this.state.count_click + 1,
    })
    //this.state.count_click += 1;
    while((i < steps.length) && this.state.set_button)
    {
      let timeout = setTimeout(()=>{
        let currentStep = this.state.currentStep;
        this.setState({
          //count_click:this.state.count_click + 1,
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

  stop = () => {
    this.setState({
      count_click:this.state.count_click + 1,
      set_button:false,
    });
  }

  change_algo = (e) => {
    let value = e.target.name;
    document.getElementById("sorting_type").innerHTML = e.target.textContent;
    this.generateRandomArray();
    this.clearColorKey();
    this.setState({
      algorithm:value,
      currentStep:0,
      count_click:1,
    },() => {this.generateSteps();});
  }

  new_turn = () => {
    this.generateRandomArray();
  }

  change_delay = (value) => {
    this.setState({
      delay:value,
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
        color = {this.state.colorKey[index]}
        changeArray = {this.changeArray}
      />);
    });
    let playButton;
    if(this.state.arraySteps.length === this.state.currentStep)
    {
      playButton = (
        <button className="controller" onClick={this.new_turn}>
            <BsArrowClockwise></BsArrowClockwise>
        </button>
      );
    }else
    {
      if(this.state.count_click%2===0)
      {
        playButton = (
          <button className="controller" onClick={this.stop}>
            <BsPauseFill></BsPauseFill>
          </button>
        )
      }
      else
      {
        playButton = (
          <button className = "controller" onClick={this.start}>
            <BsFillPlayFill></BsFillPlayFill>
          </button>
        )
    }
  }
    
    return (
  
        <div className='app'>
          <nav className="navbar">
            <h1 class="text">Sorting Visualizer</h1>
            <button class="btn" type="submit" onClick={this.change_algo} name="Bubble sort">BUBBLE SORT</button>
            <button class="btn" type="submit" onClick={this.change_algo} name="Insertion sort">INSERTION SORT</button>
            <button class="btn" type="submit" onClick={this.change_algo} name="Selection sort">SELECTION SORT</button>
          </nav>
          <h1 className="heading" id="sorting_type">BUBBLE SORT</h1>
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
          <div className="panel"><CustomizedSlider
                                  change_delay = {this.change_delay}/>
          </div>
          <div><Pathfinding/></div>
        </div>
    );
  }
}

export default App;