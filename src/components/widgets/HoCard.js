import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './HoCard.scss'
import PropTypes from 'prop-types'

class HoCard extends Taro.PureComponent{
  static propTypes = {
    type: PropTypes.string,
    note: PropTypes.string.isRequired,
    extra: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }
  static defaultProps = {
    type: 'normal',
  }
  state = {

  }
  renderStatus = () => {
    const status = {
      "-1": '未开始',
      "0": '已结束',
      "1": '进行中',
    }
    return status[this.props.extra];
  }
  render() {
    return (
      <View className='ho-card'>
        <View className='header'>
          <View className='title'>
            {this.props.title}
          </View>
          <View className='extra'>
            {this.props.type === 'attendances' && <View className={'tag ' + `tag_${this.props.extra}`}>
              {this.renderStatus()}
            </View>}
          </View>
        </View>
        <View className='content'>
          <View className='info'>
            {this.props.content === "" ? "无详细说明" : this.props.content}
          </View>
          <View className='note'>
            {this.props.note}
          </View>
        </View>
      </View>
    )
  }
}

export default HoCard;
