import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import SchoolList from "../../components/school/school_list";


const mapStateToProps = (state) => {

  return {
    schoolList: state.school.list,
  }
};

@connect(mapStateToProps)
class AccountSchoolView extends Taro.PureComponent {
  state = {

  };
  config = {
    navigationBarTitleText: '切换学校'
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'school/getSchoolList',
    }).then(() => {

    })
  }
  render() {
    return (
      <SchoolList schoolListData={this.props.schoolList} />
    )
  }
}

export default AccountSchoolView;
