import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  //   const { orders } = useSelector((state) => state.allorders);
  const { users } = useSelector((state) => state.allusers);

  //   let outOfStock = 0;

  //   products &&
  //     products.forEach((item) => {
  //       if (item.Stock === 0) {
  //         outOfStock += 1;
  //       }
  //     });

  useEffect(() => {
    dispatch(getAdminProduct);
    dispatch(getAllUsers);
  }, [dispatch]);

  //   let totalAmount = 0;
  //   orders &&
  //     orders.forEach((item) => {
  //       totalAmount += item.totalPrice;
  //     });

  //   const lineState = {
  //     labels: ["Initial Amount", "Amount Earned"],
  //     datasets: [
  //       {
  //         label: "TOTAL AMOUNT",
  //         backgroundColor: ["tomato"],
  //         hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //         data: [0, totalAmount],
  //       },
  //     ],
  //   };
  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br />
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              {/* <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link> */}
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
