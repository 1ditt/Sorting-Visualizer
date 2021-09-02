import React, { Component } from "react";
import "./Node.css";

class Node extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            nodes:[],
        };
    }
    

    render()
    {
        const {isFinish,isStart} = this.props;
        const {row,col,isWall} = this.props;
        const{onMouseDown,onMouseEnter,onMouseUp} = this.props;
        const extraClassName = isFinish?'node-finish':isStart?'node-start':isWall?'node-wall':'';
        return (
            <div className={`node  ${extraClassName}`} id={`node-${row}-${col}`} onMouseDown={() => onMouseDown(row, col)} onMouseEnter={() => onMouseEnter(row, col)}  onMouseUp={() => onMouseUp()}>
            
            </div>
        )
    }
}

export default Node;