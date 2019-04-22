import axios from "axios";

export const SET_DEMO_DATA = "SET_DEMO_DATA";

// 异步获取数据
export const setDemoData = () => async (dispatch, getState) => {
  await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      dispatch({ type: SET_DEMO_DATA, payload: response.data });
    });
};
