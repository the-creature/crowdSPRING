import { handleActions } from 'redux-actions';
import {
  SET_USERS,
  USERS_LOADING,
  USERS_LOADED,
  USERS_ERROR,
  UPDATE_USER_DATA,
  ADD_GALLERY_IMAGES
} from './../../actions';

import guid from 'utils/guid';

export default handleActions({
  [SET_USERS]: (state, action) => ({
    ...state,
    users: action.payload.users
  }),
  [USERS_LOADING]: (state, action) => ({
    ...state,
    loading: true
  }),
  [USERS_LOADED]: (state, action) => ({
    ...state,
    loading: false
  }),
  [USERS_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),
  [UPDATE_USER_DATA]: (state, action) => {
    const userData = action.payload;
    const newUsers = state.users.slice();
    const userIndex = newUsers.findIndex(user => user.id === userData.id);

    if (userIndex === -1) {
      return state;
    }

    newUsers.splice(userIndex, 1, { ...newUsers[userIndex], ...userData });

    return {
      ...state,
      users: newUsers
    };
  },
  [ADD_GALLERY_IMAGES]: (state, action) => {
    const { userId, urls } = action.payload;
    const newUsers = state.users.slice();
    const userIndex = newUsers.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return state;
    }

    const userImages = newUsers[userIndex].images;

    newUsers.splice(userIndex, 1, {
      ...newUsers[userIndex],
      images: [
        ...userImages,
        ...urls.map(url => ({ id: guid(), url }))
      ]
    });

    return {
      ...state,
      users: newUsers
    };
  }
}, { users: [], loading: true, error: false });
