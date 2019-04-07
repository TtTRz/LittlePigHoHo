import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import { AtInput, AtTextarea, AtButton } from "taro-ui";
import './association_editor.scss';

class AssociationEditor extends Taro.PureComponent {
  static propTypes = {
    Association: PropTypes.shape({}),
    onCreateClick: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    onCreateClick: null,
    association: {
      name: '',
      shortname: '',
      description: '',
    },
  };
  state = {
    canSubmit: false,
    association: this.props.Association,
  };
  handleInputChange = (keyName, value) => {
    if(keyName === 'description') {
      this.setState({
        ...this.state,
        association: {
          ...this.state.association,
          [keyName]: value.target.value,
        }
      })
    } else {
      if(keyName ==='name') {
        this.setState({
          canSubmit: (value !== "") && (this.state.association.shortname !== ""),
          association: {
            ...this.state.association,
            [keyName]: value,
          }
        })
      } else {
        this.setState({
          canSubmit: value !== "" && this.state.association.name !== "",
          association: {
            ...this.state.association,
            [keyName]: value,
          }
        })
      }
    }
  };
  handleCreateClick = () => {
    this.props.onCreateClick({
      ...this.state.association,
    })
  }
  render() {
    return (
      <View className='association-editor'>
        <View className='input-area'>
          <AtInput
            className='input'
            name='associationname'
            title='组织名称'
            type='text'
            placeholder='请输入组织的名称'
            clear
            value={this.state.association.name}
            onChange={this.handleInputChange.bind(this, 'name')}
          />
          <AtInput
            className='input'
            name='shortname'
            title='组织缩写'
            type='text'
            placeholder='请输入组织的缩写'
            clear
            value={this.state.association.shortname}
            onChange={this.handleInputChange.bind(this, 'shortname')}
          />
          <View className='text-area'>
            <AtTextarea
              maxLength={200}
              height={200}
              placeholder='组织简介'
              value={this.state.association.description}
              onChange={this.handleInputChange.bind(this, 'description')}
            />
          </View>
        </View>
        <View className='submit-button'>
          <AtButton loading={this.props.isLoading} disabled={this.prop.isLoading || !this.state.canSubmit} type='primary' onClick={this.handleCreateClick}>创建组织</AtButton>
        </View>
      </View>
    )
  }
}

export default AssociationEditor;
