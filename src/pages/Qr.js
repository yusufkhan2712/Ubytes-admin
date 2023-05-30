import React, { Component } from "react";
import QRCode from "qrcode.react";
import Select from "react-select";
import db from "../firebase";

export default class Qr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchId: "",
      options: [{}],
      startRange: 1,
      endRange: 2,
      qrra: [{ id: "1" }],
    };
    this.loadBranch = this.loadBranch.bind(this);
  }
  async loadBranch() {
    var data = await db.collection("Branches").get();
    var data_ = [];
    data.forEach((k) => {
      var _ = k.data();
      _["value"] = k.data().branchId;
      _["label"] = k.data().branchName;
      data_.push(_);
    });
    this.setState({ options: data_ });
  }
  componentDidMount() {
    this.loadBranch();
  }
  qr_ = () => {
    var data = [];

    for (
      let index = this.state.startRange;
      index <= this.state.endRange;
      index++
    ) {
      var table = index.toString();
      console.log(this.state.selectedBranch.branchId);
      data.push({
        id:
          "https://dashboard-ubytes.web.app/" +
          this.state.selectedBranch.branchId +
          "/" +
          table,
      });
    }
    console.log(data);
    this.setState({ qrra: data });
  };

  downloadQR = (id,index) => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "image-qr.png"
    if (this.state.selectedBranch.branchId) {
      /* let data=sessionStorage.getItem('branchData')
      data=JSON.parse(data) */
      downloadLink.download = `${this.state.selectedBranch.branchName}-${index}.png`;
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  render() {
    return (
      <div className="qr-body">
        <Select
          onChange={(e) => this.setState({ selectedBranch: e })}
          placeholder="Enter Branch id here"
          options={this.state.options}
        ></Select>
        <div className="qr-row">
          {" "}
          <input
            type="number"
            onChange={(e) =>
              this.setState({
                startRange: e.target.value <= 1 ? 1 : e.target.value,
              })
            }
            value={this.state.startRange}
          ></input>
          <input
            type="number"
            onChange={(e) =>
              this.setState({
                endRange: e.target.value <= 1 ? 1 : e.target.value,
              })
            }
            value={this.state.endRange}
          ></input>
          <button onClick={this.qr_}>Generate</button>
        </div>
        <div className="qr-grid">
          {this.state.qrra.map((k, index) => (
            <div key={index} className="qr-section">
              {k.id}
              <QRCode
                imageSettings={{ width: 220, height: 220 }}
                value={k.id}
                size={220}
                id={k.id}
              ></QRCode>{" "}
              <a onClick={() => this.downloadQR(k.id,index)}> Download QR </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
