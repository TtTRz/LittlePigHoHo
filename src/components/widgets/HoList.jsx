import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './HoList.scss'
import PropTypes from 'prop-types'
import {parse} from "path-to-regexp";

class HoList extends Taro.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isEnded: PropTypes.bool,
  }
  static defaultProps = {
    type: 'normal',
    isEnded: false,
  }
  state = {

  }
  renderStatus = (item) => {
    const { status } = item;
    if(parseInt(status, 10) === 1) {
      return {
        id: 1,
        title: '已签到',
      }
    }
    if(parseInt(status, 10) === 0) {
      return {
        id: 2,
        title: '已请假'
      }
    }
    if(parseInt(status, 10) === -1 && this.props.isEnded) {
      return {
        id: 0,
        title: '缺勤',
      }
    }
    if(parseInt(status, 10) === -1 && !this.props.isEnded) {
      return {
        id: -1,
        title: '未签到',
      }
    }
  }
  render() {
    console.log(this.props.data)
    return (
      <View className='ho-list ho-list-border'>
        {this.props.type === 'attendances' && this.props.data.map((item, index) => {
          const status = this.renderStatus(item);
          if(this.props.data.length === 0 ) {
            return <View>
              暂无考勤人员
            </View>
          }
          return <View className='ho-list-item' key={index}>
            <View className='title'>
              {item.name}
            </View>
            <View className='extra'>
              <View className={'tag ' + `tag_${status.id}`}>
                {status.title}
              </View>
            </View>
          </View>
        })}
      </View>
    )
  }
}

export default HoList;
