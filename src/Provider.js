import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Soundfont } from "soundfont-player";
import { FORMAT, SOUNDFONT } from "./consts";

const Provider = (props) => {
  const [
    instrumentName,
    hostname,
    format,
    gain,
    soundfont,
    audioContext,
    children,
  ] = props;
  const [activeAudioNodes, setActiveAudioNodes] = useState({});
  const [instrument, setInstrument] = useState(null);

  const loadInstrument = (instrumentName) => {
    setInstrument(null);
    Soundfont.instrument(audioContext, instrumentName, {
      format: format,
      soundfont: soundfont,
      gain: gain,
      nameToUrl: (name, soundfont, format) => {
        return `${hostname}/${soundfont}/${name}-${format}.js`;
      },
    }).then((newInstrument) => {
      setInstrument(newInstrument);
    });
  };

  useEffect(() => {
    loadInstrument(instrumentName);
  });

  const playNote = (midiNumber) => {
    console.log(midiNumber);
    audioContext.resume().then(() => {
      const audioNode = instrument.play(midiNumber);
      setActiveAudioNodes(
        Object.assign({}, activeAudioNodes, { [midiNumber]: audioNode })
      );
    });
  };

  const stopNote = (midiNumber) => {
    audioContext.resume().then(() => {
      if (!activeAudioNodes[midiNumber]) {
        return;
      }
      const audioNode = activeAudioNodes[midiNumber];
      audioNode.stop();
      setActiveAudioNodes(
        Object.assign({}, activeAudioNodes, { [midiNumber]: null })
      );
    });
  };

  const stopAllNotes = () => {
    audioContext.resume().then(() => {
      const activeNodes = Object.values(activeAudioNodes);
      activeNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      setActiveAudioNodes(activeAudioNodes);
    });
  };

  return (
    <Provider>
      {React.cloneElement(children, {
        ...props,
        isLoading: !instrument,
        playNote,
        stopNote,
        stopAllNotes,
        loadInstrument,
      })}
    </Provider>
  );
};

Provider.defaultProps = {
  instrumentName: PropTypes.string.isRequired,
  hostname: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.values(FORMAT)),
  gain: PropTypes.number,
  soundfont: PropTypes.oneOf(Object.values(SOUNDFONT)),
  audioContext: PropTypes.instanceOf(window.AudioContext),
  render: PropTypes.func,
};

export default Provider;
