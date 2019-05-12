import Taro from '@tarojs/taro'
import { View, Button, Text, Picker, Map} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtListItem, AtProgress,AtSwitch, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './create_attendances_view.scss'
import moment from "moment";

const mapStateToProps = (state) => {

  return {
    account: state.account,
    association: state.association.myEntity,
    isLoading: state.loading.global,
  }
};

@connect(mapStateToProps)
class CreateAttendancesView extends Taro.PureComponent {

  state = {
    percent: 0,
    status: 'progress',
    startTimeSel: '未选择',
    endTimeSel: '未选择',
    startDateSel: '未选择',
    endDateSel:'未选择',
    title: '',
    description: '',
    place_x: 0,
    place_y: 0,
    distance: 50,
    address: '',
    useCurrentAddress: false,
  }

  componentDidShow() {
  }
  updatePercent = () => {
    let percent = 0;
    if(this.state.title !== '') {
      percent += 20;
    }
    if(this.state.description !== '') {
      percent += 20;
    }
    if(this.state.place_x !== 0 && this.state.place_y !== 0) {
      percent += 20;
    }
    if(this.state.startDateSel !== '未选择') {
      percent += 10;
    }
    if(this.state.startTimeSel !== '未选择') {
      percent += 10;
    }
    if(this.state.endTimeSel !== '未选择') {
      percent += 10;
    }
    if(this.state.endDateSel !== '未选择') {
      percent += 10;
    }
    this.setState({
      percent: percent,
    })
  }
  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: keyName ==='description' ? value.target.value : value,
    }, () => {
      this.updatePercent();
    })
  }
  handlePickerChange = (keyName, e) => {
    this.setState({
      [keyName]: e.detail.value
    },() => {
      this.updatePercent();
    })
  }
  handleSwitchChange = ({ target }) => {
    this.setState({
      useCurrentAddress: target.value,
      place_x: target.value ? this.state.place_x : 0,
      place_y: target.value ? this.state.place_y : 0,
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
            }, () => {
              this.updatePercent();
            })
          }
        })
      }
      this.updatePercent();
    })
  }
  handleAddressClick = () => {
    Taro.chooseLocation({
      success: (res) => {
        this.setState({
          place_x: res.latitude,
          place_y: res.longitude,
        }, () =>{
          this.updatePercent()
        })
      },

    })
  }
  handleSubmitClick = () => {
    const start = this.state.startDateSel+" "+this.state.startTimeSel+":00";
    const end = this.state.endDateSel+" "+this.state.endTimeSel+":00";
    const startMoment = moment(start, 'YYYY-MM-DD HH:mm:ss');
    const endMoment = moment(end, 'YYYY-MM-DD HH:mm:ss');
    this.props.dispatch({
      type: 'attendances/addAttendances',
      payload: {
        ...this.state,
        start_time: startMoment.format('X'),
        end_time: endMoment.format('X'),
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
      }
    }).then(() => {
      Taro.showToast('发布成功')
      this.setState({
        status: 'success'
      }, () => {
        if(!this.props.isLoading) {
          setTimeout(() => {
            Taro.redirectTo({
              url: '/pages/attendances/attendances_list_view',
            }, 1000)
          })
        }
      })
    })
  }
  render() {
    return (
      <View className='create-attendances-view'>
        <View className='progress-bar'>
          <View style={{ padding: '.5em'}}>
            <AtProgress percent={this.state.percent} status={this.state.status} />

          </View>
        </View>
        <View className='content'>
          <View className='title'>
            考勤信息
          </View>
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
          <View className='title'>
            选择时间
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
          <View className='title'>
            位置
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
            {this.state.place_x !== 0 && this.state.place_y !== 0 &&<View className='map'>
              <Map
                longitude={this.state.place_y}
                latitude={this.state.place_x}
                style={{ width: '100%' }}
                markers={[{id: 1, latitude: this.state.place_x, longitude: this.state.place_y}]}
                circles={[{ latitude: this.state.place_x, longitude: this.state.place_y, radius: this.state.distance, color: '#1890ff', fillColor: '#7cb5ec88'}]}
                scale={18}
              />
            </View>}
          </View>
          <View className='submit-button'>
            <AtButton disabled={this.state.percent !== 100 } onClick={this.handleSubmitClick}>{this.state.percent !==100 ? '请先完善信息' : '确认'}</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default CreateAttendancesView;
