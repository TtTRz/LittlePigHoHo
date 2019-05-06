import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtActivityIndicator, AtIcon, AtTabBar, AtList, AtListItem, AtSearchBar, AtLoadMore, AtMessage, AtInput } from 'taro-ui'
import PropTypes from 'prop-types';

class AssociationList extends Taro.PureComponent {
  static propTypes = {
    onSearchClick: PropTypes.func,
    associationListData: PropTypes.arrayOf(),
    search: PropTypes.bool,
    onItemClick: PropTypes.func.isRequired,
    me: PropTypes.bool,
    isLoading: PropTypes.bool,
  };
  static defaultProps = {
    associationListData: [],
    search: false,
    me: false,
  };
  state = {
    searchValue: '',
  };
  handleSearchChange = (value) => {
    if(value === "") {
      this.handleSearchClick()
    }
    this.setState({
      searchValue: value,
    })
  };
  handleSearchClick = () => {
    this.props.onSearchClick(this.state.searchValue);
}
  render() {
    return (
      <View className='association-list'>
        {this.props.search && <View style={{ height: '42px'}}>
          <AtSearchBar
            fixed
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            onActionClick={this.handleSearchClick}
            onConfirm={this.handleSearchClick}
          />
          </View>}
        {this.props.isLoading ? <View style={{ position: 'relative', marginTop: '5em'}}>
          <AtActivityIndicator mode='center'></AtActivityIndicator>
        </View>: <View>
          {this.props.associationListData !== 0 && <AtList>
            {this.props.associationListData.map((item) => {
              if(item.role === 2 && this.props.me) {
                return <AtListItem
                  onClick={this.props.onItemClick.bind(this, item.id)}
                  title={item.name}
                  arrow='right'
                  iconInfo={{ size: 25, color: '#FFC82C', value: 'star-2', }}
                />
              } else if (item.role === 1 && this.props.me) {
                return <AtListItem
                  onClick={this.props.onItemClick.bind(this, item.id)}
                  title={item.name}
                  arrow='right'
                  iconInfo={{ size: 25, color: 'F7F7F7', value: 'star-2', }}
                />
              }
              return <AtListItem
                onClick={this.props.onItemClick.bind(this, item.id)}
                title={item.name}
                arrow='right'
              />
            })}
          </AtList>}
        </View>}
        {this.props.associationListData.length === 0 && <AtLoadMore
          status='noMore'
          noMoreText={this.props.me ? '您暂未加入组织' : '暂无组织'}
        />}
      </View>
    )
  }
}

export default AssociationList;
