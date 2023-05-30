import React, { useState, useEffect } from "react";
import BackupIcon from "@material-ui/icons/Backup";
import Backdrop from "@material-ui/core/Backdrop";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { imageToBase64 } from "../utils";
import Select from "react-select";
import db, { storage } from "../firebase";

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

const Merchant = ({ history, match }) => {
  const classes = useStyles();
  const [selectedgroups, setSelectedgroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState();
  const [groups, setgroups] = useState([{}]);
  const [grName, setgrName] = useState("");
  const [brName, setbrName] = useState("");
  const [brEmail, setbrEmail] = useState("");
  const [brOfficeNum, setbrOfficeNum] = useState("");
  const [brLogo, setbrLogo] = useState("");
  const [logo, setLogo] = useState();
  const [brBannerPreview, setbrBannerPreview] = useState(false);
  const [brBanner, setbrBanner] = useState("");
  const [brDocumentsPreview, setbrDocumentsPreview] = useState("");
  const [brDocuments, setbrDocuments] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState({});

  useEffect(() => {
    if (match?.params?.id) {
      getCurrentElemet();
    }
  }, []);
  const getCurrentElemet = async () => {
    setLoading(true);
    const id = match.params.id;
    const doc = await db.collection("Merchant").doc(id).get();
    let data = null;
    if (doc.exists) {
      data = doc.data();
      setbrName(data.brandName);
      setgrName(data.groupName);
      setLogo(data.logo);
      setbrDocuments(data.documents || []);
      setbrBanner(data.banner);
      setbrBannerPreview(data.banner);
      setbrLogo(data.logo);
      setbrEmail(data.brandEmail);
      setbrOfficeNum(parseInt(data.brandOfficeNumber));
      setEdit(true);
      setBrandToEdit({ id, ...data });
      setSelectedgroup(data.groupName);
      setgroups(data.groupName);
      console.log(data.documents);
    }
    setLoading(false);
  };
  const submit = () => {
    if (false) {
      alert("Please Fill the form properly");
    } else if (!isEdit) {
      setLoading(true);
      let nameId = brName.trim().toLowerCase()
      nameId = nameId.replaceAll(" ","-");
      db.collection("Merchant").doc(nameId)
        .set({
          groupName: selectedgroups,
          brandName: brName,
          brandEmail: brEmail,
          brandOfficeNumber: brOfficeNum,
        })
        .then(async (k) => {
          ;
          var banner = storage.ref("brandBanner/" + nameId);
          const logo = storage.ref("brandLogo/" + nameId);
          /* k.collection('branch').add({branchName:brName,branchLogo}) */
          const uploadedLogo = await logo.put(brLogo); //logo
          const logoLink = await uploadedLogo.ref.getDownloadURL();

          const uploadedBanner = await banner.put(brBanner); //banner
          const bannerLink = await uploadedBanner.ref.getDownloadURL();

          const documentsLinks = [];
          for (var i = 0; i < brDocuments.length; i++) {
            const documents = storage.ref("brandDocuments/" + nameId + "*" + i);
            const uploadedDocument = await documents.put(brDocuments[i]); //documents
            const documentLink = await uploadedDocument.ref.getDownloadURL();
            documentsLinks.push({name:brDocuments[i].name, url:  documentLink});
          }
          await db.collection("Merchant").doc(nameId).update({
            logo: logoLink,
            banner: bannerLink,
            documents: documentsLinks,
          });
          history.push("/view/merchant");
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else if (isEdit) {
      setLoading(true);
      const id = match.params.id;
      db.collection("Merchant")
        .doc(id)
        .update({
          groupName: selectedgroups,
          brandName: brName,
          brandEmail: brEmail,
          brandOfficeNumber: brOfficeNum,
        })
        .then(async () => {
          let logoLink = brLogo;
          let bannerLink = brBanner;
          if (brLogo.size) {
            const logo = storage.ref("brandLogo/" + id);
            const uploadedLogo = await logo.put(brLogo); //logo
            logoLink = await uploadedLogo.ref.getDownloadURL();
          }
          if (brBanner.size) {
            const banner = storage.ref("brandBanner/" + id);
            const uploadedBanner = await banner.put(brBanner); //banner
            bannerLink = await uploadedBanner.ref.getDownloadURL();
          }

          let newDocs = [];
          for (var i = 0; i < brDocuments.length; i++) {
            if (brDocuments[i].size) {
              const documents = storage.ref("brandDocuments/" + id + "*" + i);
              const uploadedDocument = await documents.put(brDocuments[i]); //documents
              const documentLink = await uploadedDocument.ref.getDownloadURL();
              newDocs.push(documentLink);
            }
          }
          await db
            .collection("Merchant")
            .doc(id)
            .update({
              logo: logoLink,
              banner: bannerLink,
              documents: [...brandToEdit.documents, ...newDocs],
            });
          history.push("/view/merchant");
          setLoading(false);
        });
    }
  };

  const onLogoChange = async (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      const size = file.size / 1024 / 1024;
      if (size <= 1) {
        const logo = await imageToBase64(file);
        setLogo(logo);
        setbrLogo(file);
      }
    }
  };

  const onBannerChange = async (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      const size = file.size / 1024 / 1024;
      if (size <= 1) {
        const banner = await imageToBase64(file);
        setbrBannerPreview(banner);
        setbrBanner(file);
      }
    }
  };
  const loadGroups = async (e) => {
    if (!isEdit) {
      var data = [];
      var d = await db.collection("Group").orderBy("groupName").get();
      d.forEach((element) => {
        var k = element.data();
        k["label"] = element.data().groupName;
        k["value"] = element.data().groupName;
        data.push(k);
      });
      setgroups(data);
    } else {
      setgroups(selectedgroups);
    }
  };

  const checkIfImage = name => {
    return name.endsWith(".jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".jpg")
  }

  const createBrandDocuments = async (e) => {
    const files = e.target.files;
    if (files?.length && brDocuments.length + files?.length <= 20) {
      const brdocs = [...brDocuments, ...files];
      const find = brdocs.find(
        (a) => checkIfImage(a.name)
      );
      if (find && !brDocumentsPreview) {
        const brDocumentsPreview = await imageToBase64(find);
        setbrDocumentsPreview(brDocumentsPreview);
      }else {
        setbrDocumentsPreview(null);
      }
      setbrDocuments(brdocs);
    }
  };

  const deleteDocument = async (index) => {
    try {
      const dcms = [...brDocuments];
      const id = match.params.id;
      const doc = dcms[index];
      dcms.splice(index, 1);
      if (doc.url) {
        setLoading(true);
        const docId = doc.url.substring(92, 114);
        await db.collection("Merchant").doc(id).update({ documents: dcms });
        const documents = storage.ref("brandDocuments/" + docId);
        await documents.delete();
        setLoading(false);
      }

      // make preview;
      const findIndex = dcms.findIndex((a)=> checkIfImage(a.name))
      if (findIndex >=0) {
        const file = dcms[findIndex]
        const preview = await imageToBase64(file)
        setbrDocumentsPreview(preview)
      }else {
        setbrDocumentsPreview(null)
      }

      setbrDocuments(dcms);
    } catch (e) {
      console.log("error");
      console.log(e);
      setLoading(false);
    }
  };

  const getBase64 = async (doc) => {
    if (checkIfImage(doc.name)) {
      const image = await imageToBase64(doc)
      return image;
    }
    return "UN"
  }

  const onChangeOfficeNumber = (value) => {
    const reg = /^\d+$/
    if (reg.test(value) || value ==="" || !value) {
      setbrOfficeNum(value)
    }
  }

  return (
    <div className="merchant_sign_up">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <div className={classes.text}>Loading</div>
      </Backdrop>
      <h3>{isEdit ? "Merchant Edit" : "Merchant Sign up"}</h3>

      <div className="add_menu_item_form">
        <div className="add_form_control-select">
          <label htmlFor="pDesc">Group Name</label>
          <Select
            onChange={(e) => setSelectedgroup(e)}
            onMenuOpen={loadGroups}
            options={groups}
            value={!isEdit ? selectedgroups : selectedgroups}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
          ></Select>
        </div>
        <div className="add_form_control">
          <label htmlFor="brName">Brand Name</label>
          <input
            type="text"
            id="brName"
            onChange={(e) => setbrName(e.target.value)}
            value={brName}
          />
        </div>
        <div className="add_form_control">
          <label htmlFor="brEmail">Brand Email</label>
          <input
            type="email"
            id="brEmail"
            onChange={(e) => setbrEmail(e.target.value)}
            value={brEmail}
          />
        </div>
        <div className="add_form_control">
          <label htmlFor="brOfficeNum">Brand Office number</label>
          <input
            type="text"
            id="brOfficeNum"
            onChange={(e) => onChangeOfficeNumber(e.target.value)}
            value={brOfficeNum}
          />
        </div>
        <div className="add_form_control">
          <div className="bran_logo cover__image">
            <p>Brand Logo</p>
            <div className="cover_image_control">
              <label
                className="brand_logo coverImage"
                htmlFor="productImage"
                style={logo ? { backgroundImage: `url(${logo})` } : {}}
              >
                {!logo && <BackupIcon />}
              </label>
              <span>
                Max of 1 MB, at least 250x250 pixels and only JPEG and PNG are
                Allowed
              </span>
              <input
                multiple="false"
                className="productImageInput"
                name="productImage"
                id="productImage"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => onLogoChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="add_form_control">
          <div className="cover__image">
            <p>Brand Banner</p>
            <div className="cover_image_control">
              <label
                className="coverImage"
                htmlFor="productImageBanner"
                style={
                  brBannerPreview
                    ? { backgroundImage: `url(${brBannerPreview})` }
                    : {}
                }
              >
                {!brBannerPreview && (
                  <p>
                    Drag and drop cover image or <br /> browse to upload
                  </p>
                )}
              </label>
              <span>
                Max of 1 MB, at least 450x250 pixels and only JPEG and PNG are
                Allowed
              </span>
              <input
                multiple="false"
                onChange={(e) => onBannerChange(e)}
                className="productImageInput"
                name="productImageBanner"
                id="productImageBanner"
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            </div>
          </div>
        </div>
        <div className="add_form_control">
          <div className="cover__image">
            <p>Brand documetns</p>
            <div className="cover_image_control">
              <label
                className="banner_doc coverImage "
                htmlFor="productImageDocuments"
                style={
                  brDocumentsPreview
                    ? {
                        backgroundImage: `url(${brDocumentsPreview})`,
                        color: "rgba(0,0,0,0)",
                      }
                    : {}
                }
              >
                Drag and drop Brand Documents or <br /> browse to upload
              </label>
              <span>
                Max 20 images/pdf/doc any format of the file upload section
              </span>
              <input
                onChange={(e) => createBrandDocuments(e)}
                className="productImageInput"
                name="productImageDocuments"
                id="productImageDocuments"
                type="file"
                multiple
              />
            </div>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className={classes.demo}>
                  <List>
                    {brDocuments.map((doc, index) => {
                      return (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar src={doc.url ? doc.url: getBase64(doc)} />
                          </ListItemAvatar>
                          <ListItemText primary={doc.name} />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteDocument(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <button className="btn_light_blue" onClick={submit}>
          {isEdit ? "Save" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

export default withRouter(Merchant);
