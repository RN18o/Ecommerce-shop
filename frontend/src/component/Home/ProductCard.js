// import React from "react";
// import { Link } from "react-router-dom";
// import ReactStarts from "react-rating-stars-component";
// const ProductCard = ({ product }) => {
//   const options = {
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };
//   return (
//     <Link className="productCard" to={`/product/${product._id}`}>
//       <img src={product.images[0].url} alt={product.name} />
//       <p>{product.name}</p>
//       <div>
//         {/* <Rating {...options} />{" "} */}
//         <ReactStarts {...options} />

//         <span className="productCardSpan">
//           {" "}
//           ({product.numOfReviews} Reviews)
//           {/* ( 256 Reviews) */}
//         </span>
//       </div>
//       <span>{`₹${product.price}`}</span>
//       {/* <span>{product.price}</span> */}
//     </Link>
//   );
// };

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStarts {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
