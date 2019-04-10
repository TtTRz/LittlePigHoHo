import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtSearchBar, AtLoadMore, AtMessage, AtInput } from 'taro-ui'
import PropTypes from 'prop-types';
import {parse} from "path-to-regexp";

class SchoolList extends Taro.PureComponent {
  static propTypes = {
    schoolListData: PropTypes.arrayOf(),
    onSchoolChange: PropTypes.func.isRequired,
    currentSchoolId: PropTypes.number.isRequired,
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

  render() {
    return (
      <View>
        <AtSearchBar value={this.state.searchValue} onChange={this.handleValueChange} />
        {this.props.schoolListData.length !== 0 && <AtList>
          {this.props.schoolListData.map((item) => {
            if(parseInt(this.props.currentSchoolId, 10) === parseInt(item.id, 10)) {
              return <AtListItem
                title={item.name}
                arrow='right'
                iconInfo={{ size: 25, color: '#FFC82C', value: 'star-2', }}
                onClick={this.props.onSchoolChange.bind(this, item.id)}
              />
            }
            return <AtListItem
              title={item.name}
              arrow='right'
              onClick={this.props.onSchoolChange.bind(this, item.id)}
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
