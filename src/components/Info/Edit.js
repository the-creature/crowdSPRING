import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import getUser from 'utils/getUser';

import styles from './Info.scss';

class Edit extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { actions, user: { id } } = this.props;

    actions.updateUserData({
      id,
      name: this.nameInput.value,
      email: this.emailInput.value,
      about: this.aboutInput.value
    });

    actions.openUserInfo(id);
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={user.avatar} alt="avatar" />
        </div>
        <form className={styles.info} onSubmit={this.handleSubmit}>
          <input
            ref={ref => this.nameInput = ref}
            className={styles.nameInput}
            defaultValue={user.name}
          />
          <input
            ref={ref => this.emailInput = ref}
            className={styles.emailInput}
            defaultValue={user.email}
          />
          <h4 className={styles.aboutTitle}>About {user.name}</h4>
          <textarea
            ref={ref => this.aboutInput = ref}
            className={styles.aboutInput}
            defaultValue={user.about}
          />
          <button className={styles.saveButton} type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: getUser(ownProps.params.userId, state.users.users)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
