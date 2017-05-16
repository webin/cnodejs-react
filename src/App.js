import routes from './routes';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {media} from './style-utils';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {NavLink, Route, Switch} from 'react-router-dom'

const navs = [
  {
    icon: 'home',
    module: 'Home',
    label: '话题',
    to: '/'
  },
  {
    icon: 'favorite',
    module: 'Collect',
    label: '收藏',
    to: '/collect'
  },
  {
    icon: 'notifications',
    module: 'Message',
    label: '消息',
    to: '/message'
  },
  {
    icon: 'person',
    module: 'Me',
    label: '我',
    to: '/m'
  }
];
const AppBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const AppBarBox = styled.div`
  display: none;
  ${ media.handheld`
    display: block;
  `}
`
const NavLinkStyle = 'nav-link'
const BottomNavigationBox = styled.div`
  order: 9;
  ${ media.handheld`
    display: none;
  `}
`
const RouterBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`
const LinearProgressStyle = {
  background: 'none',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 9
}

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <AppBox>
          <AppBarBox>
            <Paper zDepth={1}>
              <AppBar
                title="cnodejs react share.la"
                showMenuIconButton={false}
                children={
                  <div className={NavLinkStyle}>
                    {navs.map(nav => <NavLink
                      key={nav.to}
                      to={nav.to}
                      >{nav.label}</NavLink>)}
                  </div>
                }
              />
            </Paper>
          </AppBarBox>
          <BottomNavigationBox>
            <Paper className="bottom-nav" zDepth={1}>
              <BottomNavigation selectedIndex={0}>
                {navs.map(nav => <BottomNavigationItem
                  key={nav.to}
                  label={nav.label}
                  icon={
                    <FontIcon className="material-icons">{nav.icon}</FontIcon>
                  }
                  onClick={() => {
                    this.props.history.push(nav.to)
                  }}
                  />)}
              </BottomNavigation>
            </Paper>
          </BottomNavigationBox>
          <RouterBox>
            <Switch>
              {routes.map(route => <Route exact key={route.path} {...route}/>)}
            </Switch>
          </RouterBox>
          {!this.props.loading || <LinearProgress color="rgba(255, 255, 255, 0.618)" mode="indeterminate" style={LinearProgressStyle}/>}
        </AppBox>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  loading: state.loading,
  token: state.token
})

export default connect(
  mapStateToProps
)(App)
