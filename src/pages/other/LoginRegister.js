import PropTypes from "prop-types";
import React, { Fragment,useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import {connect} from "react-redux";

const LoginRegister = ({ location,userData,addUser }) => {
  const { pathname } = location;
  console.log("value of pathname is:",pathname);
  const history = useHistory();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
  });
  const handleChange = e =>{
    const {name,value} = e.target
    setUser({
    ...user,
    [name]:value
    })
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const {name,email,password} = user
    if (name && email && password){
      // axios.post("http://localhost:4000/register",user )
      axios.post("https://flower-api.onrender.com/register",user )
      .then(res=>{alert(res.data.message); 
      })
    }
    else{
        alert("invalid input")
    };
    setUser({name:"",
    email:"",
    password:"",})
  }
  const handleLogin =(e)=>{
    e.preventDefault();
    // axios.post("http://localhost:4000/login",user)
    axios.post("https://flower-api.onrender.com/login",user)
    .then(res=>{alert(res.data.message)
    // setLoginUser(res.data.user)
    setUser({name:"",
    email:"",
    password:"",});
    if(!res.data.error){
      console.log("res.data.user ki value:",res.data.user);
      // localStorage.setItem("user",JSON.stringify(res.data.user));
     addUser(res.data.user);
      history.push("/")
    }
   })
}
  return (
    <Fragment>
      <MetaTags>
        <title>Login | Register</title>
        <meta
          name="Login | Register"
          content="Login | Register"
        />
      </MetaTags>
      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem >
        Login || Register
      </BreadcrumbsItem> */}
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form method="post" onSubmit={handleLogin}>
                            <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={user.email} onChange={handleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password} onChange={handleChange}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form  onSubmit={handleSubmit}>
                              <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={user.name} onChange={handleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password} onChange={handleChange}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={user.email} onChange={handleChange}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};
const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    userData:state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
   addUser:(user)=>{
     dispatch({type:"set-user",payload:user})
   }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
