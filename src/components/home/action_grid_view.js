import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtRadio, AtMessage, message, AtToast, AtIcon, AtGrid} from 'taro-ui'
import PropTypes from 'prop-types'
import noop from 'lodash.noop'
import './actuib_grid_view.scss';
import {connect} from "@tarojs/redux";

const mapStateToProps = (state) => {

  return {
    account: state.account,
    associationList: state.association.list,
    association: state.association.myEntity,
    departmentList: state.department.list,
    isLoading: state.loading.global,
  }
};

@connect(mapStateToProps)
class ActionGridView extends Taro.PureComponent{
  static propTypes = {
    type: PropTypes.string.isRequired,
    associationId: PropTypes.string,
    onCreateNoticesClick: PropTypes.func,
    role: PropTypes.number.isRequired,
  };
  static defaultProps = {
    associationId: -1,
    onCreateNoticesClick: noop,
  }
  state = {

  };

  association_list = [{
    key: 'association-list',
    iconClassname: '.all-asso-list',
    title: '全部组织',
    url: '/pages/association/association_list_view'
  }, {
    key: 'my-department',
    iconClassname: '.department',
    title: '部门',
    url: '/pages/association/department/department_view?departmentId=',
  }, {
    key: 'add_association',
    iconClassname: '.create-asso',
    title: '创建组织',
    url: '/pages/association/association_create_view'
  }, this.props.role === 2 ? {
    key: 'association-manage',
    iconClassname: '.manage',
    title: '管理',
    url: '/pages/association/association_view?id=',
  } : null];

  handleItemClick = (item) => {
    if(item.key==='association-manage') {
      const url = item.url + this.props.association.id;
      Taro.navigateTo({
        url: url
      })
    } else if(item.key === 'notices') {
      this.props.onCreateNoticesClick();
    } else if (item.key === 'my-department'){
      // if(this.props.)
    } else {
      Taro.navigateTo({
        url: item.url,
      })
    }

  }
  renderAssoList = () => {
    let association_list = [{
      key: 'association-list',
      iconClassname: '.all-asso-list',
      title: '全部组织',
      url: '/pages/association/association_list_view'
    }, {
      key: 'my-department',
      iconClassname: '.department',
      title: '部门'
    }, {
      key: 'add_association',
      iconClassname: '.create-asso',
      title: '创建组织',
      url: '/pages/association/association_create_view'
    }];
    if(this.props.role === 2) {
      association_list.push({
        key: 'association-manage',
        iconClassname: '.manage',
        title: '管理',
        url: '/pages/association/association_view?id=',
      })
    }
    return association_list;
  }
  renderActionList = () => {
    let action_list_manage = [{
      key: 'notices',
      iconClassname: '.notices',
      title: '发布通知',
    }, {
      key: 'assignment',
      iconClassname: '.mission',
      title: '发布任务',
    }]
    let action_list = [{
      key: 'check',
      iconClassname: '.check',
      title: '考勤',
    }];
    if(this.props.role !== 0) {
      action_list_manage.forEach((item) => {
        action_list.push(item)
      })
    }
    return action_list;
  }
  render() {
    const association_list = this.renderAssoList();
    const action_list = this.renderActionList();
    return (
     <View>
       {console.log(this.props.role)}
       {this.props.type === 'association' &&  <View className='action-grid-view'>
         <View className='grid-title'>
           组织
         </View>
         <View className='at-row at-row--wrap'>
           {association_list.map((item) => {
             return (
               <View className='at-col at-col-3'>
                 <View className='grid-item' onClick={this.handleItemClick.bind(this, item)} >
                   <View className={item.iconClassname}></View>
                   <View className='item-title'>{item.title}</View>
                 </View>
               </View>
             )
           })}
         </View>
       </View>}
       {this.props.type === 'action' &&  <View className='action-grid-view'>
         <View className='grid-title'>
           功能
         </View>
         <View className='at-row at-row--wrap'>
           {action_list.map((item) => {
             return (
               <View className='at-col at-col-3'>
                 <View className='grid-item' onClick={this.handleItemClick.bind(this, item)} >
                   <View className={item.iconClassname}></View>
                   <View className='item-title'>{item.title}</View>
                 </View>
               </View>
             )
           })}
         </View>
       </View>}
     </View>
    )
  }
}

export default ActionGridView;
