import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import { AtInput, AtTextarea, AtButton } from "taro-ui";
import './department_editor.scss';

class DepartmentEditor extends Taro.PureComponent {


  static propTypes = {
    department: PropTypes.shape({}),
    onCreateClick: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    onCreateClick: null,
    department: {
      name: '',
      shortname: '',
      description: '',
    },
  };
  state = {
    canSubmit: false,
    ...this.props.department,
  };
  handleInputChange = (keyName, value) => {
    if(keyName === 'description') {
      this.setState({
        ...this.state,
        [keyName]: value.target.value,
      })
    } else if(keyName === 'name') {
      this.setState({
        ...this.state,
        canSubmit: (value !== "") && (this.state.shortname !== ""),
        [keyName]: value,
      })
    } else {
      this.setState({
        ...this.state,
        canSubmit: (value !== "") && (this.state.name !== ""),
        [keyName]: value,
      })
    }
  };
  handleCreateClick = () => {
    this.props.onCreateClick({
      ...this.state,
    })
  }
  render() {
    return (
      <View className='department-editor'>
        <View className='input-area'>
          <AtInput
            className='input'
            name='name'
            title='部门名称'
            type='text'
            placeholder='请输入部门的名称'
            clear
            value={this.state.name}
            onChange={this.handleInputChange.bind(this, 'name')}
          />
          <AtInput
            className='input'
            name='shortname'
            title='部门缩写'
            type='text'
            placeholder='请输入部门的缩写'
            clear
            value={this.state.shortname}
            onChange={this.handleInputChange.bind(this, 'shortname')}
          />
          <View className='text-area'>
            <AtTextarea
              maxLength={200}
              height={200}
              placeholder='部门简介'
              value={this.state.description}
              onChange={this.handleInputChange.bind(this, 'description')}
            />
          </View>
        </View>
        {console.log(this.state)}
        <View className='submit-button'>
          <AtButton loading={this.props.isLoading} disabled={this.props.isLoading || !this.state.canSubmit} type='primary' onClick={this.handleCreateClick}>新增部门</AtButton>
        </View>
      </View>
    )
  }
}

export default DepartmentEditor;
