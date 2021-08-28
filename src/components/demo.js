import React, { useEffect } from "react";
import CustomSlider from "./CustomSlider";

function CustomizedSlider({change_delay}) {
  const [value, setValue] = React.useState(300);

  useEffect(() => {
    change_delay(value);
  }, [value]);
  
  return <CustomSlider label="Slider" value={value} setValue={setValue} />;
  
}

export default CustomizedSlider;
