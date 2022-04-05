import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "antd";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";

import {
  OPEN_MODAL,
  SET_DANH_SACH_SV,
  SUA_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../constants/qlsvConstants";
import { sinhVienServices } from "../svServices/svServices";

export class DanhSachSinhVien extends Component {
  render() {
    let { dssv, editMode } = this.props;
    const { Column } = Table;
    const xoaSv = (id) => {
      sinhVienServices
        .xoaSinhVien(id)
        .then((res) => {
          sinhVienServices
            .layDanhSachSinhVien()
            .then((res) => {
              this.props.setDssv(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const suaSv = (id) => {
      sinhVienServices.layChiTietSinhVien(id).then((res) => {
        // console.log(res.data)
        this.props.openModal(id, res.data);
      });
    };

    return (
      <Table dataSource={[...dssv]} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" width={200} />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          width={300}
          title="Edit"
          key="edit"
          render={(text, row) => (
            <>
              <Button
                type="primary"
                data-toggle="modal"
                data-target="#myModal"
                onClick={() => suaSv(row["id"])}
              >
                EDIT
              </Button>
              <Button type="danger" onClick={() => xoaSv(row["id"])}>
                DELETE
              </Button>
              <Button type="primary" ghost>
                <NavLink className="text-white" to={`/detail/${row["id"]}`}>
                  Xem chi tiet
                </NavLink>
              </Button>
            </>
          )}
        />
      </Table>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    dssv: state.qlsvReducer.dssv,
    editMode: state.qlsvReducer.editMode,
    onFinish: state.qlsvReducer.onFinish,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    setDssv: (data) => {
      dispatch({
        type: SET_DANH_SACH_SV,
        payload: data,
      });
    },
    openModal: (id, data) => {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          edit: "edit",
          onEditId: id,
          onEditSv: data,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachSinhVien);
