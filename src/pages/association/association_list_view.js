import Taro from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Picker } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtMessage, AtInput } from 'taro-ui'
import {connect} from "@tarojs/redux";
import PropTypes from 'prop-types';
import AssociationList from "../../components/association/association_list";
import AssociationView from "src/pages/association/association_view";

const mapStateToProps = (state) => {
  return {
    associationListData: state.association.list,
    schoolId: state.account.school_id,
  }
};

@connect(mapStateToProps)
class AssociationListView extends Taro.PureComponent {
  config = {
    navigationBarTitleText: '组织列表',

  };
  static propTypes = {
    associationListData: PropTypes.arrayOf(),
  };

  static defaultProps = {
    associationListData: [],
  };

  state = {

  };
  componentDidShow() {
    this.props.dispatch({
      type: 'association/getAssociationList',
      payload: {
        schoolId: this.props.schoolId,
      }
    })
  }
  handleSearchClick = (value) => {
    this.props.dispatch({
      type: 'association/getAssociationList',
      payload: {
        schoolId: this.props.schoolId,
        searchKey: value,
      }
    })
  };
  handleItemClick = (id) => {
    Taro.navigateTo({
      url: '/pages/association/association_view' + '?id=' + id,
    })
  };
  render() {
    return (
      <View>
        <AssociationList search  onItemClick={this.handleItemClick} associationListData={this.props.associationListData} onSearchClick={this.handleSearchClick} />
      </View>
    )
  }
}

export default AssociationListView;
