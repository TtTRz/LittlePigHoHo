import {AtAccordion, AtList, AtListItem, AtSwipeAction} from "taro-ui";
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types';
import noop from 'lodash.noop'

class HoAccordion extends Taro.PureComponent {

  static propTypes = {
    department: PropTypes.shape({}),
    onDelMembers: PropTypes.func,
  };
  static defaultProps = {
    onDelMembers: noop,
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
        <AtList hasBorder={false}>
          {this.props.department.members.map((i) => {
            return (
              <AtSwipeAction
                autoClose
                key={i.id}
                onClick={this.props.onDelMembers.bind(this, i.id)}
                options={[{
                  text: '踢出',
                  style: {
                    backgroundColor: '#FF4949'
                  }
                }]}>
                <AtListItem
                  title={i.nickname}
                />
              </AtSwipeAction>
            )
          })}
        </AtList>
      </AtAccordion>
    )
  }
}

export default HoAccordion;
