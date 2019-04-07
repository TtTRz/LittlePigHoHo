import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtSearchBar, AtLoadMore, AtMessage, AtInput } from 'taro-ui'
import PropTypes from 'prop-types';

class AssociationList extends Taro.PureComponent {
  static propTypes = {
    associationListData: PropTypes.arrayOf(),
  };
  static defaultProps = {
    associationListData: [],
  };
  state = {
  };

  render() {
    return (
      <View>
        {console.log(this.props.associationListData)}
        {this.props.associationListData !== 0 && <AtList>
          {this.props.associationListData.map((item) => {
            if(item.role === 2) {
              return <AtListItem
                title={item.name}
                arrow='right'
                iconInfo={{ size: 25, color: '#FFC82C', value: 'star-2', }}
              />
            } else if (item.role === 1) {
              return <AtListItem
                title={item.name}
                arrow='right'
                iconInfo={{ size: 25, color: 'F7F7F7', value: 'star-2', }}
              />
            }
            return <AtListItem
              title={item.name}
              arrow='right'
            />
          })}
        </AtList>}
        {this.props.associationListData.length === 0 && <AtLoadMore
          status={"noMore"}
          noMoreText='您暂未加入组织'
        />}
      </View>
    )
  }
}

export default AssociationList;
