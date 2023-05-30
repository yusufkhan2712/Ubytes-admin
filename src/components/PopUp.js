import "./PopUp.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";

const PopUp = (props) => {
  return (
    <div className="modal__parent" style={props.style}>
      <div className="modal__backdrop"></div>

      <div className="modal__body">
        <div className="modal__close">
          <IconButton onClick={props.modalClose}>
            <CancelIcon className="modal_close_btn" />
          </IconButton>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default PopUp;
