import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";

export class LoadingComponent extends Component {
  render() {
    return this.props.isLoading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          background: "black",
          zIndex: 1000,
        }}
      >
        <ReactLoading type={"spin"} color={"#ccc"} height={75} width={75} />
      </div>
    ) : (
      <></>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
  };
};

export default connect(mapStateToProps)(LoadingComponent);
