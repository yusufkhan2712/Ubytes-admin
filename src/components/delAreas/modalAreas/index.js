import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import areasJson from "../../../assets/areaslist.json";
import searchIcon from "../../../assets/icons/search.png";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    boxShadow: "none",
    margin: "0 !important",
  },
  AccordionDetails: {
    padding: "0 !important",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const ModalAreas = ({ open, setOpen, selectedAreas = [], setSelectedAreas }) => {
  const classes = useStyles();
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState();
  const [minBasketValue, setMinBasketValue] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)
  useEffect(() => {
    groupAreas();
  }, [search]);

  const handleClose = () => {
    setOpen(false);
  };
  const groupAreas = () => {
    const listOfAreas = search
      ? areasJson.filter((a) =>
          a.name.toLowerCase().includes(search.toLowerCase())
        )
      : areasJson;
    const grouped = _.mapValues(_.groupBy(listOfAreas, "city"), (clist) =>
      clist.map((area) => _.omit(area, "city"))
    );
    const ars = [];
    for (const [k, v] of Object.entries(grouped)) {
      ars.push([k, v]);
    }
    setAreas(ars);
  };

  const onSearch = (v) => {
    setSearch(v);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <div className="delivery-container">
        <h2> Add delivery areas </h2>
        <div className="inputs-container">
          <TextField
            label="Min Basket Value"
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">INR</InputAdornment>
              ),
            }}
            variant="outlined"
            value={minBasketValue}
            onChange={e=>setMinBasketValue(e.target.value)}
          />
          <TextField
            label="Delivery Fee"
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">INR</InputAdornment>
              ),
            }}
            variant="outlined"
            value={deliveryFee}
            onChange={e=>setDeliveryFee(e.target.value)}
          />
        </div>

        <div className={"area-list"}>
          <section className="search">
            <div className="search-inner">
              <img src={searchIcon} alt="search icon" className="icn" />
              <input
                style={{ outline: "none" }}
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                name="search-bar"
                id="search-bar"
                placeholder="Search for an area"
              />
            </div>
          </section>
          {areas.map((area) => (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={area[0]}
                className="accordion-summary"
              >
                <div className={`${classes.heading} accordion-title`}>
                  <div>{area[0]}</div>
                  <div className="size">{area[1].length}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.AccordionDetails}>
                <ul className="delivery-areas-container">
                  {area[1].map((item) => (
                    <li key={item.id} className="delivery-area">
                      <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" checked={selectedAreas.find(a=> a.id===item.id)} />}
                        label={item.name}
                      />
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAreas;
