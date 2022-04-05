import React, { Component, createRef } from "react";
import { Form, Input } from "antd";
import {
  ON_FAILED_STATUS,
  SET_DANH_SACH_SV,
  SUA_SINH_VIEN,
  THEM_SINH_VIEN,
} from "../constants/qlsvConstants";
import { connect } from "react-redux";
import { sinhVienServices } from "../svServices/svServices";

export class FormSV extends Component {
  formRef = createRef();
  onFinish = (values) => {
    this.props.sinhVien(values);
    this.props.editMode === false &&
      sinhVienServices
        .themSinhVien(values)
        .then((res) => {
          this.formRef.current.resetFields();
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
    this.props.editMode &&
      sinhVienServices
        .suaSinhVien(this.props.onEditId, values)
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
  componentDidUpdate() {
    this.props.onEditSv
      ? this.formRef.current.setFieldsValue(this.props.onEditSv)
      : this.formRef.current.setFieldsValue({
          name: "",
          phone: "",
          email: "",
          id: "",
        });
  }

  onFinishFailed = (errorInfo) => {
    this.props.onFailed(this.formRef);
  };

  render() {
    return (
      <Form
        id="myForm"
        ref={this.formRef}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={this.props.onEditSv}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input id!",
            },
          ]}
        >
          <Input disabled={this.props.onEditSv} />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    editMode: state.qlsvReducer.editMode,
    onEditId: state.qlsvReducer.onEditId,
    onEditSv: state.qlsvReducer.onEditSv,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sinhVien: (sv) => {
      dispatch({
        type: THEM_SINH_VIEN,
        payload: sv,
      });
    },
    setDssv: (data) => {
      dispatch({
        type: SET_DANH_SACH_SV,
        payload: data,
      });
    },
    onFailed: (obj) => {
      dispatch({
        type: ON_FAILED_STATUS,
        payload: obj,
      });
    },
    suaSv: (data) => {
      dispatch({
        type: SUA_SINH_VIEN,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSV);
