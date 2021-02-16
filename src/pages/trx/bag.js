// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/navbar";
// import { Link } from "react-router-dom";
// import { connect, useSelector } from "react-redux";
// import { Alert } from "react-bootstrap";
// import "./bag.css";
// import {
//   removeFromCart,
//   pickCart,
//   plusQty,
//   minQty,
//   clearCart,
// } from "../../redux/actions/cart";
// import Bag from "../../components/trx/bag";

// const Cart = ({ cart, removeFromCart, pickCart, plusQty, minQty }) => {
//   const pick = useSelector((state) => state.cart.cart);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalItems, setTotalItems] = useState(0);

//   const toPrice = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//   };

//   if (pick.length !== 0) {
//     pick.map((item) =>
//       console.log("piked " + pick.indexOf(item) + " " + item.pick)
//     );
//   }
//   useEffect(() => {
//     let items = 0;
//     let price = 0;

//     cart.forEach((item) => {
//       if (item.pick) {
//         items += item.qty;
//         price += item.qty * item.price;
//       }
//     });

//     setTotalItems(items);
//     setTotalPrice(price);
//   }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

//   let data = [totalPrice, totalItems];

//   console.log(cart.length);

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h1 style={{ marginTop: "20px" }}>My Bag</h1>
//         <div className="CartWrapper">
//           <div className="BagWrapper">
//             {cart.length === 0 ? (
//               <h1>Your Bag is empty</h1>
//             ) : (
//               cart.map((item) => {
//                 return (
//                   <Bag
//                     key={item.id}
//                     name={item.name}
//                     brand={item.brand}
//                     image={item.image}
//                     price={item.price}
//                     remove={() => removeFromCart(item.id)}
//                     picked={() => pickCart(item.id)}
//                     min={() => minQty(item.id)}
//                     plus={() => plusQty(item.id)}
//                     qty={item.qty}
//                   />
//                 );
//               })
//             )}
//           </div>
//           {cart.length === 0 ? null : (
//             <div className="SummaryCard">
//               <p style={{ fontSize: "16px", fontWeight: "600" }}>
//                 Shopping Summary
//               </p>
//               <div className="TotalPrice">
//                 <p
//                   style={{
//                     fontSize: "16px",
//                     fontWeight: "500",
//                     color: "#9B9B9B",
//                   }}
//                 >
//                   Total price
//                 </p>
//                 <p style={{ fontSize: "18px", fontWeight: "600" }}>
//                   Rp. {toPrice(totalPrice)}
//                 </p>
//               </div>
//               <Link
//                 to={{
//                   pathname: "/checkout",
//                   data: data,
//                 }}
//                 type="button"
//                 className="btn btn-danger BuyBtn"
//               >
//                 Checkout
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cart.cart,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeFromCart: (id) => dispatch(removeFromCart(id)),
//     pickCart: (id) => dispatch(pickCart(id)),
//     plusQty: (id) => dispatch(plusQty(id)),
//     minQty: (id) => dispatch(minQty(id)),
//     clearCart: () => dispatch(clearCart()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
