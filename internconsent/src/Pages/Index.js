import React,{useState} from 'react';
import { useContract,useMetamask,useContractWrite } from "@thirdweb-dev/react";
export default function Index() {
  const [data,setData] = useState({
    Name:"",
    Age:"",
    Email:"",
    Mobile:"",
    Aadhar:"",
    Pan:"",
  })
  const { contract } = useContract("0x9Fd8F93d97F7f38a7B776202E26D1fb05b32f6A9");
  const { mutateAsync: giveConsent} = useContractWrite(contract, "giveConsent")
  const connect = useMetamask()
  
  const handleSubmit = async()=>{
    try {
      const res = await giveConsent([data.Name,data.Age,data.Email,data.Mobile,data.Aadhar,data.Pan]);
      window.location.replace('/details')
      console.info("contract call successs", res);
      setData({
      Name:"",
      Age:"",
      Email:"",
      Mobile:"",
      Aadhar:"",
      Pan:"",
    })

    } catch (err) {
      console.error("contract call failure", err);
    }

  }
    return (
      <div>
        <div className='Navbar'>
          <div>
              <h1 className='Header'>Consent Application</h1>
          </div>
          <div>
          <button className="metaMask" onClick={()=>{connect()}}>connect</button>
          </div>
        </div>
        <div className="Form">
          <div>
            <h1>Fill the Details</h1>
          </div>
          <div className="Name-div form-div">
            <label>Name</label>
            <input
            type="text"
            name="Name"
            className='inputFiled'
            placeholder='Name'
            onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}
            />
          </div>
          <div className="email-div form-div">
            <label>Email</label>
            <input
            type="email"
            name="Email"
            className='inputFiled'
            placeholder='Email'
            onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
          </div>
          <div className="Age-div form-div">
            <label>Age</label>
            <input
            type="Number"
            name="Age"
            className='inputFiled'
            placeholder='Age'
            onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
          </div>
          <div className="Age-div form-div">
            <label>Mobile</label>
            <input
            type="Number"
            max = "10"
            min = "10"
            name="Mobile"
            className='inputFiled'
            placeholder='Mobile Number'
            onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
          </div>
          <div className="Aadhar-div form-div">
            <label>Aadhar</label>
            <input
            type="Number"
            name="Aadhar"
            max = "12"
            min = "12"
            className='AadharNumber'
            placeholder='AadharNumber'
            onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
          </div>
          <div className="Pan-div form-div">
            <label>Pan</label>
            <input
            type="text"
            name="Pan"
            className='inputFiled'
            placeholder='PanNumber'
            onChange={(e)=>{setData({...data,[e.target.name]:e.target.value})}}/>
          </div>
          <button onClick={()=>{handleSubmit()}}>submit</button>
        </div>
      </div>
    );
}
