import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import AssociationList from "../../components/association/association_list";
import './association_list_view.scss';

const mapStateToProps = (state) => {
  return {
    myAssociationList: state.association.myList,
  }
};

@connect(mapStateToProps)
class MyAssociationListView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '组织'

  };
  componentDidShow() {
    this.props.dispatch({
      type: 'association/getAssociationListMe',
      payload: {
        schoolId: 3,
      }
    }).then(() => {

    })
  }
  handleItemClick = (id) => {
    Taro.navigateTo({
      url: '/pages/association/association_view' + '?id=' + id,
    })
  };
  render() {
    return (
      <View className='association-list-view'>
        <View className='header'>
          <View className='title'>
            您加入的协会
          </View>
        </View>
        <AssociationList me onItemClick={this.handleItemClick} associationListData={this.props.myAssociationList} />
      </View>
    )
  }
}

export default MyAssociationListView;
