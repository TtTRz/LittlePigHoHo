import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtRadio, AtMessage, message, AtToast, AtIcon, AtGrid} from 'taro-ui'
import PropTypes from 'prop-types'

import './actuib_grid_view.scss';

class ActionGridView extends Taro.PureComponent{
  static propTypes = {
    type: PropTypes.string.isRequired,
  };
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
    title: '我的部门'
  },{
    key: 'add_association',
    iconClassname: '.create-asso',
    title: '创建组织',
    url: '/pages/association/association_create_view'

  }];
  action_list = [{
    key: 'check',
    iconClassname: '.check',
    title: '考勤',
  }, {
    key: 'notices',
    iconClassname: '.notices',
    title: '发布通知',
  }, {
    key: 'assignment',
    iconClassname: '.mission',
    title: '发布任务',
  }];

  handleItemClick = (item) => {
    console.log(item)
    Taro.navigateTo({
      url: item.url,
    })
  }
  render() {
    return (
     <View>
       {this.props.type === 'association' &&  <View className='action-grid-view'>
         <View className='grid-title'>
           组织
         </View>
         <View className='at-row at-row--wrap'>
           {this.association_list.map((item) => {
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
           {this.action_list.map((item) => {
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
