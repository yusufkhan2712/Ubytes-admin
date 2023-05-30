import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Dropdown(props) {
  const [opened, setState] = useState(props.visible);
  return (
    <div style={{display:'flex'}} onMouseLeave={()=>setState(false)} onMouseOver={()=>setState(true)}>
    {props.children}
      <div  className={opened?"drop-down-parent":"drop-down-parent-hidden"}>
       {props.items.map(item=>( <><Link to={item.route}><div className="dropdown-item">{item.name}</div></Link>
</>))}
      </div>
    </div>
  );
}

export default Dropdown;
