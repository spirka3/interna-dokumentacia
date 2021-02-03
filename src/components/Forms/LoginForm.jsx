import React from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "../Others/ErrorMessage";
import Container from "react-bootstrap/Container";

const LoginForm = ({onSubmit, language, changeLanguage, loginError}) => {

  const {register, handleSubmit} = useForm();

  const active = (id) => {
    return language === id && 'active';
  }

  return (
    <Container className="d-flex justify-content-center" style={{marginTop: "8rem"}}>
      <Form onSubmit={handleSubmit(onSubmit)} className="login-form">

        <h3 align="center">Login</h3>

        <ButtonGroup
          onClick={changeLanguage}
          className="container-fluid p-0 pb-3 pt-3 btn-group"
        >
          <Button id="sk" className={active("sk")}>Slovak</Button>
          <Button id="cz" className={active("cz")}>Czech</Button>
          <Button id="en" className={active("en")}>English</Button>
          <Button id="hu" className={active("hu")}>Hungary</Button>
        </ButtonGroup>

        {/* NAME */}
        <Form.Group className="form-group pb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="login"
            placeholder="Enter login name"
            ref={register}
            required
          />
        </Form.Group>

        {/* PASS */}
        <Form.Group className="form-group pb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter login password"
            ref={register}
            required
          />
        </Form.Group>

        { loginError && <ErrorMessage text={loginError}/> }
        <Button type="submit" variant="dark" className="btn-block mt-3">Login</Button>
      </Form>
    </Container>
  )
};

export default LoginForm;