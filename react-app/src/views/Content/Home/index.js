import React, { Componen, useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";

import { setDemoData } from "../../../redux/actions/demo";

const renderData = data => {
  return (
    data &&
    data.map(item => {
      return (
        <div key={item.id} style={{ margin: 10 }}>
          {item.name}
        </div>
      );
    })
  );
};

const Counter = initCount => {
  const [count, setCount] = useState(initCount);
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(initCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Add++
      </button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        minus--
      </button>
    </>
  );
};

const Home = props => {
  const data = props.demoData;
  useEffect(() => {
    console.log("componentDidMount or Update");
    return () => {
      // 这里类似于unmount但是又不一样，这里每次re-render都会执行
      console.log("unmount");
    };
  }, []);
  return (
    <>
      <div>
        <div>Hooks</div>
        {Counter(2)}
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => props.setDemoData()}>Fetch Data</button>
        {renderData(data)}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  demoData: state.demo.demoData
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setDemoData
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
