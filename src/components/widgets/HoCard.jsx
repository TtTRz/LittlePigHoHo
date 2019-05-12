import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './HoCard.scss'
import PropTypes from 'prop-types'
import noop from 'lodash.noop'
class HoCard extends Taro.PureComponent{
  static propTypes = {
    type: PropTypes.string,
    note: PropTypes.string.isRequired,
    extra: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string,
    manage: PropTypes.bool,
    onDelClick: PropTypes.func,
  }
  static defaultProps = {
    type: 'normal',
    manage: false,
    author: '',
    onDelClick: noop,
  }
  state = {

  }
  renderStatus = () => {
    const { status, attendance_status } = this.props.extra;
    if(parseInt(attendance_status, 10) === 1 && !this.props.manage) {
      return {
        id: 1,
        title: '已签到',
      }
    }
    if(parseInt(attendance_status, 10) === 0 && !this.props.manage) {
      return {
        id: 2,
        title: '已请假'
      }
    }
    if(parseInt(status, 10) === -1) {
      return {
        id: -1,
        title: '未开始'
      }
    }
    if(parseInt(status, 10) === 1) {
      return {
        id: 3,
        title: '进行中',
      }
    }
    if(parseInt(status, 10) === 0 && this.props.manage) {
      return {
        id: 0,
        title: '已结束'
      }
    }
    if(parseInt(status, 10) === 0 && parseInt(attendance_status, 10) === -1 && !this.props.manage){
      return {
        id: 0,
        title: '缺勤',
      }
    }
  }
  render() {
    const status = this.renderStatus();
    return (
      <View className='ho-card'>
        <View className='header'>
          <View className='title'>
            {this.props.title}
          </View>
          <View className='extra'>
            {this.props.type === 'attendances' && <View className={'tag ' + `tag_${status.id}`}>
              {status.title}
            </View>}
            {this.props.type === 'notices' && <View onClick={() => this.props.onDelClick(this.props.extra)} className='delete-button'>
            </View>}
          </View>
        </View>
        <View className='content'>
          <View className='info'>
            {this.props.content === "" ? "无详细说明" : this.props.content}
          </View>
          <View className='note'>
            <View className='author'>
              {this.props.author}
            </View>
            <View className='item'>
              {this.props.note}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default HoCard;
