import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtSearchBar, AtLoadMore, AtMessage, AtInput } from 'taro-ui'
import PropTypes from 'prop-types';

class SchoolList extends Taro.PureComponent {
  static propTypes = {
    schoolListData: PropTypes.arrayOf(),
  };
  static defaultProps = {
    schoolListData: [],
  };
  state = {
    searchValue: '',
  };
  handleValueChange = (value) => {
    this.setState({
      searchValue: value,
    })
  };
  handleSchoolClick = (id) => {

  }
  render() {
    return (
      <View>
        <AtSearchBar value={this.state.searchValue} onChange={this.handleValueChange}/>
        {this.props.schoolListData.length !== 0 && <AtList>
          {this.props.schoolListData.map((item) => {
            return <AtListItem
              title={item.name}
              arrow='right'
              onClick={this.handleSchoolClick.bind(this, item.id)}
            />
          })}
        </AtList>}
        {this.props.schoolListData.length === 0 && <AtLoadMore
          status={"noMore"}
          noMoreText='暂无学校信息'
        />}

      </View>
    )
  }
}

export default SchoolList;
