import QuanLySinhVien from "./QuanLySinhVien/QuanLySinhVien";
import "antd/dist/antd.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Homepage from "./QuanLySinhVien/pages/Home/Homepage";
import ChiTietSv from "./QuanLySinhVien/pages/ChiTietSv/ChiTietSv";
import "./App.css";
import NavRouter from "./QuanLySinhVien/components/NavRouter/NavRouter";
import LoadingComponent from "./QuanLySinhVien/components/LoadingComponent/LoadingComponent";

const App = () => {
  return (
    <BrowserRouter>
      <NavRouter />
      <LoadingComponent/>
      <Switch>
        <Route exact path={"/dssv"} component={QuanLySinhVien} />
        <Route exact path={"/detail/:id"} component={ChiTietSv} />
        <Route path={"/"} component={QuanLySinhVien} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
