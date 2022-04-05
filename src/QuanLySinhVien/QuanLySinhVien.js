import React, { Component } from "react";
import { connect } from "react-redux";
import DanhSachSinhVien from "./components/DanhSachSinhVien";
import ModalSinhVien from "./components/ModalSinhVien";
import { SET_DANH_SACH_SV } from "./constants/qlsvConstants";
import { sinhVienServices } from "./svServices/svServices";
import { Typography } from "antd";
import {
  bat_loading_action,
  tat_loading_action,
} from "./redux/action/loadingAction";

export class QuanLySinhVien extends Component {
  componentDidMount() {
    let isSuccess = true;
    this.props.batLoading();
    sinhVienServices
      .layDanhSachSinhVien()
      .then((res) => {
        this.props.tatLoading();
        this.props.setDssv(res.data);
      })
      .catch((err) => {
        this.props.tatLoading();
        console.log(err);
      });
  }
  render() {
    const { Text } = Typography;
    return (
      <div>
        <Typography.Title style={{ margin: "2rem", textAlign: "center" }}>
          <Text type="success">QUẢN LÝ SINH VIÊN</Text>
        </Typography.Title>
        <ModalSinhVien />
        <DanhSachSinhVien />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDssv: (dssv) => {
      dispatch({
        type: SET_DANH_SACH_SV,
        payload: dssv,
      });
    },
    batLoading: () => {
      dispatch(bat_loading_action());
    },
    tatLoading: () => {
      dispatch(tat_loading_action());
    },
  };
};

export default connect(null, mapDispatchToProps)(QuanLySinhVien);
