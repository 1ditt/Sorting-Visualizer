import "./Bar.css"
import React from "react";
function Bar({index,length,color})
{
    const [len,setLen] = React.useState();

    const colors = [['rgba(61,90,241,0.5)','rgba(61,90,241,0.2)'],
                    ['rgba(255,48,79,1)','rgba(255,48,79,0.5)'],
                    ['rgba(131,252,90,0.5)','rgba(131,251,90,0.2)']]
    const front_bottom={
        transform:`translateY(${200-length}px) rotateX(-90deg)`,
        backgroundColor:`${colors[color][0]}`,
        boxShadow:`5px 5px 50px 5px ${colors[color][1]}`,
        transistion:'0.3s'
    }

    const right_left={
        height:`${length}px`,
        transform:`translateY(${200-length}px)`,
        backgroundColor:`${colors[color][0]}`,
        boxShadow:`5px 5px 50px 5px ${colors[color][1]}`,
        transistion:'0.3s'
    }

    const inputStyle = {
        position:'relative',
        top:Math.floor(length/2)-10,
        width:length,
        left:Math.floor(length/2)+10,
        border:'none',
    }
   
    const handleChange = (e) => {
        let val = e.target.value;
        if(val === "")
        {
            setLen(0)
        }
        else{
            val = parseInt(val)
            if(val > 200)
            {
                setLen(200);
            }
        }
    }
    
    return( <div className="bar" style={{height:length}}>
        <div className="side top" ></div>
        <div className="side bottom" style={front_bottom}></div>
        <div className="side right">
            <div className="color-bar right-color-bar" style={right_left}></div>
        </div>
        <div className="side left" style={right_left}>
            <div className="color-bar left-color-bar" style={right_left}>

            </div>
        </div>
        <div className="side front" style={front_bottom}>
            <input type="number" length={length} value={len} style={inputStyle} onChange={handleChange}></input>
        </div>
    </div>  );
}

export default Bar;