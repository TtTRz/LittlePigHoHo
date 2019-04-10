import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtButton, AtDrawer, AtIcon, AtTabBar, AtList, AtListItem, AtAccordion, AtMessage, AtFloatLayout,AtTabs,AtTabsPane, AtInput } from 'taro-ui'
import PropTypes from 'prop-types';
import get from 'lodash.get'
import noop from 'lodash.noop'
import set from 'lodash.set'
import HoAccordion from "../../components/widgets/HoAccordion";


class MemberList extends Taro.PureComponent {


  static propTypes = {
    departmentData: PropTypes.arrayOf(PropTypes.shape({})),
    memberData: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    departmentData: [],
    memberData: [],
  };

  state = {

  };

  renderData = () => {
    let departmentData = this.props.departmentData;
    departmentData = [
      ...departmentData,
      {
        name: '其他'
      }
    ];
    departmentData = departmentData.map((d) => {
      return {
        ...d,
        members: [],
      }
    })
    this.props.memberData.map((item) => {
      if(get(item, 'department', null)!==null) {
        departmentData.forEach((de) => {
          if (de.id === item.department.id) {
            de.members.push(item);
          }
        })
      } else {
        (departmentData[departmentData.length -1].members).push(item)
      }
    })
    return departmentData;
  }
  render() {
    const data = this.renderData();
    return (
      <View>
        {data.map((item) => {
          return (
            <HoAccordion department={item} />
          )
        })}
      </View>
    )
  };
}

export default MemberList;
