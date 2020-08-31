import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

const PostForm = ({ addPost, auth, errors }) => {
  const [input, setInput] = useState({
    text: '',
    error: {},
  });

  const { text } = input;
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (errors) {
      setInput({ error: errors });
    }
  }, [errors]);
  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = auth;
    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    addPost(newPost);
    setInput({ text: '' });
  };
  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Say Somthing...</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Create a post'
                name='text'
                value={text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button type='submit' className='btn btn-dark'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.proTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
