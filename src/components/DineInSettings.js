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
  set_dinein,
  add_timeSlot_dinein,
  toggle_dinein_day,
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

const DineinSettings = ({ id, edit, user }) => {
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
  const [isDinein, setIsDinein] = useState(false);
  const [cardDinein, setCardDinein] = useState(false);
  const [cashDinein, setCashDinein] = useState(false);
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
      if (data?.dinein) {
        setIsDinein(data?.dinein?.isDinein || false);
        setCardDinein(data?.dinein?.cardDinein || false);
        setCashDinein(data?.dinein?.cashDinein || false);
        setTimeSlot(data?.dinein?.timeSlot || timeSlot);
        setPreparationTime(data?.dinein?.preparationTime || preparationTime);
      }
    }
    setLoading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    let data = {
      isDinein: isDinein,
      cardDinein: cardDinein,
      cashDinein: cashDinein,
      timeSlot: timeSlot,
      preparationTime: preparationTime,
    };

    console.log("timeslot", timeSlot);
    // let data = state.branch.dinein;

    dispatch(set_dinein({ dinein: data }));
    await db
      .collection("Merchant")
      .doc(user.user.id)
      .collection("Branches")
      .doc(id)
      .update(data);

    history.push({
      // pathname: edit ? `/branch/edit/${id}/` : `/branch/add/`,
      pathname: "/view/branch",
      state: { id },
    });
  };

  const toggleSwitch = (day, status, value) => {
    dispatch(toggle_dinein_day({ day, value }));
    setTimeSlot({
      ...timeSlot,
      [day]: {
        status: status,
        value: status === true ? value : [],
      },
    });
  };

  const addSlot = (day) => {
    let arr = timeSlot[day].value;
    arr.push({
      startTime: "00:00",
      endTime: "00:00",
    });
    dispatch(add_timeSlot_dinein({ day }));
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
          name="checkedA"
          checked={isDinein}
          onChange={() => setIsDinein(!isDinein)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <div>
          <h4>Contactless Dining</h4>
          <p style={{ color: "grey" }}>
            Customer can order for the dine-in at the outlet
          </p>
        </div>
      </div>

      <form>
        {isDinein ? (
          <>
            <div className="delivery-settings-heading">
              <p>Payment methods</p>
              <p style={{ fontSize: "small", color: "grey" }}>
                Select all payment methods accepted on dine-in
              </p>
            </div>
            <div className="delivery-row">
              <Checkbox
                checked={cardDinein}
                onChange={() => setCardDinein(!cardDinein)}
              />{" "}
              <p>Card after Dine-in</p>
            </div>
            <div className="delivery-row">
              <Checkbox
                checked={cashDinein}
                onChange={() => setCashDinein(!cashDinein)}
              />
              <p>Cash after Dine-in</p>
            </div>
            <div className="delivery-settings-heading">
              <p>Opening Hours</p>
              <p style={{ fontSize: "small", color: "grey" }}>
                Set the hours your outlet is open for dinein
              </p>
            </div>
            <div className="delivery-settings-col">
              <div className="delivery-settings-row-">
                <p className="f-w-500 mb-1" style={{ width: "120px" }}>
                  Day
                </p>
                {/* <From> */}
                <p className="f-w-500 mb-1">From</p>
                <p className="f-w-500 mb-1">To</p>
                {/* </From> */}
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
              <div className="delivery-settings-row-">
                <div className="input_group mr-2">
                  <label htmlFor="">Preparation (minutes)</label>
                  <input
                    className="form_input"
                    type="text"
                    value={preparationTime}
                    onChange={(e) => setPreparationTime(e.target.value)}
                  />
                </div>
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
  justify-content: space-between;
  vertical-align: middle;
`;

const From = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;
  width: 60%;
`;

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(DineinSettings);
