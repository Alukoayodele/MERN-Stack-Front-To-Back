import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';

const initialState = {
  handle: '',
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};
const EditProfile = ({
  errors,
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  const [profileInput, setProfileInput] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = profileInput;

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setProfileInput(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  const history = useHistory();
  const onChange = (e) => {
    setProfileInput({ ...profileInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    };
    createProfile(formData, history);
  };

  let socialInputs;
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder='Twitter Profile URL'
          name='twitter'
          icon='fab fa-twitter'
          value={twitter}
          onChange={onChange}
          error={errors.twitter}
        />

        <InputGroup
          placeholder='Facebook Profile URL'
          name='facebook'
          icon='fab fa-facebook'
          value={facebook}
          onChange={onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder='Linkedin Profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          value={linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder='YouTube Profile URL'
          name='youtube'
          icon='fab fa-youtube'
          value={youtube}
          onChange={onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder='Instagram Profile URL'
          name='instagram'
          icon='fab fa-instagram'
          value={instagram}
          onChange={onChange}
          error={errors.instagram}
        />
      </div>
    );
  }

  // Select option for status
  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];
  return (
    <div className='edit-profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Profile</h1>

            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* Profile Handle'
                name='handle'
                value={handle}
                onChange={onChange}
                error={errors.handle}
                info='A unique handle for your profile URL. Your full name, company name, nickname'
              />
              <SelectListGroup
                placeholder='Status'
                name='status'
                value={status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info='Give us an idea of where you are in your career'
              />
              <TextFieldGroup
                placeholder='Company'
                name='company'
                value={company}
                onChange={onChange}
                error={errors.company}
                info='Could be your own company or one you work for'
              />
              <TextFieldGroup
                placeholder='Website'
                name='website'
                value={website}
                onChange={onChange}
                error={errors.website}
                info='Could be your own website or a company one'
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
                error={errors.location}
                info='City or city & state suggested (eg. Boston, MA)'
              />
              <TextFieldGroup
                placeholder='* Skills'
                name='skills'
                value={skills}
                onChange={onChange}
                error={errors.skills}
                info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP, Python)'
              />
              <TextFieldGroup
                placeholder='Github Username'
                name='githubusername'
                value={githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info='If you want your latest repos and a Github link, include your username'
              />
              <TextAreaFieldGroup
                placeholder='Short Bio'
                name='bio'
                value={bio}
                onChange={onChange}
                error={errors.bio}
                info='Tell us a little about yourself'
              />

              <div className='mb-3'>
                <button
                  type='button'
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  className='btn btn-light'
                >
                  Add Social Network Links
                </button>
                {''}
                <span className='text-muted ml-1'>Optional</span>
              </div>
              {socialInputs}
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

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
