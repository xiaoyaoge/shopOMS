import React,{Component} from 'react';

import './header.less';

class Header extends Component{
  render() {
    return (
     <div className='header'>
      <div className='header-content'>
        <div style={{float: 'right'}}>
          <span></span>
          <span>管理员</span>
        </div>
      </div>
     </div>
    );
  } 
}
export default Header;