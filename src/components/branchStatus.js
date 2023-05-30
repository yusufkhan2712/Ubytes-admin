import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

const BranchStatus = ({ id, edit }) => {
  return (
    <>
      {edit ? (
        <div className="branch_add_status">
          <ul>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to={`/branch/edit/${id}/basic`}>Basic Information</Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to={`/branch/edit/${id}/location`}>Branch Location</Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to={`/branch/edit/${id}/delivery-settings`}>
                Delivery settings
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to={`/branch/edit/${id}/delivery-areas`}>
                Delivery areas
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to={`/branch/edit/${id}/pick-up-settings`}>
                Pick-Up settings
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to={`/branch/edit/${id}/dine-in-settings`}>
                Dine In settings
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="branch_add_status">
          <ul>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link to="/branch/add/basic">Basic Information</Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link
                to="/branch/add/location"
                className={id ? "" : "disabled-link"}
              >
                Branch Location
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link
                to="/branch/add/delivery-settings"
                className={id ? "" : "disabled-link"}
              >
                Delivery settings
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link
                to="/branch/add/delivery-areas"
                className={id ? "" : "disabled-link"}
              >
                Delivery areas
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link
                to="/branch/add/pick-up-settings"
                className={id ? "" : "disabled-link"}
              >
                Pick-Up settings
              </Link>
            </li>
            <li>
              <div className="check_box">
                <CheckCircleIcon className="icon_check" />
              </div>

              <Link
                to="/branch/add/dine-in-settings"
                className={id ? "" : "disabled-link"}
              >
                Dine In settings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default BranchStatus;
