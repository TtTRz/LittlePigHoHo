import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtRadio, AtMessage, message, AtToast, AtIcon, AtGrid} from 'taro-ui'
import PropTypes from 'prop-types'

class ActionGridView extends Taro.PureComponent{


  state = {

  };
  GRID = [{
    key: 'association',
    iconInfo: {
      size: 28,
      value: 'user',
      prefixClass: 'at-icon',
      color: '#40a9ff'
    },
    value: '我的组织'
  }, {
    key: 'create_association',
    iconInfo: {
      size: 28,
      value: 'add-circle',
      prefixClass: 'at-icon',
      color: '#40a9ff'
    },
    value: '创建组织'
  }];
  GRID_PATH = {
    create_association: '/pages/association/association_create_view'
  }
  handleGridClick = (item) => {
    console.log(item)
    Taro.navigateTo({
      url: this.GRID_PATH[item.key]
    })
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
