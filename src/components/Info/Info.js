import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getUser from 'utils/getUser';

import styles from './Info.scss';

class Info extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={user.avatar} alt="avatar" />
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>{user.name}</h4>
          <span className={styles.email}>{user.email}</span>
          <h4 className={styles.aboutTitle}>About {user.name}</h4>
          <span className={styles.about}>{user.about}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: getUser(ownProps.params.userId, state.users.users)
  };
}


export default connect(mapStateToProps)(Info);
