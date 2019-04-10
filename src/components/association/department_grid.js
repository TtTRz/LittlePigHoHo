import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtRadio, AtMessage, message, AtToast, AtIcon, AtGrid} from 'taro-ui'
import PropTypes from 'prop-types'

class DepartmentGrid extends Taro.PureComponent {
  static propTypes = {
    association: PropTypes.arrayOf(PropTypes.shape({})),
    departmentData: PropTypes.arrayOf(PropTypes.shape({})),
    canManage: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    departmentData: [],
  }
  state = {
  }
  handleClick = (item) => {

    if(item.key === 'add') {
      Taro.navigateTo({
        url: '/pages/association/department/department_create_view' + '?aid=' + this.props.association.id,
      })
    } else {

    }
  };
  renderDepartmentGrid = () => {
    let departmentData = [];
   if(this.props.canManage) {
     departmentData.push({
       key: 'add',
       iconInfo: {
         size: 28,
         value: 'add-circle',
         prefixClass: 'at-icon',
         color: '#40a9ff'
       },
       value: '新增',
     })
   }
    this.props.departmentData.forEach((item) => {
      departmentData.push({
        key: item.id,
        iconInfo: {
          size: 28,
          value: 'user',
          prefixClass: 'at-icon',
          color: '#40a9ff'
        },
        value: item.name,
      })
    })
    return departmentData;
  }
  render() {
    const gridData = this.renderDepartmentGrid();
    return (
      <AtGrid
        data={gridData}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}

export default DepartmentGrid;
