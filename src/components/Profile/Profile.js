import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import getUser from 'utils/getUser';

import { MOBILE } from 'constants';

import styles from './Profile.scss';

class Profile extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isEdit: PropTypes.bool,
    isProfile: PropTypes.bool,
    isGallery: PropTypes.bool,
    isMobile: PropTypes.bool
  };

  renderDropdown() {
    const { user, isGallery, actions } = this.props;
    const { openUserInfo, openUserGallery } = actions;

    const selectAction = isGallery ? openUserInfo : openUserGallery;

    return (
      <Dropdown
        id="profile-dropdown"
        className={styles.dropdown}
        onSelect={() => selectAction(user.id)}
        pullRight
      >
        <Dropdown.Toggle className={styles.dropdownButton}>
          {isGallery ? 'Gallery' : 'Profile'}
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.dropdownMenu}>

            <MenuItem
              eventKey={0}
              className={styles.dropdownItem}
            >
              {isGallery ? 'Profile' : 'Gallery'}
            </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderTabs() {
    const { user, isGallery } = this.props;

    const profileLinkClassname = !isGallery ? styles.activeTab : styles.tab;
    const galleryLinkClassname = isGallery ? styles.activeTab : styles.tab;

    return (
      <ul className={styles.tabs}>
        <li className={profileLinkClassname}><Link to={`/user/${user.id}/info`}>Profile</Link></li>
        <li className={galleryLinkClassname}><Link to={`/user/${user.id}/gallery`}>Gallery</Link></li>
      </ul>
    );
  }

  render() {
    const { user, isEdit, isProfile, isGallery, isMobile, children } = this.props;


    return (
      <div className={styles.page}>
        <h2 className={styles.title}>{user.name}'s Profile</h2>
        <div className={styles.controls}>
          {isMobile ? this.renderDropdown() : this.renderTabs()}
          {
            !(isEdit || isGallery) &&
            <button className={isMobile ? styles.editButtonMobile : styles.editButton}>
              <Link to={`/user/${user.id}/edit`}>
                {
                  isMobile ?
                    <i className="fa fa-pencil fa-2x" /> :
                    'Edit Profile'
                }
              </Link>
            </button>
          }
        </div>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const routes = ownProps.routes.map(route => route.path);
  const isEdit = routes.includes('edit');
  const isProfile = routes.includes('info');
  const isGallery = routes.includes('gallery');

  return {
    user: getUser(ownProps.params.userId, state.users.users),
    isEdit,
    isProfile,
    isGallery,
    isMobile: state.layout.type === MOBILE
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
