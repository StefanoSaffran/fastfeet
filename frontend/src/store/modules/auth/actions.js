export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, admin) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, admin },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function tokenInvalid() {
  return {
    type: '@auth/TOKEN_INVALID',
  };
}
