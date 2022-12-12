export const addField = (setter, state) => {
  if (state.length < 4) {
    setter([...state, ""]);
  }
};

export const subField = (setter, state) => {
  if (state.length > 0) {
    const copy = state.slice(0, -1);
    setter(copy);
  }
};
