import React, { Component } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'

export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineOption: {}
    }
  }

  componentDidMount() {
    this.initalLineEcharts()
  }

  initalLineEcharts = () => {
    // let { params } = this.props
    // params = JSON.parse(params)
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 5,
        data: ['新增关注', '新增注册', '活跃用户']
      },
      grid: {
        left: '3%',
        right: '24%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '新增关注',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '新增注册',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '活跃用户',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    }
    this.setState({
      lineOption: option
    })
  }

  render() {
    return (
      <ReactEchartsCore style={this.props.heighttemp == 'auto' ? {} : { height: this.props.heighttemp }} echarts={echarts} option={this.state.lineOption} />
    )
  }
}
