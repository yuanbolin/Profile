import React from 'react'
import { Row, Col } from 'antd'
import echarts from 'echarts'
import geoJson from './components/china.json'
import styles from './index.less'

const yiranyibao =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGNzNENzFGNzMxRjExRUFBRjJBOUQ5OEMyMDZEMThDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGNzNENzIwNzMxRjExRUFBRjJBOUQ5OEMyMDZEMThDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkY3M0Q3MUQ3MzFGMTFFQUFGMkE5RDk4QzIwNkQxOEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkY3M0Q3MUU3MzFGMTFFQUFGMkE5RDk4QzIwNkQxOEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz734ofJAAABLElEQVR42mL8//8/AxzcZAkEkn5AbAPEP4H4MBCvZVD/swemhBGu4SbLQiAZx4AdzANqSgazQBr+32CeB8T/v15Q+19UPvu/ov3p/1ouR//XN0z8/+Oy3H+QHBAXgw0HMtRAAt8vy//Xdj/yn0HhAQoOiF8P03ABpIEJaIktyKalh+IZrt6UwXDLhoOGDMduRIGY+kBnW4M0GIB4F+7LM+AClx6qwJh6IA2PQCxZkbc4NUgLweWegjQcAbHiHDYwcPB9w1CsoviCwd1wDYx7GBZKm0EeO7UlChw6MA/bBu36f/+QK8zTc0BqIfFwkwXk2/VAbAK2960NAyvLTwYx/tMwk7cDsT8wLn4zosX0dGioaUNFQM49BFRYjRnTyOAmizSQ/ANU+BJdCiDAAH6CnUSqTcEzAAAAAElFTkSuQmCC'
const gujianzhu =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4MjAyRkYzNzMxRTExRUE4MkEzQzFCQTE0RThFNjcyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4MjAyRkY0NzMxRTExRUE4MkEzQzFCQTE0RThFNjcyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTgyMDJGRjE3MzFFMTFFQTgyQTNDMUJBMTRFOEU2NzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTgyMDJGRjI3MzFFMTFFQTgyQTNDMUJBMTRFOEU2NzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7RpgRBAAABZElEQVR42mL4//8/AxJWB+IJQHwLiF9D6X4gVkNWh6yhBYjf/j847//fdtf/f8vkwfT/g/P/g8Uh8mC1jGCdDAwdDL9/lP+r02L4c+s+AzpgVldiYG66zsDAwtYB5FaCNCkBGef/lArz/bv3jgEXYFKSYGDpfv4RyNRnAhKZDEcW49UAAv/uvWBgOLqUH6QepCny755JDMSAf3sng6hokCbe/x8uEafpzUkQxQ/S9IlJUJ8oTYwCBiDqC0jTaibHbKI0MbsXg6gloNBTBTKu/k5lZP2PJyyYJIEhPuX/dyBTG2TTbSCezlpxAq8tLLV3QNR0IL7PBBXLZ1A2P8AaVIhVA1tCOwODuPIaIBPsPiYkuemM0X0fmFVlUf2hCwwk34pXUFsgAC3Btv3/8fn/z2iG/z+DgDgGKPTnNyjtNeBKsDA89f/NI///Nln8/3/7OEjDFHQ12DSBcBUQP4bSGPIAAQYA+7sZFxbFzOAAAAAASUVORK5CYII='
const renyuanmiji =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNjM4QUQ4NzMxRTExRUFCOURCRUQ0MUY5QUE0Q0U3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwNjM4QUQ5NzMxRTExRUFCOURCRUQ0MUY5QUE0Q0U3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjA2MzhBRDY3MzFFMTFFQUI5REJFRDQxRjlBQTRDRTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjA2MzhBRDc3MzFFMTFFQUI5REJFRDQxRjlBQTRDRTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OpFesAAABz0lEQVR42oxSOyyDURT+fqrRVL0G8YpXpEGIYLAwGETndhIDogNmFovXYBBGEgvBJAQTYfKIMDDRH2moeCUGr9LG77bXufW3+dEfJ/nuPffe851z7nevdI0URLNMfm+kqUNdjt9IqUq0OAP0rUeZmuwVjrGlNZmm/mhBUrQOqLoFfv/zXVU1RUhI298F4k0J1MXr99gYnepdbzPTYPIVmOsSyuys2OvW7YAq2sgvIRSG4PPV31VWg51cf96zOJu62ANMpnVaulUcUkdrEufcFtjcWGFuN5jHA3Z2DkU+xfuB+0uluMpCGIutMBTkw5CXB4PVitia2gYhov1tdQWPQxP4zURCbdKknnaYa2rtoA4qeDDIX/v7OF3nX/ANDnDBISuH0ICcIsKYf2T4T7J/dEQQxwjW0AuKQU2SRdh6cNh1yQ8OhyBvEjLCvMgzkqJC8hzmudLVgXkuxZRLsbc/PhI9ZRJ/8T7eWnI10qsf9Z2p0THI9F4AZnMiJfF+/0hl/PgkQkzsbES6vIOMo+2QL8jgQQROQzGlEZZGg2ZlYZ4/O508eCyLu84R6lTMBWQXf3K2cWV5UZw1hXmRBOEkhCVCg3ZfPbMRlrVkgQ8BBgCRDzES7h6gCQAAAABJRU5ErkJggg=='
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.initalECharts()
  }

  initalECharts = (data = []) => {
    // console.log(data)
    echarts.registerMap('china', geoJson)
    const myChart = echarts.init(this.ref)
    let coordsList = []
    for (let i = 0; i < coordsList.length; i++) {
      coordsList.push({
        coords: coordsList[i],
        lineStyle: {
          color: '#fff'
        }
      })
    }
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      geo: {
        roam: true, // 缩放拖动
        zoom: 1.2, //初始放大比例
        map: 'china', // 自定义扩展图表类型 用于选择省份
        label: {
          show: true, // 显示标签
          color: '#fff'
          // formatter: '{b}网点数:{c}'
        },
        itemStyle: {
          normal: {
            borderWidth: 1, //区域边框宽度
            borderColor: '#F5F5F5', //区域边框颜色
            areaColor: '#0c7ebe', //区域颜色
            label: { show: true },
            shadowColor: 'rgba(12, 190, 12, 0.5)',
            shadowBlur: 15
          },
          emphasis: {
            show: true, //选中效果
            borderWidth: 1, //区域边框宽度
            borderColor: 'rgba(2, 152, 252, 0.5)', //区域边框颜色
            areaColor: 'rgba(0, 29, 146, 0.9)' //区域颜色
          }
        }
      },
      series: [
        {
          name: '古建筑',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [
            {
              name: '测试',
              value: [115.79182, 36.114392]
            },
            {
              name: '测试',
              value: [115.79813003540039, 36.10237644873644]
            },
            {
              name: '测试',
              value: [115.76860427856445, 36.12012758978146]
            },
            {
              name: '测试',
              value: [115.77272415161133, 36.145776445186726]
            },
            {
              name: '测试',
              value: [115.81134796142578, 36.11929559467167]
            },
            {
              name: '测试',
              value: [115.85014343261719, 36.20716097553515]
            },
            {
              name: '测试',
              value: [115.82199096679688, 36.049098959065645]
            }
          ],
          symbol: `image://${gujianzhu}`,
          // symbol: `circle`,
          symbolSize: [15, 20],
          label: {
            normal: {
              formatter: '{b}',
              position: 'bottom',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: true, //不显示提示标签
            formatter: '{b}', //提示标签格式
            backgroundColor: '#fff', //提示标签背景颜色
            borderColor: '#ccc',
            borderWidth: 5,
            textStyle: { color: '#000' } //提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          name: '人员密集场所',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [
            {
              name: '测试',
              value: [115.772766, 36.115155]
            },
            {
              name: '测试',
              value: [115.71916580200195, 36.10404078863735]
            },
            {
              name: '测试',
              value: [115.86919784545898, 36.12983354794379]
            },
            {
              name: '测试',
              value: [115.7419967651367, 36.10001857352145]
            },
            {
              name: '测试',
              value: [115.92704772949219, 36.25700913637393]
            },
            {
              name: '测试',
              value: [116.04772567749022, 36.24503463167856]
            },
            {
              name: '测试',
              value: [115.89065551757811, 36.27085020723902]
            }
          ],
          symbol: `image://${renyuanmiji}`,
          symbolSize: 15,
          label: {
            normal: {
              formatter: '{b}',
              position: 'bottom',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: true, //不显示提示标签
            formatter: '{b}', //提示标签格式
            backgroundColor: '#fff', //提示标签背景颜色
            borderColor: '#ccc',
            borderWidth: 5,
            textStyle: { color: '#000' } //提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          name: '易燃易爆场所',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [
            {
              name: '测试',
              value: [115.812248, 36.134012]
            },
            {
              name: '测试',
              value: [115.75641632080077, 36.11541283425664]
            },
            {
              name: '测试',
              value: [115.79795837402342, 36.10695329862145]
            },
            {
              name: '测试',
              value: [115.76826095581053, 36.11887959381067]
            },
            {
              name: '测试',
              value: [115.8120346069336, 36.1235941411731]
            },
            {
              name: '测试',
              value: [115.78697204589844, 36.145915064868454]
            },
            {
              name: '测试',
              value: [115.78697204589844, 36.145915064868454]
            },
            {
              name: '测试',
              value: [115.95588684082033, 36.25756282630298]
            },
            {
              name: '测试',
              value: [115.8940887451172, 36.28192129773192]
            }
          ],
          symbol: `image://${yiranyibao}`,
          symbolSize: 10,
          label: {
            normal: {
              formatter: '{b}',
              position: 'bottom',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: true, //不显示提示标签
            formatter: '{b}', //提示标签格式
            backgroundColor: '#fff', //提示标签背景颜色
            borderColor: '#ccc',
            borderWidth: 5,
            textStyle: { color: '#000' } //提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          geoIndex: 0,
          type: 'map',
          tooltip: {
            trigger: 'none'
          }
        },
        {
          name: '测试路线',
          type: 'lines',
          tooltip: {
            show: false
          },
          coordinateSystem: 'geo',
          data: coordsList,
          polyline: true,
          lineStyle: {
            color: 'purple',
            opacity: 0.6,
            width: 1
          }
        }
      ]
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Row style={{ height: '100%' }}>
          <Col className={styles.container_box} span={8}>
            <div className={styles.item}>
              <div className={styles.content} />
            </div>
          </Col>
          <Col className={styles.container_box} span={8}>
            <div className={styles.item}>
              <div className={styles.content}>
                <div className={styles.map} ref={ref => (this.ref = ref)} />
              </div>
            </div>
          </Col>
          <Col className={styles.container_box} span={8}>
            <div className={styles.item}>
              <div className={styles.content} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Index
