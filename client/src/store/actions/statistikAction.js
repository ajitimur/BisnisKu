import { FETCH_REPORTS_WEEKLY, FETCH_REPORTS_MONTHLY } from "../keys";
import API from "../../apis/API";

export function setReportsWeekly(payload) {
  return {
    type: FETCH_REPORTS_WEEKLY,
    payload: payload,
  };
}

export function setReportsMonthly(payload) {
  return {
    type: FETCH_REPORTS_MONTHLY,
    payload: payload,
  };
}

export function fetchReportsWeeklyAsync(token) {
  return async function (dispatch) {
    try {
      const financialReports = await API({
        method: "GET",
        url: "/reports/labarugi",
        headers: {
          access_token: token,
        },
      });

      dispatch(setReportsWeekly(financialReports.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchReportsMonthlyAsync(token) {
  return async function (dispatch) {
    try {
      const financialReports = await API({
        method: "GET",
        url: "/reports/labarugiBulanan",
        headers: {
          access_token: token,
        },
      });

      dispatch(setReportsMonthly(financialReports.data));
    } catch (error) {
      console.log(error);
    }
  };
}
