import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import getUser from 'utils/getUser';
import { createImageUrl } from 'utils/images';

import styles from './Gallery.scss';

class Gallery extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  handleUpload = (e) => {
    this.props.actions.addGalleryImages({
      userId: this.props.user.id,
      urls: Array.from(e.target.files).map(createImageUrl)
    });
  };

  render() {
    const { images } = this.props.user;

    return (
      <ul className={styles.gallery}>
        {
          images.map(image => (
            <li className={styles.item} key={image.id}>
              <img className={styles.image} src={image.url} alt={image.id} />
            </li>
          ))
        }
        <li className={styles.item}>
          <label className={styles.addLabel} htmlFor="addImage">
            <input
              id="addImage"
              className={styles.addInput}
              type="file"
              accept="image/*"
              multiple
              onChange={this.handleUpload}
            />
            <i className="fa fa-plus fa-2x" />
            <span className={styles.addText}>Add Item</span>
          </label>
        </li>
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
