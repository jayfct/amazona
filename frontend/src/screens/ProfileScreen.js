import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import { toast } from "react-toastify";
import { Store } from "../store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        "api/users/profile",
        { name, email, password },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User profile updated successfully");
    } catch (err) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <FormGroup className="mb-3" controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="password">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileScreen;
