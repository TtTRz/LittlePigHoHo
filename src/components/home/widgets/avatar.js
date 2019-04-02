import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components'

import './avatar.scss'

class HoAvatar extends Taro.PureComponent{

  render() {
    return (
      <Image
        class='hoavatar-view'
        src={this.props.url}
      />
    )
  }
}

export default HoAvatar;
