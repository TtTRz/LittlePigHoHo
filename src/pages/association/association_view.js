import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtAccordion, AtMessage, AtFloatLayout,AtTabs,AtTabsPane, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import './association_view.scss'
import Img1 from '../../static/img/lphh.jpeg'
import HoAvatar from "../../components/home/widgets/avatar";
import MemberList from "../../components/association/member_list";
import DepartmentGrid from "../../components/association/department_grid";
import AssociationEditor from "../../components/association/association_editor";
import get from 'lodash.get';



const mapStateToProps = (state) => {
  let canManage = false;
  let isMember = false;
  if(state.account.id !== "" && state.association.entity!=={}){
    const associationId = state.association.entity.id;
    state.account.associations.map((item) => {
      if(associationId === item.association_id) {
        if(item.role === 2 ) {
          canManage = true;
        }
        isMember =true;
      }
    });
  }
  const schoolId = state.account.school_id;
  return {
    association: state.association.entity,
    canManage,
    isMember,
    membersList: state.association.membersList,
    departmentList: state.association.departmentList,
    schoolId,
  }
};


@connect(mapStateToProps)
class AssociationView extends Taro.PureComponent {

  TAB_LIST = [{
    title: '简介'
  }, {
    title: '部门'
  }, {
    title: '管理'
  }];
  SIDE_LIST = [{
    title: '协会码',
  }, {
    title: '成员'
  }, {
    title: '设置',
  }]
  componentDidShow() {
    this.props.dispatch({
      type: 'association/getAssociationEntity',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.$router.params.id,
      }
    }).then((data) => {
      if(get(data, 'choosing_code', false)) {
        this.props.dispatch({
          type: 'association/getAssociationMembersList',
          payload: {
            schoolId: this.props.schoolId,
            associationId: this.$router.params.id,
          }
        })
        this.props.dispatch({
          type: 'association/getDepartmentList',
          payload: {
            schoolId: this.props.schoolId,
            associationId: this.$router.params.id,
          }
        })
      }
    })

  }
  componentDidMount() {
    this.props.dispatch({
      type: 'association/getAssociationEntity',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.$router.params.id,
      }
    }).then((data) => {
      if(get(data, 'choosing_code', false)) {
        this.props.dispatch({
          type: 'association/getAssociationMembersList',
            payload: {
              schoolId: this.props.schoolId,
              associationId: this.$router.params.id,
            }
        })
        this.props.dispatch({
          type: 'association/getDepartmentList',
          payload: {
            schoolId: this.props.schoolId,
            associationId: this.$router.params.id,
          }
        })
      }
    })
  }
  state = {
    isOpened: false,
    choosing_code: '',
    currentTab: 0,
    currentSide:0,
    apartmentOpen: [
      false,
      true,
    ],

  }
  handleJoinClick = () => {
    this.setState({
      isOpened: true,
      choosing_code: '',
    })
  };
  handleClose = () => {
    this.setState({
      isOpened: false,
      choosing_code: '',
    })
  };
  handleInputChange = (keyName, value) => {
    this.setState({
      ...this.state,
      [keyName]: value,
    })
  }
  handleSubmitJoinClick = () => {
    this.props.dispatch({
      type: 'association/joinAssociation',
      payload: {
        schoolId: this.prosp.schoolId,
        associationId: this.props.association.id,
        choosing_code: this.state.choosing_code,
      }
    }).then((status) => {
      if(status === 0) {
        Taro.atMessage({
          message: '加入成功',
          type: 'success'
        })

        this.setState({
          isOpened: false,
          choosing_code: '',
        })
      } else if (status === -1) {
        Taro.atMessage({
          message: '协会码错误',
          type: 'error',
        })
      }
    })
  }
  handleDelSubmitClick = () => {
    this.props.dispatch({
      type: 'association/delAssociation',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
      }
    }).then(() => {
      Taro.atMessage({
        message: '删除成功',
        type: 'success'
      })
      Taro.redirectTo({
        url: '/pages/home/home_view',
      })
    })
  };
  handleEditSubmitClick = (payload) => {
    this.props.dispatch({
      type: 'association/editAssociation',
      payload: {
        ...payload,
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
      }
    }).then((result) => {
      if(result) {
        Taro.atMessage({
          message: '修改',
          type: 'success'
        })
        this.props.dispatch({
          type: 'association/getAssociationEntity',
          payload: {
            schoolId: this.props.schoolId,
            associationId: this.props.association.id,
          }
        });

      }
    })
  }
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
  handleDelMembers = (id)=> {
    console.log(123)
    this.props.dispatch({
      type: 'association/delAssociationMembers',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.props.association.id,
        accountId: id,
      }
    })
    this.props.dispatch({
      type: 'association/getAssociationMembersList',
      payload: {
        schoolId: this.props.schoolId,
        associationId: this.$router.params.id,
      }
    })
  };
  renderTabList = () => {
    let TAB_LIST = [{
      title: '简介'
    }];
    if(this.props.isMember) {
      TAB_LIST.push({
        title: '部门'
      })
    }
    if(this.props.canManage) {
      TAB_LIST.push({
        title: '管理'
      })
    }
    return TAB_LIST;
  }

  render() {
    const TAB_LIST = this.renderTabList()
    return (
      <View className='association-view'>

         <View className='association-header'>
           <View className='action-bar'>
             <View>

             </View>
             <View className='button'>
               {!this.props.isMember && <AtButton
                 size='small'
                 type='secondary'
                 onClick={this.handleJoinClick}
               >
                 加入
               </AtButton>}
             </View>
           </View>
          <View className='avatar'>
            <HoAvatar
              url={Img1}
            />
          </View>
          <View className='title'>
            {this.props.association.name}
          </View>
        </View>
        <View className='association-content'>
          <AtTabs swipeable={false} current={this.state.currentTab} tabList={TAB_LIST} onClick={this.handleTabChange.bind(this)}>
            <AtTabsPane current={this.state.currentTab} index={0} >
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >{this.props.association.description}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTab} index={1}>
              <View>
                <DepartmentGrid
                  canManage={this.props.canManage}
                  departmentData={this.props.departmentList}
                  association={this.props.association}
                />
              </View>
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
                    <View style='font-size:18px;text-align:center;'>协会码: {this.props.association.choosing_code}</View>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={this.state.currentSide} index={1}>
                    <MemberList departmentData={this.props.departmentList} memberData={this.props.membersList} onDelMembers={this.handleDelMembers}/>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={this.state.currentSide} index={2}>
                    <AssociationEditor editor onDelClick={this.handleDelSubmitClick} isLoading={this.props.isLoading} onCreateClick={this.handleEditSubmitClick} association={this.props.association} />
                  </AtTabsPane>

                </AtTabs>
              </View>
            </AtTabsPane>}
          </AtTabs>
        </View>
        <AtFloatLayout isOpened={this.state.isOpened} title='协会码' onClose={this.handleClose.bind(this)}>
          <AtInput
            name='choosing_code'
            onChange={this.handleInputChange.bind(this, 'choosing_code')}
            value={this.state.choosing_code}
            placeholder='请输入协会码'
            type='number'
            clear
            border={false}
          >
          </AtInput>
          <AtButton
            type='primary'
            onClick={this.handleSubmitJoinClick}
            full
          >
            确认
          </AtButton>
        </AtFloatLayout>
        <AtMessage />
      </View>
    );
  }
}

export default AssociationView;
