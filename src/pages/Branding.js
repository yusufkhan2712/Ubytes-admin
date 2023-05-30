import React, { useState } from "react";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import ModalPop from "../components/PopUp";
import { TextField } from "material-ui";

const Branding = () => {
  const [concept, setConcept] = useState("Italian Concept");
  const [baseColor, setBaseColor] = useState("#008bcc");
  const [textColor, setTextColor] = useState("#f4f4f4");
  const [widTitle, setWidTitle] = useState("Hello there");
  const [widMes, setWidMes] = useState("Order Online now!");
  const [subModal, setSubModal] = useState(false);
  const [plan] = useState([
    {
      name: "Single",
      price: "300",
      desc: [
        "Includes 300 orders/month Need extra orders?",
        "Includes 1 outlet",
      ],
    },
    {
      name: "Expansion",
      price: "600",
      desc: [
        "Includes 700 orders/month Need extra orders?",
        "Includes 5 outlet",
      ],
    },
    {
      name: "Chain",
      price: "1000",
      desc: [
        "Includes 1500 orders/month Need extra orders?",
        "Includes 10 outlet",
      ],
    },
  ]);

  const handleChange = (event) => {
    setConcept(event.target.value);
  };

  const modalClose = () => {
    setSubModal(false);
  };

  return (
    <div className="branding">
      <div className="branding__notification">
        <p>
          You have <strong>4 days</strong> left on your trial.
        </p>
        <button onClick={() => setSubModal(true)}>Subscribe now</button>
      </div>
      <div className="branding__sub__head">
        {subModal && (
          <ModalPop modalClose={modalClose}>
            <h2>Choose Your Plan</h2>
            <p>Your card will only be charged after your trial period ends</p>

            <div className="plan__parent">
              {plan.map((pl) => (
                <div className="plan__child">
                  <h4>{pl.name}</h4>
                  <h3>INR {pl.price}/mo</h3>
                  <ul>
                    {pl.desc.map((des) => (
                      <li>{des}</li>
                    ))}
                  </ul>
                  <button>Choose {pl.name}</button>
                </div>
              ))}
            </div>
            <div className="mod_for">
              Need more than 10 outlets or want to pay yearly?{" "}
              <a href="#">Contact us</a>
            </div>
          </ModalPop>
        )}
        <select value={concept}>
          <option value="Italian Concept">Italian Concept</option>
        </select>
        <div className="bran_sub_right">
          <div className="reminder">
            <span>New</span>
            <p>Drive orders with reactive reminder emails</p>
          </div>
          <div className="button__panel">
            <button>Preview your Store</button>
            <button>Copy</button>
          </div>
        </div>
      </div>
      <div className="branding__body">
        <div className="bran_body_left">
          <h2>Platform customization</h2>
          <p>
            Change the appearance of your ordering platform and make it look
            like your brand
          </p>
          <div className="cover__image">
            <p>Cover image</p>
            <div className="cover_image_control">
              <label className="coverImage" htmlFor="coverImage">
                Drag and drop cover image or <br /> browse to upload
              </label>
              <span>
                Max of 1 MB, at least 450x250 pixels and only JPEG and PNG are
                Allowed
              </span>
              <input
                className="coverImageInput"
                name="coverImage"
                id="coverImage"
                type="file"
              />
            </div>
          </div>
          <div className="color_control">
            <div className="input_control">
              <label htmlFor="baseColor">Base color</label>
              <div className="input__box">
                <input
                  type="color"
                  name="baseColor"
                  onChange={(e) => setBaseColor(e.target.value)}
                  id="baseColor"
                  value={baseColor}
                />
                <p className="colorCode">{baseColor}</p>
              </div>
            </div>
            <div className="input_control">
              <label htmlFor="textColor">Text color</label>
              <div className="input__box">
                <input
                  type="color"
                  name="textColor"
                  id="textColor"
                  onChange={(e) => setTextColor(e.target.value)}
                  value={textColor}
                />
                <p className="colorCode">{textColor}</p>
              </div>
            </div>
          </div>
          <div className="order_widget">
            <h4>Ordering widget</h4>
            <div className="order_widget_form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form__control">
                  <label htmlFor="ordTitle">
                    Title <span>20 characters</span>
                  </label>
                  <input
                    type="text"
                    id="ordTitle"
                    value={widTitle}
                    onChange={(e) => setWidTitle(e.target.value)}
                  />
                </div>
                <div className="form__control">
                  <label htmlFor="ordMes">
                    Message <span>65 characters</span>
                  </label>
                  <input
                    type="text"
                    id="ordMes"
                    value={widMes}
                    onChange={(e) => setWidMes(e.target.value)}
                  />
                </div>
                <div className="form__control">
                  <p>Icon Image</p>
                  <label className="widIconLab" htmlFor="widIcon">
                    <div className="icon">
                      <ModeCommentIcon />
                    </div>
                    <div>
                      <p> Drag and drop an image here or</p>
                      <span>browse your computer</span>
                      <p>to upload</p>
                    </div>
                  </label>
                  <input className="widIcon" type="File" id="widIcon" />
                </div>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
        <div className="branding__body__right">
          <h3>Prevew Panel</h3>
        </div>
      </div>
    </div>
  );
};

export default Branding;
