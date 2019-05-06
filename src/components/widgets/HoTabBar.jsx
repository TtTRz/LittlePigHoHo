import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './HoTabBar.scss'


class HoTabBar extends Taro.PureComponent{

  TabList=[{
    iconName: 'message-icon',
    iconNameCurrent: 'message-icon-hover',
    title: '消息'
  }, {
    iconName: 'home-icon',
    iconNameCurrent: 'home-icon-hover',

    title: '主页'
  }, {
    iconName: 'account-icon',
    iconNameCurrent: 'account-icon-hover',

    title: '个人',
  }]
  render() {
    return (
      <View className='ho-tabbar-view'>
        <View className='at-row'>
          {this.TabList.map((item, index) => {
            return (
              <View className='at-col-4'>
                <View className='tabbar-item' onClick={this.props.onTabChange.bind(this, index)}>
                  <View className='icon'>
                    <View className={this.props.current === index ? item.iconNameCurrent : item.iconName}></View>
                  </View>
                  <View className='title'>
                    {item.title}
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default HoTabBar;
