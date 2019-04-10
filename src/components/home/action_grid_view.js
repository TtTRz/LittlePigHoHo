import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtRadio, AtMessage, message, AtToast, AtIcon, AtGrid} from 'taro-ui'
import PropTypes from 'prop-types'

class ActionGridView extends Taro.PureComponent{


  state = {

  };
  GRID = [{
    key: 'add_association',
    iconInfo: {
      size: 28,
      value: 'add-circle',
      prefixClass: 'at-icon',
      color: '#40a9ff'
    },
    value: '加入组织'
  }, {
    key: 'my_association',
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
    add_association: '/pages/association/association_list_view',
    create_association: '/pages/association/association_create_view',
    my_association: '/pages/association/my_association_list_view',
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
