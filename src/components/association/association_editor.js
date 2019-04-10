import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import { AtInput, AtTextarea, AtButton } from "taro-ui";
import get from 'lodash.get'
import './association_editor.scss';
import noop from 'lodash.noop';
class AssociationEditor extends Taro.PureComponent {
  static propTypes = {
    association: PropTypes.shape({}),
    onCreateClick: PropTypes.func,
    onDelClick: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    editor: PropTypes.bool,
  };
  static defaultProps = {
    editor: false,
    onCreateClick: noop,
    association: {},
    onDelClick: noop,
  };
  state = {
    canSubmit: false,
    ...this.props.association,
  };
  handleInputChange = (keyName, value) => {
    if(keyName === 'description') {
      this.setState({
        ...this.state,
        [keyName]: value.target.value,
      })
    } else {
      if(keyName ==='name') {
        this.setState({
          canSubmit: (value !== "") && (this.state.shortname !== ""),
          [keyName]: value,
        })
      } else {
        this.setState({
          canSubmit: (value !== "") && (this.state.name !== ""),
          [keyName]: value,
        })
      }
    }
  };
  handleCreateClick = () => {
    this.props.onCreateClick({
      ...this.state,
    })
  }
  render() {
    return (
      <View className='association-editor'>
        <View className='input-area'>
          <AtInput
            className='input'
            name='name'
            title='组织名称'
            type='text'
            placeholder='请输入组织的名称'
            clear
            value={get(this.state, 'name', '')}
            onChange={this.handleInputChange.bind(this, 'name')}
          />
          <AtInput
            className='input'
            name='shortname'
            title='组织缩写'
            type='text'
            placeholder='请输入组织的缩写'
            clear
            value={get(this.state, 'shortname', '')}
            onChange={this.handleInputChange.bind(this, 'shortname')}
          />
          <View className='text-area'>
            <AtTextarea
              maxLength={200}
              height={200}
              placeholder='组织简介'
              value={get(this.state, 'description', '')}
              onChange={this.handleInputChange.bind(this, 'description')}
            />
          </View>
        </View>
        <View className='submit-button'>
          <AtButton loading={this.props.isLoading} disabled={this.props.isLoading || !this.state.canSubmit} type='primary' onClick={this.handleCreateClick}>{this.props.editor ? '确认修改' : '创建组织'}</AtButton>
          {this.props.editor && <AtButton
            loading={this.props.isLoading}
            disabled={this.props.isLoading}
            onClick={this.props.onDelClick}
          >
            删除
          </AtButton>
          }
        </View>
      </View>
    )
  }
}

export default AssociationEditor;
