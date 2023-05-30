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
  set_delivery_settings,
  add_timeSlot_delivery,
  set_startTime_delivery,
  set_endTime_delivery,
  toggle_delivery_day,
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

const DeliverySettings = ({ id, edit, user }) => {
  const classes = useStyles();
  const state = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [isDelivery, setIsDelivery] = useState(false);
  const [cardDelivery, setCardDelivery] = useState(false);
  const [cashDelivery, setCashDelivery] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [minOrderValue, setMinOrderValue] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);

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
    const doc = await db.collection("Branches").doc(id).get();
    let data = null;
    if (doc.exists) {
      data = doc.data();
      if (data?.deliverySettings) {
        setIsDelivery(data?.deliverySettings?.isDelivery || false);
        setCardDelivery(data?.deliverySettings?.cardDelivery || false);
        setCashDelivery(data?.deliverySettings?.cashDelivery || false);
        setDeliveryFee(data?.deliverySettings?.deliveryFee || 0);
        setMinOrderValue(data?.deliverySettings?.minOrderValue || 0);
        setPreparationTime(data?.deliverySettings?.preparationTime || 0);
        setDeliveryTime(data?.deliverySettings?.deliveryTime || 0);
        setTimeSlot(data?.deliverySettings?.timeSlot || timeSlot);
      }
    }
    setLoading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    let data = {
      isDelivery: isDelivery,
      cardDelivery: cardDelivery,
      cashDelivery: cashDelivery,
      deliveryFee: deliveryFee,
      minOrderValue: minOrderValue,
      preparationTime: preparationTime,
      deliveryTime: deliveryTime,
      timeSlot: timeSlot,
    };

    // let data = state.branch.deliverySettings;

    await db.collection("Branches").doc(id).update({ deliverySettings: data });
    dispatch(set_delivery_settings({ deliverySettings: data }));

    await db.collection("Branches").doc(id).update(data);

    history.push({
      pathname: edit
        ? `/branch/edit/${id}/delivery-areas`
        : `/branch/add/delivery-areas/`,
      state: { id },
    });
  };

  const toggleSwitch = (day, status, value) => {
    dispatch(toggle_delivery_day({ day, value }));
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
    dispatch(add_timeSlot_delivery({ day }));
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
          name="checkedA"
          checked={isDelivery}
          onChange={() => setIsDelivery(!isDelivery)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <div>
          <h4>Order for delivery</h4>
          <p style={{ color: "grey" }}>
            Customer can request orders to be delivered
          </p>
        </div>
      </div>

      <form>
        {isDelivery ? (
          <>
            <div className="delivery-settings-heading">
              <p>Payment methods</p>
              <p style={{ fontSize: "small", color: "grey" }}>
                Select all payment methods accepted on delivery
              </p>
            </div>
            <div className="delivery-row">
              <Checkbox
                checked={cardDelivery}
                onChange={() => setCardDelivery(!cardDelivery)}
              />{" "}
              <p>Card on delivery</p>
            </div>
            <div className="delivery-row">
              <Checkbox
                checked={cashDelivery}
                onChange={() => setCashDelivery(!cashDelivery)}
              />
              <p>Cash on delivery</p>
            </div>
            <div className="delivery-settings-heading">
              <p>Opening Hours</p>
              <p style={{ fontSize: "small", color: "grey" }}>
                Set the hours your outlet is open for delivery
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
                // let dayData =
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

                <div className="input_group ml-2">
                  <label htmlFor="">Preparation + delivery (minutes)</label>
                  <input
                    className="form_input"
                    type="text"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="delivery-settings-heading">
                <p>Delivery Settings</p>
                <p style={{ fontSize: "small", color: "grey" }}>
                  Set how much your customers need to pay and for delivery and
                  what is the minimum order value on your{" "}
                </p>
              </div>
              <div className="input_group">
                <label htmlFor="">Delivery Fee</label>
                <input
                  className="form_input"
                  type="text"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                />
              </div>

              <div className="input_group">
                <label htmlFor="">Minimum Order Value</label>
                <input
                  className="form_input"
                  type="text"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(e.target.value)}
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

export default connect(mapState)(DeliverySettings);
