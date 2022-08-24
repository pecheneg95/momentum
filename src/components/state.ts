type SettingsState = {
  language: string;
  photoSource: {
    source: string;
    tags: string;
  };
  blocks: { block: string; visible: boolean }[];
};

const state: SettingsState = getStateFromLocalStorage() || {
  language: "en",
  photoSource: { source: "github", tags: "" },
  blocks: [
    { block: "time", visible: true },
    { block: "date", visible: true },
    { block: "greeting", visible: true },
    { block: "quote", visible: true },
    { block: "weather", visible: true },
    { block: "audio", visible: true },
  ],
};

function getStateFromLocalStorage() {
  if (localStorage.getItem("state")) {
    return JSON.parse(localStorage.getItem("state") as string);
  }
}

function setState(newState: SettingsState) {
  state.language = newState.language;
  state.photoSource.source = newState.photoSource.source;
  state.photoSource.tags = newState.photoSource.tags;
  state.blocks.forEach((el, i) => {
    el.block = newState.blocks[i].block;
    el.visible = newState.blocks[i].visible;
  });
  setStateToLocalStorage(state);
}

function setStateToLocalStorage(state: SettingsState): void {
  localStorage.setItem("state", JSON.stringify(state));
}

export { state, setState, SettingsState };
