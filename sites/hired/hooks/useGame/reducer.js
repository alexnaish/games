export const actions = {
  start: 'game/start'
};

export const defaultState = {
  started: false,
  traits: {}
};

export const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.start:
      return { ...state, started: true, ...payload };
  }
};
