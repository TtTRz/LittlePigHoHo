import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtRadio, AtMessage, message, AtToast, AtIcon, AtGrid} from 'taro-ui'
import PropTypes from 'prop-types'

class ActionGridView extends Taro.PureComponent{


  state = {

  };
  GRID = [{
    key: 'organization',
    iconInfo: {
      size: 28,
      value: 'user',
      prefixClass: 'at-icon',
      color: '#40a9ff'
    },
    value: '我的组织'
  }, {
    key: 'create_organization',
    iconInfo: {
      size: 28,
      value: 'add-circle',
      prefixClass: 'at-icon',
      color: '#40a9ff'
    },
    value: '创建组织'
  }];

  handleGridClick = (item) => {

  };

  render() {
    return (
      <AtGrid
        data={this.GRID}
        onClick={this.handleGridClick.bind(this)}
      />
    )
  }
}

export default ActionGridView;
