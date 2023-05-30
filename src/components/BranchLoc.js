import React, { useState, useEffect } from "react";
import db, { storage } from "../firebase";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { set_branch_loc, set_add_step } from "../redux/Branch/branchAction";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Maps from "./GoogleMaps";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  text: {
    top: "50px",
    position: "relative",
    left: "-50px",
  },
}));

const BranchLoc = ({ id, edit, user }) => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    if (id) {
      getdata(id);
    } else {
      setLoading(false);
    }
  }, []);

  const getdata = async (id) => {
    setLoading(true);
    const doc = await db.collection("Branches").doc(id).get();
    let data = null;
    if (doc.exists) {
      data = doc.data();
      setArea(data?.area);
      setAddress(data?.address);
    }
    setLoading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    let data = { address: address, area: area };
    // let data = state.branch.location;

    dispatch(set_branch_loc({ location: data }));
    await db.collection("Branches").doc(id).update(data);
    // dispatch(set_add_step());

    history.push({
      pathname: edit
        ? `/branch/edit/${id}/delivery-settings`
        : `/branch/add/delivery-settings/`,
      state: { id },
    });
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <div className={classes.text}>Loading</div>
      </Backdrop>
      <h2>Branch Locatopm</h2>
      <div className="map_parent my-3">
        {/* <Maps /> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14596.950495594365!2d90.41771978301999!3d23.845694370599976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c691ba478fbd%3A0xd1b3f71371eb15ec!2sHazrat%20Shahjalal%20International%20Airport!5e0!3m2!1sen!2sbd!4v1613922135351!5m2!1sen!2sbd"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
        />
      </div>
      <form>
        <div className="input_group">
          <label htmlFor="">Address</label>
          <input
            className="form_input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input_group">
          <label htmlFor="">Area</label>
          <input
            className="form_input"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <button
          // type="submit"
          onClick={submit}
          className="btn_light_blue"
        >
          Save Changes
        </button>
        <input type="button" className="btn_light_blue ml-2" value="Reset" />
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(BranchLoc);
