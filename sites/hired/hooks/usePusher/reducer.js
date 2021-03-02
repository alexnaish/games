export const actions = {
  connect: 'pusher/connect',
  join: 'pusher/join',
  leave: 'pusher/leave'
};

export const defaultState = {
  members: {},
  me: {},
  count: 0
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.connect:
      return { ...state, ...payload };
    case actions.join: {
      const { id, info } = payload;
      return {
        ...state,
        count: state.count + 1,
        members: {
          ...state.members,
          [id]: info
        }
      };
    }
    case actions.leave: {
      const { id, info } = payload;
      const members = { ...state.members };
      delete members[id];
      return {
        ...state,
        count: state.count - 1,
        members
      };
    }
  }
};
