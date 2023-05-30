import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { set_delivery_areas } from "../redux/Branch/branchAction";
import { useHistory } from "react-router-dom";
import db, { storage } from "../firebase";
import XLSX from "xlsx";
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

const DeliveryAreas = ({ id, edit, user }) => {
  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);
  const state = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState();
  const [deliveryAreas, setDeliveryAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fileUploaded = event.target.files[0];

    var files = event.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function async(e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

      let deliveryAreas = [];

      for (let i = 12; i < dataParse.length; i++) {
        if (dataParse[i].length > 8) {
          deliveryAreas.push({
            id: typeof dataParse[i][1] !== "undefined" ? dataParse[i][1] : null,
            area:
              typeof dataParse[i][3] !== "undefined" ? dataParse[i][3] : null,
            city:
              typeof dataParse[i][5] !== "undefined" ? dataParse[i][5] : null,
            store:
              typeof dataParse[i][7] !== "undefined" ? dataParse[i][7] : null,
            minOrderValue:
              typeof dataParse[i][9] !== "undefined" ? dataParse[i][9] : null,
            deliveryFee:
              typeof dataParse[i][11] !== "undefined" ? dataParse[i][11] : null,
          });
        }
      }
      console.log("del", deliveryAreas);
      setDeliveryAreas(deliveryAreas);
    };
    reader.readAsBinaryString(f);
    setFile(fileUploaded);
    setLoading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    // let data = state.branch.deliveryAreas;

    var storageRef = storage.ref("deliveryAreas/" + id);
    var upload = await storageRef.put(file);
    const uploadLink = await upload.ref.getDownloadURL();

    let data = {
      filePath: uploadLink,
      areas: deliveryAreas,
    };

    // dispatch(set_delivery_areas({ deliveryAreas: data }));
    await db.collection("Branches").doc(id).update(data);

    history.push({
      pathname: edit
        ? `/branch/edit/${id}/pick-up-settings`
        : `/branch/add/pick-up-settings/`,
      state: { id },
    });
  };

  console.log(user.user.id);

  return (
    <div className="delivery-area-body">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <div className={classes.text}>Loading</div>
      </Backdrop>
      <h4>Delivery Areas</h4>
      <div className="delivery-area-inner">
        <div
          style={{
            margin: "2%",
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <svg
            data-v-35ffc3aa=""
            viewBox="0 0 100 100"
            fill="currentColor"
            class=""
            stroke="#B2C6D2"
            style={{ width: "100px", height: "100px" }}
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <circle cx="47.917" cy="14.617" r="12.5"></circle>
              <path d="M47.917 27.117v43.75m-12.5-19.675l-4.167.925-26.512-7.575a2.083 2.083 0 00-2.655 2.004v41.5c.002.93.619 1.745 1.513 2l27.146 7.758c.334.095.686.105 1.025.03l36.466-8.105a2.08 2.08 0 011.025.034l26.005 7.429a2.083 2.083 0 002.654-2.004v-41.5c0-.931-.618-1.75-1.513-2.005L69.258 43.93a2.083 2.083 0 00-1.025-.033l-7.816 1.742M31.25 52.117v45.766m37.5-54.033v45.767"></path>
            </g>
          </svg>
          <h4>Let’s add your delivery areas!</h4>
        </div>
        <div className="delivery-area-section">
          <p style={{ fontSize: "medium", fontWeight: "bold", margin: "2%" }}>
            Step 1
          </p>
          <p style={{ fontSize: "small" }}>
            First, you need to download our Excel template file and fill it out
            with your delivery areas.
          </p>
          <NavLink to="/files/delivery-areas.xlsx" target="_blank" download>
            <button>Download</button>
          </NavLink>
        </div>
        <div className="delivery-area-section">
          <p style={{ fontSize: "medium", fontWeight: "bold", margin: "2%" }}>
            Step 2
          </p>
          <p style={{ fontSize: "small" }}>
            When you finish filling out the file, click on the button below to
            upload it.
          </p>

          <button onClick={handleClick}>Upload a file</button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
            accept="text/plain, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>
        <button type="submit" className="btn_light_blue" onClick={submit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(DeliveryAreas);
