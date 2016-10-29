import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Sidebar from 'react-sidebar';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';

import { DESKTOP, MOBILE } from 'constants';

import styles from './App.scss';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isMobile: PropTypes.bool
  };

  state = {
    sidebarOpen: false
  };

  componentWillMount() {
    this.mql = window.matchMedia('(max-width: 768px)');
    this.mql.addListener(this.mediaQueryChanged);

    this.mediaQueryChanged();
  }

  componentDidMount() {
    this.props.actions.loadUsers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.userId !== this.props.userId) {
      this.onSetSidebarOpen(false);
    }
  }

  componentWillUnmount() {
    this.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open
    });
  };

  mediaQueryChanged = () => {
    this.props.actions.changeLayout(this.mql.matches ? MOBILE : DESKTOP);
  };

  handleUserSelect = (id) => {
    this.props.actions.selectUser(id);
  };

  handleUserSelectFromSidebar = (id) => {
    const sidebarActionDelay = 300;

    this.onSetSidebarOpen(false);
    setTimeout(() => {
      this.props.actions.selectUser(id);
    }, sidebarActionDelay);
  };

  renderContent() {
    const { children, loading } = this.props;

    if (loading) {
      return (
        <div className={styles.preloader}>
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
        </div>
      );
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
          <div className={styles.sidebarCloseButtonContainer}>
            <button
              className={styles.sidebarButton}
              onClick={() => this.onSetSidebarOpen(false)}
            >
              <i className="fa fa-bars fa-2x" />
            </button>
          </div>
          <h1 className={styles.sidebarTitle}>Menu</h1>
        </div>
        <ul className={styles.usersList}>
          {
            users.map(u => (
              <li
                key={u.id}
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

  renderDesktop() {
    const { users, userId, loading } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}><Link to="/">ACME</Link></h1>
            {
              !loading &&
              <Dropdown
                id="users-dropdown"
                className={styles.dropdown}
                onSelect={this.handleUserSelect}
                pullRight
              >
                <Dropdown.Toggle noCaret className={styles.dropdownButton}>
                  <i className="fa fa-bars fa-2x" />
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                  {
                    users.map(u => (
                      <MenuItem
                        eventKey={u.id}
                        className={u.id === userId ? styles.activeDropdownItem : styles.dropdownItem}
                      >
                        {u.name}
                      </MenuItem>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            }
          </header>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderMobile() {
    const { loading } = this.props;

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
              {
                !loading &&
                <button
                  className={styles.sidebarOpenButton}
                  onClick={() => this.onSetSidebarOpen(true)}
                >
                  <i className="fa fa-bars fa-2x" />
                </button>
              }
            </header>
            {this.renderContent()}
          </div>
        </div>
      </Sidebar>
    );
  }

  render() {
    const { isMobile } = this.props;

    return isMobile ? this.renderMobile() : this.renderDesktop();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    users: state.users.users,
    loading: state.users.loading,
    userId: +ownProps.params.userId,
    isMobile: state.layout.type === MOBILE
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
