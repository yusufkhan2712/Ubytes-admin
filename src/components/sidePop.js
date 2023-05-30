import React,{useEffect,useState} from 'react'
import './PopUp.css'
export default function Sidepop(props) {
   
    return (
        <div className={props.visible?"sidepop-body":"hidden"} >
            <div className="side-inner">
                <img src="https://e7.pngegg.com/pngimages/930/741/png-clipart-round-green-check-mark-illustration-check-mark-bottle-material-green-tick-miscellaneous-angle.png"></img><p>{props.text}</p>
            </div>
        </div>
    )
}
