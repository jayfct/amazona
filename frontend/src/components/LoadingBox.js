import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingBox = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
      {/* if spinner from bootstrap cant load, it will show "loading..." */}
    </Spinner>
  );
};

export default LoadingBox;
