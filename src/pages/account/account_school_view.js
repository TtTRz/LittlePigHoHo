import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import SchoolList from "../../components/school/school_list";


const mapStateToProps = (state) => {
  console.log(state.account.school_id)
  return {
    schoolList: state.school.list,
    currentSchoolId: state.account.school_id,
  }
};

@connect(mapStateToProps)
class AccountSchoolView extends Taro.PureComponent {
  state = {

  };
  config = {
    navigationBarTitleText: '切换学校'
  };
  componentDidShow() {
    this.props.dispatch({
      type: 'school/getSchoolList',
    }).then(() => {

    })
  }
  handleSchoolChange = (id) => {
    this.props.dispatch({
      type: 'account/changeSchool',
      payload: {
        schoolId: id,
      }
    }).then(() => {
      Taro.atMessage({
        'message': '切换成功',
        'type': 'success',
        duration: 3000,
      })
      Taro.redirectTo({
        url: '/pages/home/home_view?tabId=2'
      })
    })
  }
  render() {
    return (
      <SchoolList currentSchoolId={this.props.currentSchoolId} schoolListData={this.props.schoolList} onSchoolChange={this.handleSchoolChange} />
    )
  }
}

export default AccountSchoolView;
