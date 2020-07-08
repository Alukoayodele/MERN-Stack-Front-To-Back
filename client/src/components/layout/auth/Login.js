import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../../actions/authActions';

const Login = ({ loginUser, errors, isAuthenticated }) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  });
  const { email, password } = input;
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    loginUser(userData);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email,
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
