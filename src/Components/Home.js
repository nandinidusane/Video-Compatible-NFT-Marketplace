import React, { useEffect, useState} from 'react';
import './Styles.css';
import Cart from './Cart';
import Mint from './Mint'
import MyProducts from './MyProducts';
const Home = (props) => {
  const [items,setItems] = useState({});
  const [total,setTotal] = useState(0);
  const [pop,setPop] = useState(false);
  const [pop2,setPop2] = useState(false);
  const [pop3,setPop3] = useState(false);
  const [product,setProduct] = useState({})
  const [ProductPrices,setProductPrices] = useState({})
  useEffect(()=>{
    const getProductValues = async () => {
      try{
        const data = await props.contract.GetAllProducts();
        console.log(data)
        for (let i = 0; i <data.length; i++) {  
          const ProductID = data[i][0].toString()
          const videoUrl = data[i][1];
          const seller = data[i][3];
          const price =data[i][4].toString();
          const status = data[i][5];
          const nftname = data[i][6].toString();
          setProduct((prevProduct) => ({
            ...prevProduct,
          [ProductID]: [nftname,videoUrl,price,status,seller]
        }));
        console.log(product);
      }
      }catch(e){
        console.log(e); 
      }
    };
    props.contract && getProductValues();
    console.log(total);
    console.log()
    console.log(props.contract)
  },[props.contract,total]);
  const handleBuyClick = (nftname,price,videoUrl,ProductID) => {
      setItems((prevCart) => ({
        ...prevCart,
      [ProductID]: [nftname,videoUrl,price],
    }));
    setTotal(total+parseInt(price));  
  }
  return (
    <div>
      <div className="header">
        <a href="#deftault" className="logo">NFT MarketPlace</a>

        <div className="header-right">
          <a onClick={()=>{setPop3(true);setPop(false);setPop2(false)}}>MY NFTS</a>
          <a onClick={()=>{setPop2(true);setPop(false);setPop3(false)}}>UPLOAD NFT</a>
          <a onClick={()=>{setPop(true);setPop2(false);setPop3(false)}}>CART</a>
        </div>
      </div>
      <Mint trigger ={pop2}  setTrigger={setPop2} contract = {props.contract} account={props.account} >

      </Mint>
      <MyProducts trigger = {pop3} setTrigger={setPop3} contract={props.contract} account={props.account}>

      </MyProducts>
      <Cart trigger={pop} setTrigger={setPop} cartItems={items} Products = {product} items ={items} setProducts={setProduct} setItem={setItems} TotalPayment ={total} setTotalPayment={setTotal} contract = {props.contract} account={props.account}>

      </Cart>
      {pop === false && pop2 == false && pop3 == false?
      <div className="outer">
      <center><a>CONNECTED TO: {props.account}</a></center><br/>
        <h3>LIVE NFTS</h3>
        <div className="inner">
          {Object.entries(product).map(([ProductID,[nftname,videoUrl,price,status,seller]], index) => (
            status == false ?"":
            <div className="Productitem" key={index}>
              <div className="productbody">
                <center>
                  <video src={videoUrl} width="260px" height="150px" alt="Product" />
                  <p>{nftname}</p>
                  <span><b>{seller}</b></span>
                  <p><b>Price: {price} Wei</b></p>
                  <button onClick={() => {handleBuyClick(nftname,price,videoUrl,ProductID);alert("Added to Cart")}} class="btn btn-dark">BUY</button>
                </center>
              </div>
            </div>
          ))}
        </div>
      </div> : ""}
    </div>
  );
};
export default (Home);
