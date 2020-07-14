import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';
import PropTypes from 'prop-types';

const AddEducation = ({ errors, addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false,
  });
  const history = useHistory();
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current,
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
    const eduData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    addEducation(eduData, history);
  };
  return (
    <div className='add-education'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to='/dashboard' className='btn btn-light'>
              Go Back
            </Link>
            <h1 className='display-4 text-center'>Add Education</h1>
            <p className='lead text-center'>
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* School'
                name='school'
                value={school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder='* Degree or Certification'
                name='degree'
                value={degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder='* Field of Study'
                name='fieldofstudy'
                value={fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
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
                  Current School
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder='Program Description'
                name='description'
                value={description}
                onChange={onChange}
                error={errors.description}
                info='Tell us about the program'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { addEducation })(AddEducation);
