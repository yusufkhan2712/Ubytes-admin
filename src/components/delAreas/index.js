import { useState } from "react"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ModalAreas from "./modalAreas"
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

const DeliveryAreas = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [branchAreas, setBranchAreas] = useState([])

  const addArea = area=>{
    const idx = branchAreas.findIndex(a=> a.id === area.id)
    const list = [...branchAreas]
    if (idx>=0) {
      list.splice(idx, 1)
    }else {
      list.push(area)
    }
    setBranchAreas(list)
  }
  return(
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
        <button type="submit" className="btn_light_blue"  onClick={()=> setOpen(true)} >
          <AddCircleOutlineIcon/> Add Delivery Areas
        </button>
      </div>
      <ModalAreas open={open} setOpen={setOpen} setSelectedAreas={addArea} selectedAreas={branchAreas} />
    </div>
  )
}

export default DeliveryAreas;
