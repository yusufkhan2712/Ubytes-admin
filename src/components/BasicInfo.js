import React, { useState, useEffect } from "react";
import tdata from "../timezone.json";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { imageToBase64 } from "../utils";
import db, { storage } from "../firebase";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { set_branch_info, set_add_step } from "../redux/Branch/branchAction";
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

const BasicInfo = (props) => {
  let { id, edit } = props;
  const classes = useStyles();
  const state = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const history = useHistory();
  const [brandName, setbranch_] = useState("");
  const [loading, setLoading] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchEmail, setBranchEmail] = useState("");
  const [branchContact, setBranchContact] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [texRate, setTextRate] = useState("");
  const [taxStatus, setTaxStatus] = useState("Inclusive");
  const [taxbtn, setTaxbtn] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [brands, setBrands] = useState([{}]);
  const [branch, setbranch] = useState("");
  const [brandBanner, setBrandBanner] = useState(false);
  const [bannerPreview, setBrandBannerPreview] = useState(false);
  const [merchantList, setMerchantList] = useState([]);
  const [merchant, setMerchant] = useState({});
  const taxtBtnHandler = (type) => {
    if (type === "inclusive") {
      setTaxStatus("Inclusive");
      setTaxbtn(false);
    } else if (type === "exclusive") {
      setTaxStatus("Exclusive");
      setTaxbtn(true);
    }
  };

  const onBannerChange = async (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      const size = file.size / 1024 / 1024;
      if (size <= 1) {
        const banner = await imageToBase64(file);
        setBrandBannerPreview(banner);
        setBrandBanner(file);
      }
    }
  };
  const getAllMerchants = async () => {
    let merchants = await db.collection("Merchant").get();
    let data = [];
    merchants.forEach((merchant) => {
      data.push({ label: merchant.data().brandName, value: merchant.id });
    });

    setMerchantList(data);
  };
  useEffect(() => {
    if (props.user.role == "Merchant") {
      setMerchant({ label: props.user.brandName, value: props.user.brandName });
    }
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
      if (data) {
        setBranchName(data?.branchName);
        setBranchContact(data?.branchContact || "");
        setTimeZone(data?.timeZone);
        setTextRate(data?.taxRate);
        setTaxStatus(data?.taxStatus);
        setBranchEmail(data?.branchEmail);
        setSelectedBrands(data?.brands);
        setBrandBanner(data?.brandBanner);
        setBrandBannerPreview(data?.brandBanner);
        setMerchant({ label: data?.merchantId, value: data?.merchantId });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllMerchants();
    if (props.id) {
      if (props.id) {
        getdata(props.id);
      }
    }
    if (brandBanner) {
      const objectUrl = URL.createObjectURL(brandBanner);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, []);

  const submit = async () => {
    setLoading(true);
    for (let index = 0; index < branchEmail.length; index++) {
      delete branchEmail[index]["__isNew__"];
    }

    let uploadLink = brandBanner;

    if (brandBanner !== bannerPreview) {
      var storageRef = storage.ref("brandBanner/" + id);
      const uploadBanner = await storageRef.put(brandBanner);
      uploadLink = await uploadBanner.ref.getDownloadURL();
    }

    var data = {
      /*   brands: props.user.displayName, */
      branchName: branchName,
      branchEmail: branchEmail,
      branchContact: branchContact,
      taxStatus: taxStatus,
      taxRate: texRate,
      brandBanner: uploadLink,
      timeZone: timeZone,
    };

    await dispatch(set_branch_info({ basicInfo: data })).then(async () => {
      if (edit) {
        await db
          .collection("Branches")
          .doc(id)
          .update({ ...data, merchantId: merchant.value });
        await db
          .collection("Branches")
          .doc(id)
          .update({ ...data, merchantId: merchant.value });
      } else {
        await db
          .collection("Branches")
          .add({ ...data, merchantId: merchant.value })
          .then(async (k) => {
            var banner = storage.ref("branchBanner/" + k.id);
            id = k.id;
            await banner.put(brandBanner);
            data.brandBanner = await banner.getDownloadURL();
            data.branchId = k.id;
            data.merchantId = merchant.value;
            k.update(data);
          });
      }
      setLoading(false);
      history.push({
        pathname: edit
          ? `/branch/edit/${id}/location`
          : `/branch/add/location/`,
        state: { id },
      });
    });
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <div className={classes.text}>Loading</div>
      </Backdrop>
      <h2>Basic Information</h2>

      {/* <div className="add_form_control-select">
        <p>
          <strong>Brand Name: </strong>
          {props.user.displayName}
        </p>
      </div> */}
      <div className="input_group">
        <label htmlFor="">Merchant Name</label>
        <Select
          className="form_input"
          type="text"
          value={merchant}
          options={merchantList}
          onChange={(e) => setMerchant(e)}
          isDisabled={props.user.role == "Merchant"}
        />
      </div>
      <div className="input_group">
        <label htmlFor="">Branch Name</label>
        <input
          className="form_input"
          type="text"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
        />
      </div>
      <div className="add_form_control-select">
        <label htmlFor="pDesc">Email</label>
        <CreatableSelect
          isClearable
          onChange={(e) => setBranchEmail(e)}
          isMulti
          value={branchEmail}
          options={branchEmail}
          className="basic-multi-select"
          classNamePrefix="select"
        ></CreatableSelect>
      </div>

      <div className="input_group">
        <label htmlFor="">Branch Contact</label>
        <input
          className="form_input"
          type="number"
          value={branchContact}
          onChange={(e) => setBranchContact(e.target.value)}
        />
      </div>
      <div className="input_group">
        <label htmlFor="">TimeZone</label>
        <Select
          onChange={(e) => setTimeZone(e)}
          options={tdata}
          classNamePrefix="select"
          isSearchable
          value={timeZone}
        ></Select>
      </div>
      <div className="add_form_control">
        <div className="cover__image">
          <p>Brand Banner</p>
          <div className="cover_image_control">
            <label
              className="coverImage"
              htmlFor="productImage"
              style={
                bannerPreview
                  ? {
                      backgroundImage: `url(${bannerPreview})`,
                      color: "rgba(0,0,0,0)",
                    }
                  : {}
              }
            >
              {!bannerPreview && (
                <p>
                  Drag and drop Branch Photo or <br /> browse to upload
                </p>
              )}

              {/* {!bannerPreview && (
								<p>
									Drag and drop Branch Photo or <br /> browse to upload
								</p>
							)} */}
            </label>

            <span>
              Max of 1 MB, at least 450x250 pixels and only JPEG and PNG are
              Allowed
            </span>
            <input
              className="productImageInput"
              name="productImage"
              id="productImage"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => onBannerChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="form_input_group">
        <div className="input_group tax_group">
          <label htmlFor="">Tax Rate %</label>
          <input
            className="form_input"
            type="number"
            value={texRate}
            onChange={(e) => setTextRate(e.target.value)}
          />
        </div>
        <div className="input_group btn_switch_parent">
          <label htmlFor="">Tax Status</label>
          <div className="form_input btn_switch_group">
            <input
              type="button"
              className={
                taxStatus === "Inclusive"
                  ? "btn_normal bg_light_blue"
                  : "btn_normal"
              }
              value="Inclusive"
              onClick={() => taxtBtnHandler("inclusive")}
            />
            <input
              type="button"
              className={
                taxStatus === "Exclusive"
                  ? "btn_normal bg_light_blue"
                  : "btn_normal"
              }
              value="Exclusive"
              onClick={() => taxtBtnHandler("exclusive")}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" className="btn_light_blue" onClick={submit}>
          Save Changes
        </button>
        <input type="button" className="btn_light_blue ml-2" value="Reset" />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapState)(BasicInfo);
