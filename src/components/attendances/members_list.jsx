import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';

import './members_list.scss'

class MembersList extends Taro.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isEnded: PropTypes.bool,
  }
  static defaultProps = {
    isEnded: false,
  }

  state = {

  };

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
      <View className='members-list members-list-border'>
        <View className='members-list-title'>
          {this.props.title === '默认' ? '其他' : this.props.title}
        </View>
        {this.props.data.map((item, index) => {
          const status = this.renderStatus(item);
          return <View className='members-list-item' key={index}>
            <View className='title'>
              {item.nickname}
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

export default MembersList;
