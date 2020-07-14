import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileActions';
import PropTypes from 'prop-types';

const AddExperience = ({ errors, addExperience }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false,
  });
  const history = useHistory();
  const {
    company,
    title,
    location,
    from,
    to,
    current,
    description,
    disabled,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onCheck = (e) => {
    setFormData({ ...formData, disabled: !disabled, current: !current });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const expData = {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    };
    addExperience(expData, history);
  };
  return (
    <div className='add-experience'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              Go Back
            </Link>
            <h1 className='display-4 text-center'>Add Experience</h1>
            <p className='lead text-center'>
              Add any job or position that you have had in the past or current
            </p>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* Company'
                name='company'
                value={company}
                onChange={onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder='* Job Title'
                name='title'
                value={title}
                onChange={onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name='from'
                type='date'
                value={from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name='to'
                type='date'
                value={to}
                onChange={onChange}
                error={errors.to}
                disabled={disabled ? 'disabled' : ''}
              />
              <div className='form-check mb-4'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='current'
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id='current'
                />
                <label htmlFor='current' className='form-check-label'>
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder='Job Description'
                name='description'
                value={description}
                onChange={onChange}
                error={errors.description}
                info='Tell us about the role'
              />
              <input
                type='submit'
                value='Submit'
                className='btn btn-info btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { addExperience })(AddExperience);
