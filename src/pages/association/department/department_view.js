import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtAccordion, AtMessage, AtFloatLayout,AtTabs,AtTabsPane, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import Img1 from '../../../static/img/lphh.jpeg'
import get from 'lodash.get'
import DepartmentGrid from "src/pages/association/association_view";
import '../association_view.scss'
import HoAvatar from '../../../components/home/widgets/avatar'

const mapStateToProps = (state) => {

  return {
    schoolId: state.account.school_id,
    associationId: state.association.entity.id,
    department: state.department.entity,
  }

};

@connect(mapStateToProps)
class DepartmentView extends Taro.PureComponent {

  static defauleProps = {
    canManage: true,
    isMembers: true,
  };

  SIDE_LIST = [{
    title: '成员',
  }, {
    title: '设置'
  }];

  componentDidShow() {
    this.props.dispatch({
      type: 'department/getDepartmentEntity',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.associationId,
        departmentId: this.$router.params.departmentId,
      },
    })
  }
  state = {
    currentTab: 0,
    currentSide: 0,

  }
  renderTabList = () => {
    let TAB_LIST = [{
      title: '简介'
    }];
    if(this.props.isMember) {
      TAB_LIST.push({
        title: '成员'
      })
    }
    if(this.props.canManage) {
      TAB_LIST.push({
        title: '管理'
      })
    }
    return TAB_LIST;
  };
  handleTabChange = value => {
    this.setState({
      ...this.state,
      currentTab: value,
    })
  }
  handleSideChange = value => {
    this.setState({
      ...this.state,
      currentSide: value,
    })
  }
  render() {
    const TAB_LIST = this.renderTabList();
    return (
      <View className='association-view'>
        <View className='association-header'>
          <View className='action-bar'>
            <View>

            </View>
            <View className='button'>
            </View>
          </View>
          <View className='title'>
            {get(this.props, 'department.name', '无')}
          </View>
        </View>
        <View className='association-content'>
          <AtTabs swipeable={false} current={this.state.currentTab} tabList={TAB_LIST} onClick={this.handleTabChange.bind(this)}>
            <AtTabsPane current={this.state.currentTab} index={0} >
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >{get(this.props,'association.department', '暂无简介')}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTab} index={1}>

            </AtTabsPane>
            {this.props.canManage && <AtTabsPane current={this.state.currentTab} index={2}>
              <View>
                <AtTabs
                  current={this.state.currentSide}
                  tabList={this.SIDE_LIST}
                  onClick={this.handleSideChange.bind(this)}
                  scroll
                  height='500px'
                  tabDirection='vertical'
                >
                  <AtTabsPane tabDirection='vertical' current={this.state.currentSide} index={0}>
                    {/*<MemberList departmentData={this.props.departmentList} memberData={this.props.membersList} onDelMembers={this.handleDelMembers}/>*/}

                  </AtTabsPane>

                  <AtTabsPane tabDirection='vertical' current={this.state.currentSide} index={1}>
                    234
                  </AtTabsPane>

                </AtTabs>
              </View>
            </AtTabsPane>}
          </AtTabs>
        </View>
      </View>
    )
  }
}
export default DepartmentView;
