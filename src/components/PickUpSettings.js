import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";
// import 'react-times/css/material/default.css';
import db from "../firebase";
import { useHistory } from "react-router-dom";
import "../style/material/default.css";
// or you can use classic theme
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import TimePicker from "react-times";
import styled from "styled-components";
import RenderDays from "./RenderDays";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  set_pickup,
  add_timeSlot_pickup,
  toggle_pickup_day,
} from "../redux/Branch/branchAction";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

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

const PickUpSettings = ({ id, edit, user }) => {
  const classes = useStyles();
  const state = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const history = useHistory();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [loading, setLoading] = useState(true);
  const [isPickup, setIsPickup] = useState(false);
  const [cardPickup, setCardPickup] = useState(false);
  const [cashPickup, setCashPickup] = useState(false);
  const [preparationTime, setPreparationTime] = useState(0);

  const [timeSlot, setTimeSlot] = useState({
    Sunday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
    Monday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
    Tuesday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
    Wednesday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
    Thursday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
    Friday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
    Saturday: {
      status: false,
      value: [{ startTime: "01:00", endTime: "03:00" }],
    },
  });

  useEffect(() => {
    if (id) {
      getdata(id);
    } else {
      setLoading(false);
    }
  }, []);

  const getdata = async (id) => {
    setLoading(true);
    const doc = await db
      .collection("Merchant")
      .doc(user.user.id)
      .collection("Branches")
      .doc(id)
      .get();
    let data = null;
    if (doc.exists) {
      data = doc.data();
      if (data?.pickup) {
        setIsPickup(data?.pickup?.isPickup || false);
        setCardPickup(data?.pickup?.cardPickup || false);
        setCashPickup(data?.pickup?.cashPickup || false);
        setPreparationTime(data?.pickup?.preparationTime || 0);
        setTimeSlot(data?.pickup?.timeSlot || timeSlot);
      }
    }
    setLoading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    let data = {
      isPickup: isPickup,
      cardPickup: cardPickup,
      cashPickup: cashPickup,
      preparationTime: preparationTime,
      timeSlot: timeSlot,
    };

    // let data = state.branch.dinein;

    await db
      .collection("Merchant")
      .doc(user.user.id)
      .collection("Branches")
      .doc(id)
      .update(data);

    history.push({
      pathname: edit
        ? `/branch/edit/${id}/dine-in-settings`
        : `/branch/add/dine-in-settings/`,
      state: { id },
    });
  };

  const toggleSwitch = (day, status, value) => {
    dispatch(toggle_pickup_day({ day, value }));
    setTimeSlot({
      ...timeSlot,
      [day]: {
        status: status,
        value: status === true ? value : [],
      },
    });
  };

  const addSlot = (day, startTime, endTime) => {
    let arr = timeSlot[day].value;
    arr.push({
      startTime: "00:00",
      endTime: "00:00",
    });
    dispatch(add_timeSlot_pickup({ day }));
  };

  const clearTimeSlot = ({ day, index }) => {
    let arr = timeSlot[day].value;
    console.log(arr);
    arr.splice(index, 1);
    console.log(arr);

    setTimeSlot({
      ...timeSlot,
      [day]: {
        status: timeSlot[day].status,
        value: arr,
      },
    });
  };

  const setStartTime = (startTime, day, index) => {
    let arr = timeSlot[day].value;
    arr[index].startTime = startTime;
    console.log(arr, startTime);

    setTimeSlot({
      ...timeSlot,
      [day]: {
        status: timeSlot[day].status,
        value: arr,
      },
    });
  };

  const setEndTime = (endTime, day, index) => {
    let arr = timeSlot[day].value;
    arr[index].endTime = endTime;
    console.log(arr, endTime);

    setTimeSlot({
      ...timeSlot,
      [day]: {
        status: timeSlot[day].status,
        value: arr,
      },
    });
  };

  return (
    <div className="delivery-settings-body">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <div className={classes.text}>Loading</div>
      </Backdrop>
      <div className="delivery-settings-row">
        <Switch
          checked={isPickup}
          onChange={() => setIsPickup(!isPickup)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <div>
          <h4>Order for pickup</h4>
          <p style={{ color: "grey" }}>
            Customer can pick up their orders at the outlet
          </p>
        </div>
      </div>

      <form>
        {isPickup ? (
          <>
            <div className="delivery-settings-heading">
              <p>Payment methods</p>
              <p style={{ fontSize: "small", color: "grey" }}>
                Select all payment methods accepted on pickup
              </p>
            </div>
            <div className="delivery-row">
              <Checkbox
                checked={cardPickup}
                onChange={() => setCardPickup(!cardPickup)}
              />{" "}
              <p>Card on pickup</p>
            </div>
            <div className="delivery-row">
              <Checkbox
                checked={cashPickup}
                onChange={() => setCashPickup(!cashPickup)}
              />
              <p>Cash on pickup</p>
            </div>
            <div className="delivery-settings-heading">
              <p>Opening Hours</p>
              <p style={{ fontSize: "small", color: "grey" }}>
                Set the hours your outlet is open for delivery
              </p>
            </div>
            <div className="delivery-settings-col">
              <div className="delivery-settings-row-">
                <p>Day</p>
                <p>From</p>
                <p>To</p>
                <p></p>
              </div>

              {days.map((day, index) => {
                return (
                  <RenderDays
                    key={index}
                    day={day}
                    index={index}
                    toggleSwitch={toggleSwitch}
                    addSlot={addSlot}
                    dayData={timeSlot[day]}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    clearTimeSlot={clearTimeSlot}
                  />
                );
              })}
            </div>

            <div>
              <div className="delivery-settings-heading">
                <p>Operation Settings</p>
                <p style={{ fontSize: "small", color: "grey" }}>
                  Set the default time needed for preparing and delivering
                  orders
                </p>
              </div>
              <div className="input_group">
                <label htmlFor="">Preparation (minutes)</label>
                <input
                  className="form_input"
                  type="text"
                  value={preparationTime}
                  onChange={(e) => setPreparationTime(e.target.value)}
                />
              </div>
            </div>
          </>
        ) : null}
        <div className="mt-4">
          <button onClick={submit} className="btn_light_blue">
            Save Changes
          </button>
          <input type="button" className="btn_light_blue ml-2" value="Reset" />
        </div>
      </form>
    </div>
  );
};

const Picker = styled(TimePicker)`
  background-color: blue;
`;

const Row = styled.div`
  flex-direction: row;
  display: flex;
  justify-items: space-between;
  vertical-align: middle;
`;

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(PickUpSettings);
