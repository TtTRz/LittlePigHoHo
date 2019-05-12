import Taro from '@tarojs/taro'
import { View, Button, Text, Picker} from "@tarojs/components";
import { connect } from '@tarojs/redux';
import {AtActivityIndicator, AtButton, AtCheckbox, AtProgress, AtIcon, AtTextarea, AtInput} from 'taro-ui'
import './create_notice_view.scss'
import moment from "moment";

const mapStateToProps = (state) => {

  return {
    account: state.account,
    associationList: state.association.list,
    association: state.association.myEntity,
    // departmentList: state.department.list,
    isLoading: state.loading.global,
  }
};

@connect(mapStateToProps)
class CreateNoticeView extends Taro.PureComponent{
  state = {
    percent: 0,
    departmentCheckedList: [],
    content: '',
    title: '',
    startTimeSel: '未选择',
    endTimeSel: '未选择',
    startDateSel: '未选择',
    endDateSel:'未选择',
    status: 'progress',
  }

  handleSubmitClick = () => {
    const start = this.state.startDateSel+" "+this.state.startTimeSel+":00";
    const end = this.state.endDateSel+" "+this.state.endTimeSel+":00";
    const startMoment = moment(start, 'YYYY-MM-DD HH:mm:ss');
    const endMoment = moment(end, 'YYYY-MM-DD HH:mm:ss');
    this.props.dispatch({
      type: 'notices/addNotices',
      payload: {
        title: this.state.title,
        content: this.state.content,
        start_time: startMoment.format('X'),
        end_time: endMoment.format('X'),
        schoolId: this.props.account.school_id,
        associationId: this.props.association.id,
      }
    }).then(() => {
      Taro.showToast('发布成功')
      this.setState({
        status: 'success'
      }, () => {
        if(!this.props.isLoading) {
          setTimeout(() => {
            Taro.redirectTo({
              url: '/pages/notices/notices_list_view',
            })
          }, 1000)
        }
      })
    })
  }
  updatePercent = () => {
    let percent = 0;
    if(this.state.title !== '') {
      percent += 30;
    }
    if(this.state.content !== '') {
      percent += 30;
    }
    if(this.state.startDateSel !== '未选择') {
      percent += 10;
    }
    if(this.state.startTimeSel !== '未选择') {
      percent += 10;
    }
    if(this.state.endTimeSel !== '未选择') {
      percent += 10;
    }
    if(this.state.endDateSel !== '未选择') {
      percent += 10;
    }
    this.setState({
      percent: percent,
    })
  }
  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: keyName ==='content' ? value.target.value : value,
    }, () => {
      this.updatePercent();
    })
  }
  handlePickerChange = (keyName, e) => {
    this.setState({
      [keyName]: e.detail.value
    },() => {
      this.updatePercent();
    })
  }
  render(){
     return (
       <View className='create-notice-view'>
         <View className='progress-bar'>
           <View style={{ padding: '.5em'}}>
             <AtProgress percent={this.state.percent} status={this.state.status} />
           </View>
         </View>
         <View className='content'>
           <View className='title'>
             通知信息
           </View>
           <View className='title-input'>
             <AtInput
               name='title'
               title='标题'
               type='text'
               placeholder='输入通知标题'
               value={this.state.title}
               onChange={this.handleInputChange.bind(this, 'title')}
             />
             <View className='text-area'>
               <AtTextarea
                 value={this.state.content}
                 onChange={this.handleInputChange.bind(this, 'content')}
                 placeholder='请输入您发布的通知'
                 height={400}
               />
             </View>
           </View>
           <View className='title'>
             持续时间
           </View>
           <View className='time-picker'>
             <Picker mode='date' onChange={this.handlePickerChange.bind(this,'startDateSel')}>
               <View className='picker'>
                 <View className='label'>
                   开始日期:
                 </View>
                 <View className='value'>
                   {this.state.startDateSel}
                 </View>
               </View>
             </Picker>
             <Picker mode='time' onChange={this.handlePickerChange.bind(this,'startTimeSel')}>
               <View className='picker'>
                 <View className='label'>
                   开始时间:
                 </View>
                 <View className='value'>
                   {this.state.startTimeSel}
                 </View>
               </View>
             </Picker>
             <Picker mode='date' onChange={this.handlePickerChange.bind(this,'endDateSel')}>
               <View className='picker'>
                 <View className='label'>
                   结束日期:
                 </View>
                 <View className='value'>
                   {this.state.endDateSel}
                 </View>
               </View>
             </Picker>
             <Picker mode='time' onChange={this.handlePickerChange.bind(this,'endTimeSel')}>
               <View className='picker'>
                 <View className='label'>
                   结束时间:
                 </View>
                 <View className='value'>
                   {this.state.endTimeSel}
                 </View>
               </View>
             </Picker>
           </View>
           <View className='submit-button'>
             <AtButton disabled={this.state.percent !== 100 } onClick={this.handleSubmitClick}>{this.state.percent !==100 ? '请先完善信息' : '确认'}</AtButton>
           </View>
         </View>
       </View>
     )
  }
}

export default CreateNoticeView;
