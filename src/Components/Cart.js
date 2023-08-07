import React, { useEffect, useState } from 'react';
import "./Styles.css"
import { ethers } from 'ethers';
const Cart = (props) => {
  const [gasFee, setGasFee] = useState(0);
  const [paystaus,Setpaystatus] = useState();
  useEffect(()=>{
    const handler = async(e) =>{
      try {
        const amount = { value: ethers.utils.parseUnits(props.TotalPayment.toString(),18)};
        const gasLimit = await props.contract.estimateGas.BuyProducts(Object.keys(props.items),amount);
        const gasPrice = await props.contract.provider.getGasPrice();
        const transactionFee = gasLimit * gasPrice;
        setGasFee(transactionFee.toString())
      } catch (e) {
        console.log(e);
      }
  }
  console.log(props.items)
  props.contract && handler()
  },[props.contract,props.items])
  
  const handler = async(e,price) => {
    e.preventDefault();
    try{
      const amount = { value: ethers.BigNumber.from("1000")}; 
      console.log(amount);
      const productIDs = Object.keys(props.items);
      const transaction = await props.contract.BuyProducts(productIDs,amount);
      Setpaystatus("Please wait ...");
      await transaction.wait();
      props.setItem({});
      props.setTotalPayment(0);
      Setpaystatus("");
      alert("Payment Successfull");
      props.setTrigger(false);
    }catch(e){
      Setpaystatus("");
      console.log(e);
      alert("Payment failed try again..")
    }
  };
  return(props.trigger) ?( props.TotalPayment!==0 ?
  <div className="outer">
  <h3>MY CART</h3>
  <div className="inner">
    {props.items && Object.entries(props.items).map(([ProductID,[nftname,imageUrl,price]], index) => (
      <div className="Productitem" key={index}>
        <div className="productbody">
          <center>
            <img src={imageUrl} width="260px" height="200px" alt="Product"/>
            <p>{nftname}</p>
            <p><b>Price: {price} Wei</b></p>
          </center>
        </div>
      </div>
    ))}
  </div><br/>
  <center><p><b>Total Cost : {props.TotalPayment} Wei+{gasFee} Wei (Est gas fee)</b></p></center>
  <center><button onClick={(e)=>{handler(e,props.TotalPayment)}} class="btn btn-dark">PAY</button></center><br/>
  <center><button onClick={()=>props.setTrigger(false)} class="btn btn-danger">close</button></center>
</div>
  :<div><center><h3 class="cartstatus">Your cart is Empty</h3><br/><button onClick={()=>props.setTrigger(false)} class="btn btn-danger">close</button></center></div>):"";
};
export default Cart;
