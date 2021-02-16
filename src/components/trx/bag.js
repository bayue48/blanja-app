import React from "react";

import "./bag.css";
// import SampleImage from "../../assets/images/men-shirt.png";

const Bag = ({
  image,
  name,
  brand,
  price,
  remove,
  picked,
  min,
  plus,
  qty,
}) => {
  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className="ProductCart">
        <div className="ProductWrapper">
          <input
            className="form-check-input FormCheck"
            type='checkbox'
            value=''
            onChange={picked}
            id='flexCheckDefault'
            style={{ alignSelf: "center" }}
          />
          <div className="ImageWrapper">
            <img src={image} className="ProductImg" alt='product' />
          </div>
          <div className="ProductInfo">
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              {name}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#9B9B9B",
              }}
            >
              {brand}
            </p>
          </div>
        </div>

        <div className="Counter">
          <button
            type='button'
            onClick={min}
            className="btn btn-light BtnCounter"
          >
            <i className='fas fa-minus'></i>
          </button>
          <p style={{ margin: "8px 10px" }}>{qty}</p>
          <button
            type='button'
            onClick={plus}
            className="btn btn-light BtnCounter"
          >
            <i className='fas fa-plus'></i>
          </button>
        </div>

        <div className="TotalPrice">
          <div className="TrashIcon" onClick={remove}>
            <p style={{ color: "red" }}>Delete</p>
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#222222",
            }}
          >
            Rp. {toPrice(price)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Bag;