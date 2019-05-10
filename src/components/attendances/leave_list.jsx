import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtCheckbox,AtButton } from 'taro-ui'
import PropTypes from 'prop-types';
import './leave_list.scss';
import noop from 'lodash.noop';
import set from 'lodash.set';
class LeaveList extends Taro.PureComponent {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    onSubmitClick: PropTypes.func,
    onRejectClick: PropTypes.func

  };

  static defaultProps = {
    data: [],
    onSubmitClick: noop,
    onRejectClick: noop,
  };
  state = {
    checkedList: [],
  }
  renderCheckOption = () => {
    console.log(this.props.data)
    return this.props.data.map((item) => {
      return {
        value: item.id,
        label: item.info.name,
        desc: item.info.description,
      }
    })
  };
  handleCheckChange = (value) => {
    this.setState({
      checkedList: value
    })
  };
  handleSubmitClick = () => {
    let result ={};
    this.state.checkedList.forEach((item) => {
      set(result, `${item}`, true)
    })
    this.props.onSubmitClick(result)
  }
  handleRejectClick = () => {
    let result = {};
    this.state.checkedList.forEach((item) => {
      set(result, `${item}`, false)
    })
    this.props.onRejectClick(result)
  }
  render() {
    const checkOption = this.renderCheckOption();
    return (
      <View className='leave-list'>
        <View className='button-bar'>
          {this.props.data.length !== 0 && <View className='button'>
            <AtButton
              disabled={this.state.checkedList.length ===0}
              onClick={this.handleSubmitClick}
              type='secondary'
            >
              同意
            </AtButton>
          </View>}
          {this.props.data.length !== 0 && <View className='button'>
            <AtButton
              disabled={this.state.checkedList.length ===0}
              onClick={this.handleRejectClick}
            >
              拒绝
            </AtButton>
          </View>}
        </View>
        {this.props.data.length !== 0 ? <View className='checkbox-list'>
          <AtCheckbox
            options={checkOption}
            selectedList={this.state.checkedList}
            onChange={this.handleCheckChange}
          />
        </View> : <View style={{ margin: '1em auto' }} >暂无请假申请</View>}
      </View>
    )
  }
}

export default LeaveList;
