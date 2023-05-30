import React from 'react'

function DashboardBlock(props) {
    return (
        <div className="dashboard-block">
<div className="dashboard-block-top"><p>{props.header}</p></div>
<div className="dashboard-content-item">
<p>{props.quantity}</p><p style={{fontSize:'small',fontWeight:'10',color:'grey'}}>{props.unit}</p>
</div>
        </div>
    )
}

export default DashboardBlock
