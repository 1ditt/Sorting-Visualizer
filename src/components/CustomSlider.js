import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";



const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 1
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    marginLeft:"190%",
    marginRight:"auto",
    textAlign:"center",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 10
  }
})(Slider);

function CustomSlider({ label, value, setValue }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h4 style={{marginLeft:"216%",width:"100%"}}>ADJUST THE SPEED</h4>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        min = {300}
        max = {3000}
        step = {100}
        defaultValue={300}
        value={value}
        onChange={(event, v) => {
          setValue(v);
        }}
      />
    </div>
  );
}

export default CustomSlider;
