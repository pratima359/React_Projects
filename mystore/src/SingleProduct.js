import styled from "styled-components";
import { useSingleProductContext } from "./context/singleproductcontext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PageNavigation from "./components/PageNavigation";
import { Container } from "./styles/Container";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import MyImage from "./components/MyImage";
import { NumberIntoIndianCurrency } from "./funtionsutility";
import { useState } from "react";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";

const apiForSingleProduct = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { id } = useParams();

  const { getSingleProduct, singleProduct, isLoading } =
    useSingleProductContext();
  console.log(
    "🚀 ~ file: SingleProduct.js:10 ~ SingleProduct ~ singleProduct:",
    singleProduct
  );

  //destructure of singleProduct
  const {
    category,
    colors,
    company,
    description,
    image,
    name,
    price,
    review,
    stars,
    stock,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${apiForSingleProduct}?id=${id}`);
  }, []);

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={image} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{name}</h2>
            <Star stars={stars} review={review} />
            <p className="product-data-price">
              MRP:
              <del>{NumberIntoIndianCurrency(price + 300000)}</del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: {NumberIntoIndianCurrency(price)}
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p> Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {id} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr />
            {stock && <AddToCart sProduct={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default SingleProduct;

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;
