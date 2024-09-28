import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productDetail } from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import "./ProductDetail.css";

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product } = useSelector((state) => state.ProductDetail);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const AddCartHandler = () => {
    dispatch(addItemsToCart(id));
    alert.success("Items added Successfully");
  };

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <button
                disabled={product.Stock < 1 ? true : false}
                onClick={AddCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>

          <button className="submitReview">Submit Review</button>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
