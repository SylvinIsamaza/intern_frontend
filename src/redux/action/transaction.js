import axios from "axios";

import {
  loadTransactionFailure,
  loadTransactionStart,
  loadTransactionSuccess,
  updateTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
} from "../reducer/transaction";

import { server } from "../../components/server";

export const loadTransaction = () => async (dispatch) => {
  try {
    dispatch(loadTransactionStart());
    console.log('Fetching started')
    const data = await axios
      .get(`${server}/api/v1/transaction/get-transactions`, { withCredentials: true })
      .then((data) => {
        console.log(data.data)
        dispatch(loadTransactionSuccess(data.data));
      })
      .catch((err) => {
        dispatch(loadTransactionFailure(err.message));
      });
  } catch (err) {
    dispatch(loadTransactionFailure(err.message));
  }
};

export const createTransaction = (data) => async (dispatch) => {
  try {
    dispatch(loadTransactionStart());
    const data = await axios
      .post(`${server}/api/v1/transaction/create-transaction`,data, { withCredentials: true })
      .then((data) => {
        dispatch(loadTransactionSuccess(data.data.transaction));
      })
      .catch((err) => {
        dispatch(loadTransactionFailure(err.message));
      });
  } catch (err) {
    dispatch(loadTransactionFailure(err.message));
  }
};

export const updateTransaction = () => async (dispatch) => {
  try {
    dispatch(updateTransactionStart());
    const data = await axios
      .get(`${server}/api/v1/transaction/get-transactions`, { withCredentials: true })
      .then((data) => {
        dispatch(updateTransactionSuccess(data.data.transaction));
      })
      .catch((err) => {
        dispatch(updateTransactionFailure(err.message));
      });
  } catch (err) {
    dispatch(loadTransactionFailure(err.message));
  }
};


