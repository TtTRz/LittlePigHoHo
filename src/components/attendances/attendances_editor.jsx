import Taro from '@tarojs/taro'
import { View, Button, Text, Picker, Map} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtListItem, AtProgress,AtSwitch, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './attendances_editor.scss'
import moment from "moment";

const mapStateToProps = (state) => {
  return {

  }
};

@connect(mapStateToProps)
class AttendancesEditor extends Taro.PureComponent {

  state = {

  }


  render() {
    return (
      
    )
  }
}

export default AttendancesEditor;
