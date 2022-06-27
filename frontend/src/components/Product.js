import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props; // === props.product
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>$ {product.price}</strong>
        </Card.Text>
        {product.countInStock > 0 ? (
          <Button variant="warning">Add to cart</Button>
        ) : (
          <Button variant="danger" disabled>
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
