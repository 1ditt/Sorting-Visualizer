import "./Bar.css"
import React from "react";
function Bar({index,length,color,changeArray})
{
    const [len,setLen] = React.useState(length);


    const colors = [['rgba(61,90,241,0.5)','rgba(61,90,241,0.2)'],
                    ['rgba(255,48,79,1)','rgba(255,48,79,0.5)'],
                    ['rgba(131,252,90,0.5)','rgba(131,251,90,0.2)']]
    const bottom={
        transform:`translateY(${200-length}px) rotateX(-90deg)`,
        backgroundColor:`${colors[color][0]}`,
        boxShadow:`5px 5px 50px 5px ${colors[color][1]}`,
        transistion:'0.3s',
    }

  
    const front_back_right_left={
        height:`${length}px`,
        transform:`translateY(${200-length}px)`,
        backgroundColor:`${colors[color][0]}`,
        boxShadow:`5px 5px 50px 5px ${colors[color][1]}`,
        transistion:'0.3s',
    }

    const inputStyle = {
        top:Math.floor(length/2)-12,
        width:length,
        left:-Math.floor(length/2)+13,
        border:'none',
        background:'none',
        position:'relative',
    }

    const quantity = {
        position:'relative',
        top:'220px',
    }
   
    const handleChange = (e) => {
        let val = e.target.value;
        if(val === "")
        {
            setLen(0);
            changeArray(index,0);
        }
        else{
            val = parseInt(val);
            if(val > 200)
            {
                setLen(200);
                changeArray(index,200);
            }
            else{
                setLen(val);
                changeArray(index,val);
            }
        }
    }

    const increment = (e) =>{
        if(len !== 200)
        {
            setLen(len+1);
            changeArray(index,len+1);
        }
        
    }

    const decrement = (e) =>{
        if(len!==0){
            setLen(len-1);
            changeArray(index,len-1);
        }
    }
    
    return( <div className="bar">
        <div className="side top" ></div>
        <div className="side bottom" style={bottom}></div>
        <div className="side right">
            <div className="color-bar right-color-bar" style={front_back_right_left}></div>
        </div>
        <div className="side left">
            <div className="color-bar left-color-bar" style={front_back_right_left}></div>
        </div>
        <div className="side front">
            <div className="color-bar front-color-bar" style={front_back_right_left}>
                <input type="number" className="input" length={length} value={length} style={inputStyle} onChange={handleChange}></input>
            </div>
                
        </div>
        <div className="side back">
           <div className="color-bar side-color-bar" ></div>
        </div>
        <div className="quantity-nav">
            <div className="quantity-button quantity-up" style={quantity} onClick={increment}>
                +
            </div>
            <div className="quantity-button quantity-down" style={quantity} onClick={decrement}>
                -
            </div>
        </div>
    </div>  );
}

export default Bar;