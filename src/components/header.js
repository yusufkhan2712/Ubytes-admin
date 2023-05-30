import React from "react";

function Header(props) {
  return (
    <div className="header-top">
      {props.liveorders?props.element:<div className="header-nav">
        {props.liveorders?null:<p style={{fontSize:'small'}}>{props.page}</p>}
      </div>}
    </div>
  );
}

export default Header;
