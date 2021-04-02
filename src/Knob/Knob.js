import React from 'react';
import { Knob as Knb, Arc, Pointer, Value } from 'rc-knob'

import './Knob.scss';

const Knob = ({ min, max, value, onChange }) => {
    return (<Knb 
        size={100}  
        angleOffset={220} 
        angleRange={280}
        min={min}
        max={max}
        value={value}
        steps={0.01}
        className="styledKnob"
        onChange={value => onChange(value)}
      >
        <Arc 
          arcWidth={1.5}
        />
        <circle r="40" cx="50" cy="50" />
        <Pointer 
          width={2}
          height={35}
          radius={10}
          type="rect"
          color="#fff"
        />
      </Knb>);
}

Knob.defaultProps = {
  min: 0,
  max: 1,

}

export default Knob;
