import { combineReducers } from 'redux';

import auth from './auth/reducer';
import admin from './admin/reducer';

export default combineReducers({ auth, admin });
