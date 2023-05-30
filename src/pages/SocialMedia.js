import React, { useEffect, useState } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import MessageIcon from "@material-ui/icons/Message";
import FacebookIcon from "@material-ui/icons/Facebook";
import { BusinessOutlined } from "@material-ui/icons";
import Header from "../components/header";
import Select from "react-select";
import db from "../firebase";
import { connect } from "react-redux";
<div className=""></div>;
function SocialMedia(props) {
  const [brands, setbrands] = useState("");
  const [branch, setbranch] = useState("");
  const [sbrand, setsbrand] = useState("");
  const [sbranch, setsbranch] = useState("");
  const [type, settype] = useState([]);
  const [isDism, setIsDism] = useState(false);
  const [mid, setMid] = useState(null);

  const loadGroups = async () => {
    var data = [];
    var d = await db.collection("Merchant").orderBy("brandName").get();
    d.forEach((element) => {
      var k = element.data();
      k["label"] = element.data().brandName;
      k["value"] = element.id;
      data.push(k);
    });
    setbrands(data);
  };

  const loadBranch = async () => {
    var data = [];
    if (props.role === "Merchant") {
      setMid(props.user.id);
    }
    var d = await db
      .collection("Merchant")
      .doc(props.user.id)
      .collection("Branches")
      .get();
    d.forEach((element) => {
      var k = element.data();
      k["label"] = element.data().branchName;
      k["value"] = element.id;
      data.push(k);
    });
    setbranch(data);
  };

  useEffect(() => {
    if (props.role === "Merchant") {
      setIsDism(true);
      setMid(props.user.id);
    } else {
      setIsDism(false);
    }
  }, []);

  useEffect(() => {
    loadGroups();
    loadBranch();
  }, []);

  const connect = (e) => {
    var url =
      "/orders/" +
      props.user.id +
      "/" +
      sbranch.value +
      "/" +
      type.value +
      "/" +
      e +
      "/" +
      1;
    props.history.push(url);
    window.location.reload();
  };

  return (
    <>
      <Header page="Social Media"></Header>
      <div className="social-media">
        <div className="social-navigation-body">
          <p>Website</p>
          <p>WhatsApp</p>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Messenger</p>
        </div>
        <div style={{ padding: "1%" }}>
          <p className="social-media-header">Sales Channel</p>
          <p className="social-media-header" style={{ color: "grey" }}>
            Increase sales and get more exposure by connecting ChatFood to your
            social media channels and your website.
          </p>
          <div>
            <p>
              Merchant: <strong>{props.user.displayName}</strong>
            </p>
          </div>
          <div
            style={{
              padding: 20,
              margin: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {!isDism && (
              <>
                <Select
                  isDisabled={isDism}
                  onChange={(e) => setsbrand(e)}
                  placeholder="Brand"
                  options={brands}
                ></Select>
              </>
            )}
            <Select
              onChange={(e) => setsbranch(e)}
              options={branch}
              placeholder="Branch"
              styles={{ width: "45%" }}
            ></Select>
          </div>
          <div
            style={{
              margin: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          ></div>
          <div style={{ margin: 10 }}>
            <Select
              onChange={(e) => settype(e)}
              placeholder="Type"
              options={[
                { value: "delivery", label: "Delivery" },
                { value: "pick-up", label: "Pickup" },
                { value: "dine-in", label: "Dine-in" },
              ]}
            ></Select>
          </div>
          <div className="social-media-body">
            <div className="social-box">
              <div className="social-box-inner-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                  }}
                >
                  {" "}
                  <div className="social-icon1"></div>
                  <p>Website Ordering</p>
                </div>
                <button onClick={() => connect("website")}>Connect</button>
              </div>
              <p>
                Add ubytes on your website and allow customers to<br></br> order
                from your business while browsing your page!
              </p>
              <p style={{ color: "grey" }}>Need Help?</p>
            </div>
            <div className="social-box">
              <div className="social-box-inner-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                  }}
                >
                  {" "}
                  <div className="social-icon1">
                    <InstagramIcon></InstagramIcon>
                  </div>
                  <p>Instagram</p>
                </div>
                <button onClick={() => connect("instagram")}>Connect</button>
              </div>
              <p>
                {" "}
                Let customers quickly place their orders directly from your
                restaurant's Instagram profile and stories.{" "}
              </p>
              <p style={{ color: "grey" }}>Need Help?</p>
            </div>
            <div className="social-box">
              <div className="social-box-inner-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                  }}
                >
                  {" "}
                  <div className="social-icon1">
                    <WhatsAppIcon></WhatsAppIcon>
                  </div>
                  <p>WhatsApp</p>
                </div>
                <button onClick={() => connect("whatsapp")}>Connect</button>
              </div>
              <p>
                {" "}
                Use WhatsApp Business to invite customers to check your menu on
                ChatFood and place their orders with a few clicks.{" "}
              </p>
              <p style={{ color: "grey" }}>Need Help?</p>
            </div>
            <div className="social-box">
              <div className="social-box-inner-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                  }}
                >
                  {" "}
                  <div className="social-icon1">
                    <FacebookIcon></FacebookIcon>
                  </div>
                  <p>Facebook</p>
                </div>
                <button onClick={() => connect("facebook")}>Connect</button>
              </div>
              <p>
                {" "}
                Now you can add a "Shop now" link on your restaurant's Facebook
                page that goes straight to your ordering menu!{" "}
              </p>
              <p style={{ color: "grey" }}>Need Help?</p>
            </div>
            <div className="social-box">
              <div className="social-box-inner-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                  }}
                >
                  {" "}
                  <div className="social-icon1">
                    <MessageIcon></MessageIcon>
                  </div>
                  <p>Messenger</p>
                </div>
                <button>Connect</button>
              </div>
              <p>
                {" "}
                You can add ChatFood's bot on your outlet's Facebook page. That
                way, customers can order meals directly on Messenger!{" "}
              </p>
              <p style={{ color: "grey" }}>Need Help?</p>
            </div>
            <div className="social-box">
              <div className="social-box-inner-row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                  }}
                >
                  {" "}
                  <div className="social-icon1">
                    <BusinessOutlined></BusinessOutlined>
                  </div>
                  <p>Google My Business</p>
                </div>
                <button onClick={() => connect("google-business")}>
                  Connect
                </button>
              </div>
              <p>
                {" "}
                When searching for your outlet on Google, customers might decide
                to order online. With your ChatFood link enabled, they can!{" "}
              </p>
              <p style={{ color: "grey" }}>Need Help?</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapState = (state) => {
  return {
    user: state.user.user,
    role: state.user.role,
  };
};

export default connect(mapState)(SocialMedia);
