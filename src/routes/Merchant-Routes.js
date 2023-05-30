import { Route } from "react-router-dom";

/* import Bulkupload from "../client/src/components/Bulkexcelupload/Bulkupload"; */
import AddBranch from "../pages/AddBranch";
import AddMenu from "../pages/AddMenu";
import Branding from "../pages/Branding";
import Combo from "../pages/Combo";
import CustomerList from "../pages/CustomerList";
import Discount from "../pages/Discount";
import EditBranch from "../pages/EditBranch";
import LiveOrders from "../pages/LiveOrders";
import OrderHistory from "../pages/OrderHistory";
import SignupBranch from "../pages/SignupBranch";
import SocialMedia from "../pages/SocialMedia";
import ViewBranch from "../pages/ViewBranch";
import ViewCombo from "../pages/ViewCombo";
import ViewMenu2 from "../pages/ViewMenu2";

export const merchantsRoute = () => {
    return (
      <>
        <Route exact path="/liveorders" component={LiveOrders} />
        <Route path="/branch/add" component={AddBranch} />
        <Route path="/view/branch" component={ViewBranch} />
        <Route exact path="/item/add" component={AddMenu} />
        <Route exact path="/view/menu" component={ViewMenu2} />
        <Route path="/combo" component={Combo} />
        <Route path="/edit/combo/:id" component={Combo} />
        <Route exact path="/view/combo" component={ViewCombo} />
        <Route path="/edit/menu/:id" component={AddMenu} />
        <Route path="/branch/edit/:id" component={EditBranch} />
{/*         <Route exact path="/branch/bulk" component={Bulkupload} /> */}
        <Route path="/discount" component={Discount} />
        <Route exact path="/order-history" component={OrderHistory} />
        <Route exact path="/customer-list" component={CustomerList} />
        <Route exact path="/branding" component={Branding} />
        <Route path="/social-media" exact component={SocialMedia} />
        <Route path="/branch/signup" component={SignupBranch} exact />
      </>
    );
};
