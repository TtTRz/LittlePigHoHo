import {AtAccordion, AtList, AtListItem, AtSwipeAction} from "taro-ui";
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';

class HoAccordion extends Taro.PureComponent {

  static propTypes = {
    department: PropTypes.shape({}),
  };
  static defaultProps = {
  };
  state = {
    isOpened: false,
  }
  handleClick = (value) => {
    this.setState({
      isOpened: value,
    })
  }
  render() {
    return (
      <AtAccordion open={this.state.isOpened}  onClick={this.handleClick.bind(this)} title={this.props.department.name} icon={{ value: 'chevron-down', color: 'red', size: '15' }}>
        <AtSwipeAction options={[
          {
            text: '取消',
            style: {
              backgroundColor: '#6190E8'
            }
          },
          {
            text: '确认',
            style: {
              backgroundColor: '#FF4949'
            }
          }
        ]}>
          <AtList hasBorder={false}>
            {this.props.department.members.map((i) => {
              return (
                <AtListItem
                  title={i.nickname}
                />
              )
            })}
          </AtList>
        </AtSwipeAction>
      </AtAccordion>
    )
  }
}

export default HoAccordion;
