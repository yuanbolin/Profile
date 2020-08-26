/*
 * @Author: lixiang
 * @Email: 619419059@qq.com
 * @Date: 2019-08-27 11:50:25
 * @Last Modified by: lixiang
 * @Last Modified time: 2019-08-28 15:54:09
 * @Description: Description
 */

import React, { Component } from 'react'
import { Layout, Menu, Icon, ConfigProvider, Tooltip } from 'antd'
import { Link, router } from 'umi'
import zhCN from 'antd/es/locale/zh_CN'
import styles from './DapingLayout.less'

const { Header, Content, Sider } = Layout

export default class DapingLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundImg: 'page_daping_header_style0'
    }
  }

  componentDidMount() {}

  render() {
    let { backgroundImg } = this.state
    return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh', minWidth: 1900 }}>
          <Header className={`${styles.header_div}`}>营销应用</Header>
          <Layout id='layout_div'>
            <Content style={{ display: 'flex', flexDirection: 'cloumn' }} id='root_content_div'>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    )
  }
}
