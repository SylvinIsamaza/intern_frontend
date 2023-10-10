import axios from "axios";

import {
  loadUserFailure,
  loadUserStart,
  loadUserSuccess,
  
} from "../reducer/reducer";

import { server } from "../../components/server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserStart());
    const data = await axios
      .get(`${server}/api/v1/user/get-user`, { withCredentials: true })
      .then((data) => {
        dispatch(loadUserSuccess(data.data.user));
      })
      .catch((err) => {
        dispatch(loadUserFailure(err.message));
      });
  } catch (err) {
    dispatch(loadUserFailure(err.message));
  }
};
