import basketActions from "./redux/basket/actions";
import { connect, useDispatch } from "react-redux";
import db, { auth as Auth } from "./firebase";
import "./App.css";
import Leftnav from "./components/left-nav";

import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";


import actions from "./redux/user/userActions";
import SignupBranch from "./pages/SignupBranch";
import WaiterSignup from "./pages/WaiterSingup";

import { branchRoute, merchantsRoute, superAdminRoute } from "./routes";
import EditBranch from "./pages/EditBranch";
import AddMenu from "./pages/AddMenu";
import ViewCombo from "./pages/ViewCombo";
import Combo from "./pages/Combo";
import ViewMenu2 from "./pages/ViewMenu2";

import Merchant from "./pages/Merchant";
import SocialMedia from "./pages/SocialMedia";
import Inventory from "./pages/Inventory";
import AddBranch from "./pages/AddBranch";
import LiveOrders from "./pages/LiveOrders";
import ViewBranch from "./pages/ViewBranch";
import Branding from "./pages/Branding";
import ViewMerchant from "./pages/ViewMerchant";
//import BulkuploadProduct from "./client/src/components/Bulkexcelupload/BulkuploadProduct";
import Qr from "./pages/Qr";
import CustomerList from "./pages/CustomerList";
import OrderHistory from "./pages/OrderHistory";
import Discount from "./pages/Discount";

