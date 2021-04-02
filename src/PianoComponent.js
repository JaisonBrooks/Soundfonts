import React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { CircularProgress } from "@material-ui/core";
import "react-piano/dist/styles.css";

import SoundfontProvider from "./SoundfontProvider";
import { INSTRUMENTS } from "./consts";

const PianoComponent = ({ instrument, context }) => {
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f4");
  const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";
  const noteRange = {
    first: firstNote,
    last: lastNote,
  };
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  return (
    <SoundfontProvider
      instrumentName={instrument}
      audioContext={context}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => {
        return isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Piano
            noteRange={noteRange}
            width={1000}
            playNote={playNote}
            stopNote={stopNote}
            disabled={isLoading}
            keyboardShortcuts={keyboardShortcuts}
          />
        );
      }}
    />
  );
};

PianoComponent.defaultProp = {
  instrument: INSTRUMENTS[0],
};

export default PianoComponent;
