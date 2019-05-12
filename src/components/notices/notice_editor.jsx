import Taro from '@tarojs/taro'
import { View, Button, Text, Picker, Map} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtListItem, AtProgress,AtSwitch, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './notice_editor.scss'
import moment from "moment";
import PropTypes from 'prop-types';
import get from 'lodash.get';
import noop from 'lodash.noop';
class NoticeEditor extends Taro.PureComponent {

  static propTypes = {
    notice: PropTypes.shape({}).isRequired,
    onSubmitClick: PropTypes.func,
    onDelClick: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    onSubmitClick: noop,
    onDelClick: noop,
  };

  state = {

  }
  componentDidMount() {
    const startDateSel = moment.unix(this.props.notice.start_time).format('YYYY-MM-DD');
    const endDateSel = moment.unix(this.props.notice.end_time).format('YYYY-MM-DD');
    const startTimeSel = moment.unix(this.props.notice.start_time).format('HH:mm');
    const endTimeSel = moment.unix(this.props.notice.end_time).format('HH:mm');

    this.setState({
      ...this.props.notice,
      startDateSel: startDateSel,
      endDateSel: endDateSel,
      startTimeSel: startTimeSel,
      endTimeSel: endTimeSel,
    })
  }

  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: keyName ==='content' ? value.target.value : value,
    })
  }
  handlePickerChange = (keyName, e) => {
    this.setState({
      [keyName]: e.detail.value
    })
  }

  render() {
    return (
      <View className='notice-editor'>
        <View className='content'>
          <View className='title-input'>
            <AtInput
              name='title'
              title='标题'
              type='text'
              placeholder='输入通知标题'
              value={this.state.title}
              onChange={this.handleInputChange.bind(this, 'title')}
            />
            <View className='text-area'>
              <AtTextarea
                value={this.state.content}
                onChange={this.handleInputChange.bind(this, 'content')}
                placeholder='请输入您发布的通知'
                height={400}
              />
            </View>
          </View>
          <View className='time-picker'>
            <Picker mode='date' onChange={this.handlePickerChange.bind(this,'startDateSel')}>
              <View className='picker'>
                <View className='label'>
                  开始日期:
                </View>
                <View className='value'>
                  {this.state.startDateSel}
                </View>
              </View>
            </Picker>
            <Picker mode='time' onChange={this.handlePickerChange.bind(this,'startTimeSel')}>
              <View className='picker'>
                <View className='label'>
                  开始时间:
                </View>
                <View className='value'>
                  {this.state.startTimeSel}
                </View>
              </View>
            </Picker>
            <Picker mode='date' onChange={this.handlePickerChange.bind(this,'endDateSel')}>
              <View className='picker'>
                <View className='label'>
                  结束日期:
                </View>
                <View className='value'>
                  {this.state.endDateSel}
                </View>
              </View>
            </Picker>
            <Picker mode='time' onChange={this.handlePickerChange.bind(this,'endTimeSel')}>
              <View className='picker'>
                <View className='label'>
                  结束时间:
                </View>
                <View className='value'>
                  {this.state.endTimeSel}
                </View>
              </View>
            </Picker>
          </View>
          <View className='submit-button'>
            <View className='button'>
              <AtButton type='secondary' loading={this.props.isLoading} onClick={() => this.props.onSubmitClick(this.state)}>确认修改</AtButton>
            </View>
            <View className='button'>
              <AtButton onClick={this.props.onDelClick}>删 除</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default NoticeEditor;
