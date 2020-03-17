import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';

import history from '~/services/history';
import api from '~/services/api';
import { signInSuccess, signFailure, tokenInvalid } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/deliveries');
  } catch (err) {
    toast.error(
      (err.response && err.response.data.error) || 'Error connecting to server'
    );
    yield put(signFailure());
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
      yield put(tokenInvalid());
    }
  }
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
