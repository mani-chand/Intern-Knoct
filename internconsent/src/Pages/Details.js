import React, { useState } from 'react';
import { useContract,useMetamask,useContractWrite, useContractRead,useAddress } from "@thirdweb-dev/react";
export default function Details(props) {
    const { contract } = useContract("0x9Fd8F93d97F7f38a7B776202E26D1fb05b32f6A9");
    const { mutateAsync: revokeConsent, isLoadingRevote } = useContractWrite(contract, "revokeConsent")
    const _ownerAddress = useAddress()
    const connect = useMetamask()
    const { data, isLoading } = useContractRead(contract, "verifyConsent", _ownerAddress)
    const handleConnect = ()=>{
        connect()
        console.log("connected")
        if(!isLoading){
            console.log("data",data)
        }
    }
    const handleRevoke = async()=>{
        try {
            const data = await revokeConsent();
            console.info("contract call successs", data);
          } catch (err) {
            console.error("contract call failure", err);
          }
    }
    return (
        <div>
            <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
            <button onClick={()=>{ handleConnect()}}>connect</button>
            </div>
            <div className='cards'  style={{marginTop:"25px",display:"flex",justifyContent:"center",alignContent:"center"}}>
            {(!isLoading)&&(data[0]!=="")?
            <div className="card">
            <div className="container">
            <h2><b>{data[0]}</b></h2> 
            <h4>{data[2]}</h4> 
            <h3>Isverified:{(data[6])?"True":"False"}</h3>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                <button className={(data[6])?"":"hide"} onClick={handleRevoke}>Revoke</button>
            </div>
            </div>:
            <p></p>}
            </div>
        </div>
    );
}

;