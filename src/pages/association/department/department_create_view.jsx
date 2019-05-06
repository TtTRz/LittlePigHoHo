import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import DepartmentEditor from '../../../components/association/department_editor';

import './department_create_view.scss'

const mapStateToProps = (state) => {
  const isLoading = state.loading.models['association'];
  return {
    isLoading,
  }
};

@connect(mapStateToProps)
class DepartmentCreateView extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '创建组织'
  };

  componentWillMount() {
    // this.props.dispatch({
    //   type: 'association/getAssociationList',
    //   payload: {
    //
    //   }
    // }).then(() => {
    //
    // })
  }
  state = {
  };

  handleCreateClick = (payload) => {
    console.log(payload)
    this.props.dispatch({
      type: 'department/addDepartment',
      payload: {
        ...payload,
        associationId: this.$router.params.aid,
        schoolId: 3,
      },
    }).then((result) => {

      if(result) {
        Taro.atMessage({
          'message': '新增成功',
          'type': 'success',
          duration: 1000,
        })
        setTimeout(() => {
          Taro.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        Taro.atMessage({
          'message': '新增失败',
          'type': 'error',
          duration: 1000,
        })
      }
    })
  }
  render() {
    return (
      <View className='department-create-view'>
        <View className='header'>
          <View className='title'>
            新增部门
          </View>
        </View>
        <DepartmentEditor onCreateClick={this.handleCreateClick} isLoading={this.props.isLoading} />
        <AtMessage />
      </View>

    )
  }
}

export default DepartmentCreateView;
