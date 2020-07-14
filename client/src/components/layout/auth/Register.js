import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';
const Register = ({ registerUser, errors, isAuthenticated }) => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const history = useHistory();
  const { name, email, password, password2 } = input;
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  });
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2,
    };

    registerUser(newUser, history);
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
                error={errors.name}
              />

              <TextFieldGroup
                placeholder='Email Address'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                error={errors.email}
                info='This site uses Gravatar so if you want a profile image, use a
                Gravatar email'
              />
              <TextFieldGroup
                placeholder='Password'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder='Confirm Password'
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
                error={errors.password2}
              />

              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(Register);
