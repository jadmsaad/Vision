import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth";
import PropTypes from "prop-types";

// { setAlert, register, isAuthenticated }

const SignUp = ({signUp,isAuthenticated,charts}) => {

  const [formData,setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2:"",
    subjects:[]
  })

  const {name,email,password,password2,subjects} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    
    if(password !== password2){
      console.log('passwords not equal')
    }

    else {
      signUp({name,email,password,subjects})
    }
  }
    
  

  if(isAuthenticated && charts) return <Redirect to ='/dashboard'/>

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit ={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange = {e => onChange(e)}
            
            
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange = {e => onChange(e)}
            
            
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange = {e => onChange(e)}
            
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange = {e => onChange(e)}
            
            
          />
        </div>
        <input type="submit" className="btn btn-primary" value="SignUp" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </Fragment>
  );
};

SignUp.propTypes = {

  isAuthenticated: PropTypes.bool,
  loading: PropTypes.object,
  signUp: PropTypes.func.isRequired


}
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated,
  charts: state.charts.charts
})



export default connect(mapStateToProps,{signUp})(SignUp)
