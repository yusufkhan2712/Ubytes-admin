import React from "react";
import BranchStatus from "../components/branchStatus";
import BasicInfo from "../components/BasicInfo";
import { Switch, Route } from "react-router-dom";
import BranchLoc from "../components/BranchLoc";
import DeliveryAreas from "../components/DeliveryAreas";
import DeliverySettings from "../components/DeliverySettings";
import { useParams } from "react-router-dom";
import PickUpSettings from "../components/PickUpSettings";
import DineInSettings from "../components/DineInSettings";
import { useSelector } from "react-redux";

const AddBranch = ({ history, match, ...props }) => {
  let id = props.location.state ? props.location.state.id : null;
  const state = useSelector((state) => state.branch);
  return (
    <div className="add_branch_parent">
      <div className="add_branch_left">
        <BranchStatus id={id} />
      </div>
      <div className="add_branch_right">
        <Switch>
          <Route path={"/branch/add/location"}>
            <BranchLoc id={id} />
          </Route>
          <Route
            exact
            path={
              match.params.id ? "/branch/add/basic/:id" : "/branch/add/basic"
            }
          >
            <BasicInfo id={id} />
          </Route>
          <Route exact path="/branch/add/delivery-settings">
            <DeliverySettings id={id}></DeliverySettings>
          </Route>
          <Route exact path="/branch/add/delivery-areas">
            <DeliveryAreas id={id}></DeliveryAreas>
          </Route>
          <Route exact path="/branch/add/pick-up-settings">
            <PickUpSettings id={id}></PickUpSettings>
          </Route>
          <Route exact path="/branch/add/dine-in-settings">
            <DineInSettings id={id}></DineInSettings>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AddBranch;
