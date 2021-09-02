import React, { Component } from "react";
import Node from "./Node";
import "./pathfinding.css";
import { dijkstra, getNodeInShortestPathOrder } from "../algorithmns/dijkstra";

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 1;
var FINISH_NODE_COL = 49;


class Pathfinding extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            grid:[],
            mouseIsPressed:false,
        };
    }
    componentDidMount()
    {
        const grid = getInitialGrid();
        this.setState({
            grid: grid,
        })
    }

    visualizeDijkstara(){
        const grid = this.state.grid;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodeInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    {
        for(let i=0;i<=visitedNodesInOrder.length;i++)
        {
            if(i === visitedNodesInOrder.length)
            {
                setTimeout(()=>{
                    this.animateShortestPath(nodesInShortestPathOrder)
                },10*i);
                return;
            }
            setTimeout(()=>{
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            },10*i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder)
    {
        for(let i=0;i<nodesInShortestPathOrder.length;i++)
        {
            setTimeout(()=>{
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            },50*i);
        }
        alert("The Total length is " + nodesInShortestPathOrder.length);
    }

    handleMouseDown(row,col)
    {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
      }
    
    handleMouseUp() {
    this.setState({mouseIsPressed: false});
    }

    change1 = (e) => {
        var START_NODE_ROW = e.target.value;
        console.log(START_NODE_ROW);
    }

    change2 = (e) => {
        var START_NODE_COL = e.target.value;
        console.log(START_NODE_COL);
        const grid = getInitialGrid();
        this.setState({
            grid:grid,
        })
    }

    change3 = (e) => {
        
    }

    change4 = (e) => {
        
    }

    tr = () => {
        const grid = this.state.grid;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodeInShortestPathOrder(finishNode);
        for(let i=0;i<nodesInShortestPathOrder.length;i++)
        {
            setTimeout(()=>{
                const node = nodesInShortestPathOrder[i];
                if(node.row !== START_NODE_ROW && node.col !==START_NODE_COL)
                {
                   document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path-white'; 
                }
                
            },50*i);
        }

        for(let i=0;i<visitedNodesInOrder.length;i++)
        {
            setTimeout(()=>{
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-white';
            },10*i);
        }
        
    }

    render()
    {
        const {grid, mouseIsPressed} = this.state;
        return ( 
            <div className="path-finder">
                <div className="start_button">
                    <button onClick={this.tr}>Clear board</button>    
                </div>
                <div className="start_block">
                    
                </div>
                <div className="final_block">
                    
                </div>
                <div className="start_text">
                    <h4>START NODE</h4>
                </div>
                <div className="final_text">
                    <h4>FINAL NODE</h4>
                </div>
                <div className="new-div">
                    <label className="label">Row of the starting Node</label>
                    <input type="number" className="number-style" onChange={this.change1}></input>
                </div>
                <div className="new-div1">
                    <label className="label1">Column of the starting Node</label>
                    <input type="number" className="number-style" onChange={this.change2}></input>
                </div>
                <div className="new-div2">
                    <label className="label">Row of the Last Node</label>
                    <input type="number" className="number-style" onChange={this.change3}></input>
                </div>
                <div className="new-div3">
                    <label className="label1">Column of the Last Node</label>
                    <input type="number" className="number-style" onChange={this.change4}></input>
                </div>
                <div className="center">
                    <button className="button" onClick={()=>this.visualizeDijkstara()}>
                        Visualize Dijkstra's Algorithm
                    </button>
                </div>
                <div className="grid">
                    {grid.map((row,rowIdx)=>{
                        return <div key={rowIdx}>
                            {row.map((node,nodeIdx) => { 
                                const {row,col,isWall,isStart,isFinish} = node;
                                return (
                                <Node key={nodeIdx}
                                    isStart = {isStart}
                                    isFinish = {isFinish}
                                    col={col}
                                    isWall={isWall}
                                    row = {row}
                                    mouseIsPressed = {mouseIsPressed}
                                    onMouseDown = {(row,col) => this.handleMouseDown(row,col)}
                                    onMouseEnter = {(row,col)=>this.handleMouseEnter(row,col)}
                                    onMouseUp = {() => this.handleMouseUp()}
                                />

                                );
                            })}
                            </div>
                    })}
                </div>
            </div>
        )
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row=0;row<20;row++)
    {
        const currentRow = [];
        for (let col=0;col<50;col++)
        {
            currentRow.push(createNode(col,row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col,row) => {

    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  

export default Pathfinding;