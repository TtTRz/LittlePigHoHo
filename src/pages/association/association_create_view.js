import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import AssociationEditor from '../../components/association/association_editor';
import './association_create_view.scss'

const mapStateToProps = (state) => {

  return {
  }
};

@connect(mapStateToProps)
class AssociationEditorView extends Taro.PureComponent {

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
    isLoading: false,
  }
  handleCreateClick = (payload) => {
    this.setState({
      isLoading: true,
    })
    this.props.dispatch({
      type: 'association/addAssociation',
      payload: {
        ...payload,
        schoolId: 3,
      },
    }).then((result) => {
      this.setState({
        isLoading: false,
      })
      if(result) {
        Taro.atMessage({
          'message': '创建成功',
          'type': 'success',
          duration: 1000,
        })
        setTimeout(() => {
          Taro.navigateTo({
            url: '/pages/home/home_view'
          })
        }, 1500)
      } else {
        Taro.atMessage({
          'message': '创建失败',
          'type': 'error',
          duration: 1000,
        })
      }
    })
  }
  render() {
    return (
      <View className='association-create-view'>
        <View className='header'>
          <View className='title'>
            创建您的组织
          </View>
        </View>
        <AssociationEditor onCreateClick={this.handleCreateClick} isLoading={this.state.isLoading} />
        <AtMessage />
      </View>

    )
  }
}

export default AssociationEditorView;
