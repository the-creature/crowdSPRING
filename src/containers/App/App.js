import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Sidebar from 'react-sidebar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import getUser from 'utils/getUser';

import styles from './App.scss';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  state = {
    sidebarOpen: false
  };

  componentDidMount() {
    this.props.actions.loadUsers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.userId !== this.props.userId) {
      this.onSetSidebarOpen(false);
    }
  }

  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open
    });
  };

  handleUserSelect = (e) => {
    this.props.actions.selectUser(e.target.value);
  };

  handleUserSelectFromSidebar = (id) => {
    this.onSetSidebarOpen(false);
    setTimeout(() => {
      this.props.actions.selectUser(id);
    }, 300);
  };

  renderContent() {
    const { children, loading } = this.props;

    if (loading) {
      return null;
    }

    return (
      <main className={styles.main}>
        {children}
      </main>
    );
  }

  renderSidebar() {
    const { users } = this.props;

    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button
            className={styles.sidebarButton}
            onClick={() => this.onSetSidebarOpen(false)}
          >
            <i className="fa fa-bars fa-2x" />
          </button>
          <h1 className={styles.sidebarTitle}>Menu</h1>
        </div>
        <ul className={styles.usersList}>
          {
            users.map(u => (
              <li
                className={styles.userLink}
                onClick={() => this.handleUserSelectFromSidebar(u.id)}
              >
                {u.name}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  render() {
    const { actions, users, loading, userId } = this.props;
    const user = getUser(userId, users);
    console.log('RENDER', loading, user);

    return (
      <Sidebar
        sidebar={this.renderSidebar()}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight
        styles={{
          sidebar: {
            width: '100%',
            background: 'white'
          }
        }}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.title}><Link to="/">ACME</Link></h1>
              <button
                className={styles.sidebarOpenButton}
                onClick={() => this.onSetSidebarOpen(true)}
              >
                <i className="fa fa-bars fa-2x" />
              </button>
            </header>
            {this.renderContent()}
          </div>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users.users,
    loading: state.users.loading,
    userId: ownProps.params.userId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
