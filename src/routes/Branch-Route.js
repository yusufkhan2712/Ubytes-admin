import { Route } from "react-router-dom";

import AddBranch from "../pages/AddBranch";
import AddMenu from "../pages/AddMenu";
import Combo from "../pages/Combo";
import CustomerList from "../pages/CustomerList";
import Discount from "../pages/Discount";
import LiveOrders from "../pages/LiveOrders";
import OrderHistory from "../pages/OrderHistory";
import ViewCombo from "../pages/ViewCombo";
import ViewMenu2 from "../pages/ViewMenu2";

export const branchRoute = () => {
    return (
      <>
        <Route path="/liveorders" component={LiveOrders} />
        <Route path="/branch/add" component={AddBranch} />
        <Route path="/item/add"   component={AddMenu} exact />
        <Route path="/view/menu"  component={ViewMenu2} exact />
        <Route path="/combo"      component={Combo} />
        <Route path="/edit/combo/:id" component={Combo} />
        <Route path="/view/combo" component={ViewCombo} exact />
        <Route path="/edit/menu/:id" component={AddMenu} />
        <Route path="/discount" component={Discount} />
        <Route path="/order-history" component={OrderHistory} exact />
        <Route path="/customer-list" component={CustomerList} exact />
      </>
    );
};
