import React, { useState } from "react";
import { Select, MenuItem, InputLabel, Box } from "@material-ui/core";

import "./App.css";
import PianoComponent from "./PianoComponent";
import { INSTRUMENTS } from "./consts";
import { IMAGES } from "./Images/images";

const App = () => {
  const [instrument, setInstrument] = useState(INSTRUMENTS[0]);
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  return (
    <Box
      className="App"
      css={{
        background: `url("${IMAGES[instrument]}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <header className="App-header">
        <h2
          style={{
            color: "pink",
            fontSize: "4.5rem",
            fontWeight: "100",
          }}
        >
          SoundFonts
        </h2>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        ></Box>
        <div style={{ margin: "0 auto" }}>
          <PianoComponent instrument={instrument} context={audioContext} />
        </div>
        <Select
          value={instrument}
          onChange={(event) => setInstrument(event.target.value)}
          variant="outlined"
          style={{ color: "pink", marginTop: "2rem" }}
        >
          {INSTRUMENTS.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </header>
    </Box>
  );
};

export default App;
