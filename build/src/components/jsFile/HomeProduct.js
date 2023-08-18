import React, { useEffect } from "react";
import classes from "../cssFile/HomeProduct.module.css";
import { Link } from "react-router-dom";
import ModalComp from "./Modal"


import { useState } from "react";

import nail1 from "../Assets/nail5.jpg";
import nail2 from "../Assets/nail2.jpg";
import nail3 from "../Assets/nail3.jpg";
import nail4 from "../Assets/nail4.jpg";
import axios from "axios";

// const product = [
//   {
//     img: nail1,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 3",
//     details: {
//       price: "100 $",
//       item: "jsnkjskj msmnjs",
//       prduct: "snks skjsk a",
//       size: "1 inch",
//     },
//   },
//   {
//     img: nail2,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 3",
//     details: {
//       price: "100 $",
//       item: "jsnkjskj msmnjs",
//       prduct: "snks skjsk a",
//       size: "1 inch",
//     },
//   },
//   {
//     img: nail3,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: {
//       price: "100 $",
//       item: "jsnkjskj msmnjs",
//       prduct: "snks skjsk a",
//       size: "1 inch",
//     },
//   },
//   {
//     img: nail4,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: {
//       price: "100 $",
//       item: "jsnkjskj msmnjs",
//       prduct: "snks skjsk a",
//       size: "1 inch",
//     },
//   },
//   {
//     img: nail3,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: {
//       price: "100 $",
//       item: "jsnkjskj msmnjs",
//       prduct: "snks skjsk a",
//       size: "1 inch",
//     },
//   },
//   {
//     img: nail4,
//     description:
//       "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 2",
//     details: {
//       price: "100 $",
//       item: "jsnkjskj msmnjs",
//       prduct: "snks skjsk a",
//       size: "1 inch",
//     },
//   },
// ];

 

// Features:

// Tough construction
// Lightweight
// Constant performance

const Product = () => {
  const url=process.env.REACT_APP_SERVICE_ID
   const [product,setProduct]=useState()
  const [show, setShow] = useState(false)
  useEffect(()=>{
    axios.get(url+"jsonData").then((res)=>{
      setProduct(res.data)
    })
 },[])



const onInterested = ()=>{
  setShow(true)
} 

  console.log(product, "pro");
  return (
    <div className={classes.product}>
      <div className={classes.gridContainer}>
        {product?.map((product, index) => (
          <div className={classes.productCard} key={index}>
            <div className={classes.gridItem}>
              <div className={classes.productBox}>
                <div className={classes.productBoximg}>
                  <img src={url+`productimg/${product?.productId}` }alt="" width="300px" height="200px" />
                </div>

                <div className={classes.productBoxdetail}>
                  <h2>Product Details:</h2>

                  <div className={classes.tableContainer}>
                    <table className={classes.admTable}>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Material</th>
                        <td className={classes.admtd}>{product?.product}</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Size</th>
                        <td className={classes.admtd}>{product?.size} Inch</td>
                      </tr>
                      <tr className={classes.admTable}>
                        <th className={classes.admth}>Packaging Size</th>
                        <td className={classes.admtd}>{product?.size} Kg</td>
                      </tr>
                    </table>
                  </div>

                
                </div>
              </div>
              <div className={classes.productBoxDescription}>
                <p>{product.description}</p>
                <div className={classes.btnContainer}>
                  <button onClick={()=> onInterested()}>Yes! I am Interestaed</button>
                  {/* <button >Read More</button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.btnDiv}>
        <Link to="/product">
          <button className={classes.btn}>More Product</button>
        </Link>
      </div>

      <div>
        { show &&
        <ModalComp  show={show} setShow={setShow} />

        }
      </div>

    </div>
  );
};

export default Product;
