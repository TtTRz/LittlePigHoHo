import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'

import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import HoAvatar from "../../components/home/widgets/avatar";
import './account.scss'

const mapStateToProps = (state) => {
  let sex = '未知';
  if(state.account.sex === 1) {
    sex = '男生';
  } else if (state.account.sex === 2) {
    sex = '女生';
  } else {
    sex = '未知';
  }
  const isLoading = state.loading.effects['account/editAccount'];
  return {
    account: {
      ...state.account,
      sex: sex,
    },
    isLoading,
  }
};

@connect(mapStateToProps)
class AccountEditorView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '修改信息'
  };
  static propTypes = {
    account: PropTypes.shape({}).isRequired,
  };
  state = {
    canSubmit: false,
    account: {
      nickname: this.props.account.nickname,
      realname: this.props.account.realname,
      sex: this.props.account.sex,
      motto: this.props.account.motto,
      email: this.props.account.email,
      phone: this.props.account.phone,
    },
  };
  sex = ['男生','女生','未知'];
  handleInputChange = (keyName, value) => {
    this.setState({
      canSubmit: value !== "",
      account: {
        ...this.state.account,
        [keyName]: value,
      }
    })
  };
  handlePickChange = (keyName, e) =>{
    if (keyName === 'sex') {
      this.setState({
        canSubmit: true,
        account: {
          ...this.state.account,
          [keyName]: this.sex[e.detail.value]
        }
      })
    }
  };
  handleSubmitClick = () => {
    let sex = 0;
    if(this.state.account.sex === '男生') {
      sex = 1;
    } else if (this.state.account.sex === '女生' ){
      sex = 2;
    } else {
      sex = 0;
    }
    this.props.dispatch({
      type: 'account/editAccount',
      payload: {
        ...this.state.account,
        accountId: this.props.account.id,
        sex: sex,
      }
    }).then((data) => {
      if(data.id) {
        Taro.atMessage({
          'message': '创建成功',
          'type': 'success',
          duration: 1000,
        })
        setTimeout(() => {
          Taro.redirectTo({
            url: '/pages/home/home_view'
          })
        }, 1500)
      }
    })
  };
  render() {
    return (
      <View className='account-editor-view'>
        <View className='header'>
          <View className='title'>
            {this.props.account.realname}的个人资料
          </View>
        </View>
        <View className='content'>
          <View className='input-area'>
            <AtInput
              className='input'
              name='realname'
              title='真实姓名:'
              type='text'
              placeholder='请输入您的真实姓名'
              clear
              value={this.state.account.realname}
              onChange={this.handleInputChange.bind(this, 'realname')}
            />
            <AtInput
              className='input'
              name='nickname'
              title='昵称:'
              type='text'
              placeholder='请输入您的昵称'
              clear
              value={this.state.account.nickname}
              onChange={this.handleInputChange.bind(this, 'nickname')}
            />
            <Picker mode='selector' range={this.sex} onChange={this.handlePickChange.bind(this, 'sex')}>
              <View className='picker'>
                <View className='label'>
                  性别:
                </View>
                <View className='value'>
                  {this.state.account.sex}
                </View>
              </View>
            </Picker>
            <AtInput
              name='phone'
              title='手机号码'
              type='phone'
              clear
              placeholder='手机号码'
              value={this.state.account.phone}
              onChange={this.handleInputChange.bind(this,'phone')}
            />
            <AtInput
              className='input'
              name='email'
              title='邮箱:'
              type='text'
              clear
              placeholder='请输入您的邮箱'
              value={this.state.account.email}
              onChange={this.handleInputChange.bind(this, 'email')}
            />
          </View>
          <View className='submit-button'>
            <AtButton disabled={!this.state.canSubmit || this.props.isLoading} loading={this.props.isLoading} type='primary' onClick={this.handleSubmitClick.bind(this)}>确认修改</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
export default AccountEditorView;
