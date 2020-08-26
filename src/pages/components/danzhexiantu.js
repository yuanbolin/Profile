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
      title: {
        text: '浏览器刚峰时间段 浏览量/时间 (0h~24h)'
      },
      xAxis: {
        type: 'category',
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
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
