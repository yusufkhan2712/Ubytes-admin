import { Route, Switch } from "react-router-dom";

/* import BrandPage from "../client/src/components/Branch";
import Bulkupload from "../client/src/components/Bulkexcelupload/Bulkupload";
import BulkuploadProduct from "../client/src/components/Bulkexcelupload/BulkuploadProduct"; */
import AddBranch from "../pages/AddBranch";
import AddMenu from "../pages/AddMenu";
import Branding from "../pages/Branding";
import Combo from "../pages/Combo";
import CustomerList from "../pages/CustomerList";
import Discount from "../pages/Discount";
import EditBranch from "../pages/EditBranch";
import Inventory from "../pages/Inventory";
import LiveOrders from "../pages/LiveOrders";
import Merchant from "../pages/Merchant";
import OrderHistory from "../pages/OrderHistory";
import Qr from "../pages/Qr";
import SocialMedia from "../pages/SocialMedia";
import ViewBranch from "../pages/ViewBranch";
import ViewCombo from "../pages/ViewCombo";
import ViewMenu2 from "../pages/ViewMenu2";
import ViewMerchant from "../pages/ViewMerchant";

export const superAdminRoute = () => {
    return (
      <Switch>
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
      {/*   <Route exact path="/orders/:id/:type/:anlytics" component={BrandPage} /> */}
      </Switch>
    );
}
