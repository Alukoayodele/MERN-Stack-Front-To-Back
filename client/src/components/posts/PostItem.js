import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import classnames from 'classnames';

const PostItem = ({
  post,
  auth,
  deletePost,
  addLike,
  removeLike,
  showActions,
}) => {
  const onDeleteClick = (id) => {
    deletePost(id);
  };
  const onLikeClick = (id) => {
    addLike(id);
  };
  const onUnLikeClick = (id) => {
    removeLike(id);
  };
  const findUserlike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={post.avatar}
              alt=''
            />
          </a>
          <br />
          <p className='text-center'>{post.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{post.text}</p>
          {showActions ? (
            <span>
              <button
                onClick={() => onLikeClick(post._id)}
                type='button'
                className='btn btn-light mr-1'
              >
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-info': findUserlike(post.likes),
                  })}
                ></i>
                <span className='badge badge-light'>{post.likes.length}</span>
              </button>
              <button
                onClick={() => onUnLikeClick(post._id)}
                type='button'
                className='btn btn-light mr-1'
              >
                <i className='text-secondary fas fa-thumbs-down'></i>
              </button>
              <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                Comments
              </Link>
              {post.user === auth.user.id ? (
                <button
                  onClick={() => onDeleteClick(post._id)}
                  type='button'
                  className='btn btn-danger mr-1'
                >
                  <i className='fas fa-times' />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
