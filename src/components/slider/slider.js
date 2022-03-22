import * as React from 'react';
import GameFetch from '../ByVertical/game/game_tokens'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Box sx={{ width: 300 }}>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
        />
        </Box>

        <GameFetch valuex = {value} />
    </div>
  );
}

//        <GameFetch valuex = {value} />


export default RangeSlider