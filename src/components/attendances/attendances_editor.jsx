import Taro from '@tarojs/taro'
import { View, Button, Text, Picker, Map} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtListItem, AtProgress,AtSwitch, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './attendances_editor.scss'
import moment from "moment";
import PropTypes from 'prop-types';
import get from 'lodash.get';
import noop from 'lodash.noop';
class AttendancesEditor extends Taro.PureComponent {

  static propTypes = {
    attendances: PropTypes.shape({}).isRequired,
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
    const startDateSel = moment.unix(this.props.attendances.start_time).format('YYYY-MM-DD');
    const endDateSel = moment.unix(this.props.attendances.end_time).format('YYYY-MM-DD');
    const startTimeSel = moment.unix(this.props.attendances.start_time).format('HH:mm');
    const endTimeSel = moment.unix(this.props.attendances.end_time).format('HH:mm');

    this.setState({
      ...this.props.attendances,
      startDateSel: startDateSel,
      endDateSel: endDateSel,
      startTimeSel: startTimeSel,
      endTimeSel: endTimeSel,
    })
  }

  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: keyName ==='description' ? value.target.value : value,
    })
  }
  handlePickerChange = (keyName, e) => {
    this.setState({
      [keyName]: e.detail.value
    })
  }
  handleSwitchChange = ({ target }) => {
    this.setState({
      useCurrentAddress: target.value,
      place_x: this.state.place_x,
      place_y: this.state.place_y,
    }, () => {
      if(this.state.useCurrentAddress) {
        Taro.getLocation({
          type: 'gcj02',
          success: (res) => {
            const { latitude } = res;
            const { longitude } = res;
            this.setState({
              place_x: latitude,
              place_y: longitude,
            })
          }
        })
      }
    })
  }
  handleAddressClick = () => {
    Taro.chooseLocation({
      success: (res) => {
        this.setState({
          place_x: res.latitude,
          place_y: res.longitude,
        })
      },
    })
  }
  render() {
    return (
      <View className='attendances-editor'>
        <View className='content'>
          <View className='title-input'>
            <AtInput
              name='title'
              title='标题'
              type='text'
              border={false}
              placeholder='请输入考勤标题'
              value={this.state.title}
              onChange={this.handleInputChange.bind(this, 'title')}
            />
            <View className='text-area'>
              <AtTextarea
                value={this.state.description}
                onChange={this.handleInputChange.bind(this, 'description')}
                placeholder='请输入考勤详细信息'
                height={200}
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
          <View className='address-picker'>
            <AtListItem
              title='使用当前位置'
              isSwitch
              onSwitchChange={this.handleSwitchChange}
            />
            <AtListItem
              disabled={this.state.useCurrentAddress}
              title='选择地址'
              arrow='right'
              onClick={this.handleAddressClick}
            />
            <AtInput
              name='distance'
              title='半径(m)'
              type='number'
              placeholder='请输入考勤范围距离(m)'
              value={this.state.distance}
              onChange={this.handleInputChange.bind(this, 'distance')}
            />
            {get(this.state, 'place_x', 0) !== 0 && get(this.state, 'place_y', 0) !== 0 &&<View className='map'>
              <Map
                longitude={this.state.place_y}
                latitude={this.state.place_x}
                style={{ width: '100%', height: '10em'}}
                enable-scoll={false}
                markers={[{id: 1, latitude: this.state.place_x, longitude: this.state.place_y}]}
                circles={[{ latitude: this.state.place_x, longitude: this.state.place_y, radius: this.state.distance, color: '#1890ff', fillColor: '#7cb5ec88'}]}
                scale={18}
              />
            </View>}
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

export default AttendancesEditor;
