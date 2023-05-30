import { TextField } from "material-ui";


import React, { Component } from 'react';
import Select from "react-select";
import db, { storage } from "../firebase";

export default class Combo extends Component {
  constructor(props){
    super(props)
    this.state={options:  [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ],branch:[{}],productName:'',productDescription:'',productPrice:0,singleTag:'',additionalItems:[{name:'',quantity:0,price:0}]}
  this.loadMerchant=this.loadMerchant.bind(this)
  this.loadBranch=this.loadBranch.bind(this)
  this.loadMenu=this.loadMenu.bind(this)
  this.submit=this.submit.bind(this)
    }

  async loadMerchant(){
  var k=[]
    var data=await db.collection('Merchant').get()
  data.forEach(el=>{
  var _=el.data()
  _['value']=el.data().brandName
_['label']=el.data().brandName
k.push(_)
})
this.setState({options:k})  
}
async loadBranch(){
  var k=[]
  var data=await db.collection('Branches').get()
data.forEach(el=>{
var _=el.data()
_['value']=el.data().branchName
_['label']=el.data().branchName
k.push(_)
})
this.setState({branch:k}) 
}

async componentDidMount(){
  if(this.props.match.params.id){
    var data=await db.collection('comboItems').doc(this.props.match.params.id).get()
    this.setState(data.data())
  }
}
async loadMenu(){
  var k=[]
  var data=await db.collection('products').get()
  data.forEach(el=>{
    var _=el.data()
    _['value']=el.data().productName
  _['label']=el.data().productName
  k.push(_)
  })
  this.setState({menu:k})  

}

async submit(){
 // 
 if(this.props.match.params.id){
 var id= this.props.match.params.id
 console.log(id)
  await db.collection('comboItems').doc(id).update({comboName:this.state.comboName,merchant:this.state.merchant,branch:this.state.branch,comboItems:this.state.comboItems,productPrice:this.state.productPrice,productDescription:this.state.productDescription})
   
 }else
 {await db.collection('comboItems').add({comboName:this.state.comboName,merchant:this.state.merchant,branch:this.state.branch,comboItems:this.state.comboItems,productPrice:this.state.productPrice,productDescription:this.state.productDescription}).then(async k=>{
   var ref=await storage.ref('comboImage/'+k.id)
  var url=await (await ref.put(this.state.comboImage)).ref.getDownloadURL()
  k.update({comboImage:url,})
 })}
//db.collection('resData').doc('3U2YUz3s95EhAJVtkFzv').collection('products').add(this.state)
}
  render() {
    return (
      <div className="add_menu_item">
        <h3>Add Combo</h3>
        <div className="add_menu_item_form">
          <div className="add_form_control">
            <label htmlFor="pName">Combo Name</label>
            <input
              type="text"
              id="pName"
              onChange={(e) => this.setState({comboName:e.target.value})}
              value={this.state.comboName}
            />
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Merchant</label>
           <Select options={this.state.options}
      onFocus={this.loadMerchant}
      value={this.state.merchant}
      onChange={(e)=>this.setState({merchant:e})}
        isMulti  className="basic-multi-select"
        classNamePrefix="select"></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Branch</label>
           <Select options={this.state.branch}
      onFocus={this.loadBranch}
      value={this.state.branch}
      onChange={(e)=>this.setState({branch:e})}
        isMulti  className="basic-multi-select"
        classNamePrefix="select"></Select>
          </div>
          <div className="add_form_control-select">
            <label htmlFor="pDesc">Combo Items</label>
           <Select options={this.state.comboItems}
      onFocus={this.loadMenu}
      value={this.state.comboItems}
      onChange={(e)=>this.setState({comboItems:e})}
        isMulti  className="basic-multi-select"
        classNamePrefix="select"></Select>
          </div>
          <div className="add_form_control">
            <div className="cover__image">
              <p>Combo image</p>
              <div className="cover_image_control">
                <label className="coverImage" htmlFor="productImage">
                  Drag and drop cover image or <br /> browse to upload
                </label>
                <span>
                  Max of 1 MB, at least 450x250 pixels and only JPEG and PNG are
                  Allowed
                </span>
                <input
                onChange={(e)=>this.setState({comboImage:e.target.files[0]})}
                  className="productImageInput"
                  name="productImage"
                  id="productImage"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="add_form_control">
            <label htmlFor="pDesc">Combo Description</label>
            <textarea
              type="text"
              id="pDesc"
              onChange={(e) =>this.setState({productDescription:e.target.value})}
              value={this.state.productDescription}
            />
          </div>
          <div className="add_form_control">
            <label htmlFor="pPrice">Combo Price</label>
            <input
              type="number"
              id="pPrice"
              onChange={(e) => this.setState({productPrice:e.target.value})}
              value={this.state.productPrice}
            />
          </div>
       
      
       
          <button onClick={this.submit}>Save</button>
        </div>
      </div>
    );
  }
}




