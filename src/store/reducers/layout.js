import { handleActions } from 'redux-actions';
import {
  CHANGE_LAYOUT
} from 'actions';

import { DESKTOP } from 'constants';

export default handleActions({
  [CHANGE_LAYOUT]: (state, action) => ({
    ...state,
    type: action.payload
  })
}, { type: DESKTOP });
