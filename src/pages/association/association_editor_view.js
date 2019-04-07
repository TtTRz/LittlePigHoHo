import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';


const mapStateToProps = (state) => {

  return {
  }
};

@connect(mapStateToProps)
class AssociationEditorView extends Taro.PureComponent {

  config = {
    navigationBarTitleText: '新建学校'
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

  render() {
    return (
      <View>

      </View>
    )
  }
}

export default AssociationEditorView;
