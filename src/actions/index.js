import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import delay from 'lodash/delay';

// action types

export const SET_USERS = 'SET_USERS';
export const USERS_LOADING = 'USERS_LOADING';
export const USERS_LOADED = 'USERS_LOADED';
export const USERS_ERROR = 'USERS_ERROR';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const ADD_GALLERY_IMAGES = 'ADD_GALLERY_IMAGES';

export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';

// action creators

const setUsers = createAction(SET_USERS);
const setUsersLoading = createAction(USERS_LOADING);
const setUsersLoaded = createAction(USERS_LOADED);
const setUsersError = createAction(USERS_ERROR);
export const updateUserData = createAction(UPDATE_USER_DATA);
export const addGalleryImages = createAction(ADD_GALLERY_IMAGES);

export const changeLayout = createAction(CHANGE_LAYOUT);

/**
 * Loads users from server and dispatches action with them
 *
 * @returns {void}
 */
export function loadUsers() {
  return (dispatch) => {
    dispatch(setUsersLoading());

    delay(() => { // delay for testing purposes
      fetch('/getUsers')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject();
        })
        .then((users = []) => {
          console.log('USERS', users);
          dispatch(setUsers({ users }));
          dispatch(setUsersLoaded());
        })
        .catch(() => {
          dispatch(setUsersError());
        });
    }, 1000);
  };
}

export function openLink(path) {
  return push(path);
}

export function selectUser(id) {
  return openLink(`/user/${id}`);
}

export function openUserInfo(id) {
  return openLink(`/user/${id}/info`);
}

export function openUserGallery(id) {
  return openLink(`/user/${id}/gallery`);
}
