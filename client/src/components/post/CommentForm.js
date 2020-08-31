import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ addComment, auth, errors, postId }) => {
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

    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    addComment(postId, newComment);
    setInput({ text: '' });
  };
  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Make a comment...</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Reply to post'
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

CommentForm.proTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
