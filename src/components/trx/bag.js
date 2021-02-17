import React from "react";
import "./bag.css";
// import SampleImage from "../../assets/images/men-shirt.png";

const Bag = ({ image, name, brand, price, remove, picked, min, plus, qty }) => {
  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className="ProductCart">
        <div className="ProductWrapper">
          <input
            className="FormCheck"
            type="checkbox"
            value=""
            onChange={picked}
            id="flexCheckDefault"
            style={{ alignSelf: "center" }}
          />
          <div className="ImageWrapper">
            <img src={image} className="ProductImg" alt="product" />
          </div>
          <div className="ProductInfo">
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{name}</p>
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
            type="button"
            onClick={min}
            className="btn btn-light BtnCounter"
          >
            <i className="fas fa-minus"></i>
          </button>
          <p style={{ margin: "8px 10px" }}>{qty}</p>
          <button
            type="button"
            onClick={plus}
            className="btn btn-light BtnCounter"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="TotalPrice">
          <div
            className="TrashIcon"
            data-toggle="modal"
            data-backdrop="false"
            data-target=".remove-modal"
          >
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

      {/* modal */}
      <div
        class="modal remove-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you sure want to remove?</h5>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button type="button" class="btn btn-danger" onClick={remove}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bag;
