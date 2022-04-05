import axios from "axios";

const BASE_URL = "https://621b1529faa12ee45004ec80.mockapi.io/sinhvien";

export const sinhVienServices = {
  layDanhSachSinhVien: () => {
    return axios({
      method: "GET",
      url: BASE_URL,
    });
  },
  xoaSinhVien: (id) => {
    return axios({
      method: "DELETE",
      url: `${BASE_URL}/${id}`,
    });
  },
  themSinhVien: (sv) => {
    return axios({
      method: "POST",
      url: BASE_URL,
      data: sv,
    });
  },
  suaSinhVien: (id, data) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/${id}`,
      data: data,
    });
  },
  layChiTietSinhVien: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },
};
