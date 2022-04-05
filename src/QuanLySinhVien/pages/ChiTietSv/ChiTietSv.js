import React, { Component } from "react";
import { connect } from "react-redux";
import {
  bat_loading_action,
  tat_loading_action,
} from "../../redux/action/loadingAction";
import { sinhVienServices } from "../../svServices/svServices";

export class ChiTietSv extends Component {
  state = {
    thongTinChiTiet: {},
  };
  componentDidMount() {
    this.props.batLoading();
    sinhVienServices
      .layChiTietSinhVien(this.props.match.params.id)
      .then((res) => {
        this.props.tatLoading();
        this.setState({
          thongTinChiTiet: res.data,
        });
      })
      .catch((err) => {
        this.props.tatLoading();
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container detail">
        <p className="p">
          Tên:
          <span style={{ color: "#88b04b" }}>
            {this.state.thongTinChiTiet?.name}
          </span>
        </p>
        <p className="p">
          Email:
          <span style={{ color: "#88b04b" }}>
            {this.state.thongTinChiTiet?.email}
          </span>
        </p>
        <p className="p">
          Phone:
          <span style={{ color: "#88b04b" }}>
            {this.state.thongTinChiTiet?.phone}
          </span>
        </p>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    batLoading: () => {
      dispatch(bat_loading_action());
    },
    tatLoading: () => {
      dispatch(tat_loading_action());
    },
  };
};

export default connect(null, mapDispatchToProps)(ChiTietSv);
