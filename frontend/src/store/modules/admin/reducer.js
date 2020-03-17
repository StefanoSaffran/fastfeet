import produce from 'immer';

const initial_state = {
  profile: null,
};

export default function user(state = initial_state, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.profile = action.payload.admin;
      });
    default:
      return state;
  }
}
