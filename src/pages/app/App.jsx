import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Route, Switch, NavLink} from 'react-router-dom'

import MyHeader from '../../components/header/Header'
import './app.less';
import Home from '../home/Home'
import Branch from '../branch/Branch'
import Finance from '../finance/Finance'
import Activity from '../activity/Activity'
import Order from '../order/Order'
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };
  componentWillMount () {
    // 可在此读取cookie或localStorage,判断进入登录页面还是首页
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
        <MyHeader />
        <Sider
          style={{height:document.documentElement.clientHeight,zIndex:2}}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="0" className='blank-menu' style={{height:'64px',margin: 0}}>
            </Menu.Item>
          
            <Menu.Item className='menu_item' key="1">
             <NavLink to='/home'>
              <Icon type="user" />
              <span>首页</span>
              </NavLink>  
            </Menu.Item>
          
            <Menu.Item key="2" className='menu_item'>
            <NavLink to='/branch'>
              <Icon type="video-camera" />
              <span>分店管理</span>
            </NavLink>
            </Menu.Item>
         
            <Menu.Item key="3" className='menu_item'>
            <NavLink to='/finance'>
              <Icon type="upload" />
              <span>财务管理</span>
            </NavLink>
            </Menu.Item>
          
            <Menu.Item key="4" className='menu_item'>
            <NavLink to='/activity'>
              <Icon type="upload" />
              <span>活动管理</span>
            </NavLink>
            </Menu.Item>

            <Menu.Item key="5" className='menu_item'>
            <NavLink to='/order'>
              <Icon type="video-camera" />
              <span>订单管理</span>
            </NavLink>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout style={{position:'relative'}}>
          <Header style={{ background: '#fff', paddingLeft: '0px' ,marginLeft: '0px',position:'absolute',zIndex:2 }}>
            <Icon
              style={{width:'20px', height:' 20px',marginLeft: '24px'}}
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '88px 16px 24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/branch' component={Branch}/>
              <Route path='/finance' component={Finance}/>
              <Route path='/activity' component={Activity}/> 
              <Route path='/order' component={Order}/>  
              <Route component={Home}/>          
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;