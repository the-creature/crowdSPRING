import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import getUser from 'utils/getUser';

import styles from './Profile.scss';

class Profile extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isEdit: PropTypes.bool,
    isProfile: PropTypes.bool,
    isGallery: PropTypes.bool
  };

  render() {
    const { user, isEdit, isProfile, isGallery, children } = this.props;

    const profileLinkClassname = isProfile ? styles.activeTab : styles.tab;
    const galleryLinkClassname = isGallery ? styles.activeTab : styles.tab;

    return (
      <div className={styles.page}>
        <h2 className={styles.title}>{user.name}'s Profile</h2>
        <div className={styles.controls}>
          <ul className={styles.tabs}>
            <li className={profileLinkClassname}><Link to={`/user/${user.id}/info`}>Profile</Link></li>
            <li className={galleryLinkClassname}><Link to={`/user/${user.id}/gallery`}>Gallery</Link></li>
          </ul>
          {
            !(isEdit || isGallery) &&
            <button className={styles.editButton}>
              <Link to={`/user/${user.id}/edit`}>Edit Profile</Link>
            </button>
          }
        </div>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('PROPS', ownProps);
  const routes = ownProps.routes.map(route => route.path);
  const isEdit = routes.includes('edit');
  const isProfile = isEdit || routes.includes('info');
  const isGallery = routes.includes('gallery');

  return {
    user: getUser(ownProps.params.userId, state.users.users),
    isEdit,
    isProfile,
    isGallery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