function App({ addUser, addRole, user, addMid, addBid }) {
  const dispatch = useDispatch();
  const [state, setstate] = useState(true);

  useEffect(() => {
    getBasketProducts();
    var location = window.location.href.split("/");
    if (location[3] == "orders") {
      setstate(false);
    } else {
      //console.log(window.location.href);
      setstate(true);
    }
  }, []);
  const getBasketProducts = () => {
    const basketProducts = window.sessionStorage.getItem("basketProducts");
    if (!basketProducts) {
      window.sessionStorage.setItem(
        "basketProducts",
        JSON.stringify({
          products: {},
          totalProducts: 0,
        })
      );
    } else {
      dispatch({
        type: basketActions.SET_STATE,
        payload: JSON.parse(basketProducts),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((authUser) => {
      setTimeout(() => {
        if (authUser) {
          db.collection("users")
            .doc(authUser.uid)
            .onSnapshot((snapshot) => {
              addUser({...snapshot.data(),id:snapshot.id});
              addRole(snapshot.data()?.role);
             /*  if (authUser.role === "Branch") {
                getbrole(authUser);
              } else if (authUser.role === "Waiter") {
                getwrole(authUser);
              } else {
                getmrole(authUser);
              } */
            });
        } else {
          addUser(null);
          addRole(null);
          addMid(null);
          addBid(null);
        }
      }, 1500);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getmrole = (authUser) => {
    return db
      .collection("Merchant")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => addRole(snapshot.data()?.role));
  };

  const getbrole = (authUser) => {
    db.collection("Branchauth")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => {
        addRole(snapshot.data().role);
        addMid(snapshot.data().merchandId);
        addBid(snapshot.data().branchId);
      });
  };
  const getwrole = (authUser) => {
    db.collection("Waiterauth")
      .doc(authUser.uid)
      .onSnapshot((snapshot) => {
        addRole(snapshot.data().role);
        addMid(snapshot.data().merchandId);
        addBid(snapshot.data().branchId);
      });
  };
  const merchantsRoute = () => {
    if (user.role === "Waiter") {
      <Route exact path="/liveorders">
        <LiveOrders mid={user}></LiveOrders>
      </Route>;
    }
    if (user.role === "Branch") {
      return (
        <>
          <Route exact path="/waiter-signup" component={WaiterSignup} />
          <Route exact path="/order-history" component={OrderHistory} />
          <Route exact path="/liveorders">
            <LiveOrders mid={user}></LiveOrders>
          </Route>
        </>
      );
    }
    if (user.role === "Merchant") {
      return (
        <>
          <Route exact path="/liveorders">
            <LiveOrders mid={user}></LiveOrders>
          </Route>
          <Route path="/branch/add" component={AddBranch} />
          <Route path="/view/branch" component={ViewBranch} />
          <Route exact path="/item/add" component={AddMenu} />
          <Route exact path="/view/menu" component={ViewMenu2} />
          <Route path="/combo" component={Combo} />
          <Route path="/edit/combo/:id" component={Combo} />
          <Route exact path="/view/combo" component={ViewCombo} />
          <Route path="/edit/menu/:id" component={AddMenu} />
          <Route path="/branch/edit/:id" component={EditBranch} />
        {/*   <Route exact path="/branch/bulk" component={Bulkupload} /> */}
          <Route path="/discount" component={Discount} />
          <Route exact path="/order-history" component={OrderHistory} />
          <Route exact path="/customer-list" component={CustomerList} />
          <Route exact path="/branding" component={Branding} />
          <Route path="/social-media" exact component={SocialMedia} />
          <Route path="/branch/signup" component={SignupBranch} exact />
        </>
      );
    } else if (user.role === "Super_Admin") {
      return (
        <Switch>
          <Route exact path="/liveorders">
            <LiveOrders mid={user}></LiveOrders>
          </Route>
          ;
          <Route path="/branch/add" component={AddBranch} />
          <Route path="/view/branch" component={ViewBranch} />
          <Route exact path="/item/add" component={AddMenu} />
          <Route exact path="/view/menu" component={ViewMenu2} />
          <Route path="/combo" component={Combo} />
          <Route path="/edit/combo/:id" component={Combo} />
          <Route exact path="/view/combo" component={ViewCombo} />
          <Route path="/edit/menu/:id" component={AddMenu} />
          <Route path="/branch/edit/:id" component={EditBranch} />
        {/*   <Route exact path="/branch/bulk" component={Bulkupload} /> */}
          <Route path="/discount" component={Discount} />
          <Route exact path="/order-history" component={OrderHistory} />
          <Route exact path="/customer-list" component={CustomerList} />
          <Route exact path="/branding" component={Branding} />
          <Route path="/view/merchant" component={ViewMerchant} />
          <Route path="/edit/merchant/:id" component={Merchant} />
          <Route path="/social-media" exact component={SocialMedia} />
          <Route exact path="/merchant/add" component={Merchant} />
     {/*      <Route exact path="/product/bulk" component={BulkuploadProduct} /> */}
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/qr" component={Qr}></Route>
        {/*   <Route
            exact
            path="/orders/:id/:type/:anlytics"
            component={BrandPage}
          /> */}
        </Switch>
      );
    } else if (user.role === "Branch") {
      return (
        <>
          <Route exact path="/liveorders">
            <LiveOrders mid={user}></LiveOrders>
          </Route>
          ;
          <Route path="/branch/add" component={AddBranch} />
          <Route exact path="/item/add" component={AddMenu} />
          <Route exact path="/view/menu" component={ViewMenu2} />
          <Route path="/combo" component={Combo} />
          <Route path="/edit/combo/:id" component={Combo} />
          <Route exact path="/view/combo" component={ViewCombo} />
          <Route path="/edit/menu/:id" component={AddMenu} />
          <Route path="/discount" component={Discount} />
          <Route exact path="/order-history" component={OrderHistory} />
          <Route exact path="/customer-list" component={CustomerList} />
        </>
      );
    }
  };

  const defaultRoute = () => <Redirect from="**" to="/dashboard"></Redirect>;

  return (
    <>
      <div className="App">
        {user.role && <Leftnav role={user.role} />}
        {user.role && (
          <>
            <div className="main-body">
              <Route path="/dashboard" component={Dashboard} />
              {(user.role === "Merchant" && merchantsRoute()) ||
                (user.role === "Super_Admin" && superAdminRoute()) ||
                (user.role === "Branch" && branchRoute())}
              {user.role && defaultRoute()}
            </div>
          </>
        )}
        <>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>

          {/*  <Switch>
            <>
              <Route path="/logout" component={logout} />
              <Route
                exact
                path="/orders/:mid/:id/:type/:anlytics/:table"
                component={Home}
              />
              <Route
                exact
                path="/orders/checkout/:mid/:bid"
                component={CheckOut}
              ></Route>
              <Route
                exact
                path="/orders/confirm/:mid/:bid/:checkOutType"
                component={Confirm}
              ></Route>
              <Route
                exact
                path="/orders/products/:mid/:bid/:id"
                component={Product}
              ></Route>
              <Route
                exact
                path="/orders/products/:id/edit"
                component={Product}
              ></Route>
              <Route exact path="/orders/login" component={UserLogin}></Route>
              <Route
                exact
                path="/orders/address/:mid/:bid/:checkoutType"
                component={Confim}
              />
              <Route
                exact
                path="/orders/save/address"
                component={Saveaddress}
              />
            </>
            <>
              <Route
                exact
                path="/orders/save/address"
                component={Saveaddress}
              />
              <Route
                exact
                path="/orders/:id/:type/:anlytics/:table"
                component={Home}
              />
              <Route exact path="/branch/:id" component={BranchInfo} />
              <Route
                exact
                path="/orders/address/:mid/:bid/:checkoutType"
                component={Confim}
              />
              <Route
                exact
                path="/orders/checkout/:mid/:bid"
                component={CheckOut}
              ></Route>
              <Route
                exact
                path="/orders/confirm/:mid/:bid/:checkOutType"
                component={Confirm}
              ></Route>
              <Route
                exact
                path="/orders/products/:id"
                component={Product}
              ></Route>
              <Route
                exact
                path="/orders/products/:id/edit"
                component={Product}
              ></Route>
              <Route exact path="/orders/login" component={UserLogin}></Route>
            </>
          </Switch> */}
        </>
      </div>
    </>
  );
}

const mapDispatch = (dispatch) => {
  return {
    addUser: (user) => dispatch({ type: actions.SET_USER, user: user }),
    addRole: (role) => dispatch({ type: actions.SET_ROLE, role: role }),
    addMid: (mid) => dispatch({ type: actions.SET_MID, mid: mid }),
    addBid: (bid) => dispatch({ type: actions.SET_BID, bid: bid }),
  };
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export const logout = () => {
  Auth.signOut();
};

export default connect(mapState, mapDispatch)(App);
