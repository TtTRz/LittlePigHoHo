import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import AssociationEditor from '../../components/association/association_editor';
import './association_create_view.scss'

const mapStateToProps = (state) => {
  const isLoading = state.loading.models['association'];
  return {
    isLoading,
  }
};

@connect(mapStateToProps)
class AssociationEditorView extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '创建组织'
  };
  componentWillMount() {

  }

  handleCreateClick = (payload) => {

    this.props.dispatch({
      type: 'association/addAssociation',
      payload: {
        ...payload,
        schoolId: 3,
      },
    }).then((result) => {
      console.log(result)
      if(result === 1) {
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
      } else {
        Taro.atMessage({
          'message': '协会名重复',
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
        <AssociationEditor onCreateClick={this.handleCreateClick} isLoading={this.props.isLoading} />
        <AtMessage />
      </View>

    )
  }
}

export default AssociationEditorView;
