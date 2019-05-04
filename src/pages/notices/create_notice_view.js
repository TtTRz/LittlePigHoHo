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
    startTimeSel: moment().format('HH:mm'),
    endTimeSel: moment().format('HH:mm'),
    startDateSel: moment().format('YYYY-MM-DD'),
    endDateSel: moment().format('YYYY-MM-DD'),
    status: 'progress',
  }
  handleNextClick = () => {
    const { percent} = this.state;
    this.setState({
      percent: percent + 50,
    })
  }
  handlePreClick = () => {
    const { percent} = this.state;
    this.setState({
      percent: percent - 50,
    })
  }
  handleSubmitClick = () => {
    const { percent} = this.state;
    this.setState({
      percent: percent + 50,
    }, () => {
      console.log(this.state)
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
        this.setState({
          status: 'success'
        }, () => {
          if(!this.props.isLoading) {
            setTimeout(() => {
              Taro.redirectTo({
                url: '/pages/home/home_view',
              })
            }, 1000)
          }
        })
      })
    })
  }
  handleInputChange = (keyName, value) => {
    this.setState({
      [keyName]: keyName ==='title' ? value : value.target.value,
    })
  }
  handlePickerChange = (keyName, e) => {
    this.setState({
      [keyName]: e.detail.value
    })
  }
  render(){
     return (
       <View className='create-notice-view'>
         <View className='progress-bar'>
           <AtProgress percent={this.state.percent} status={this.state.status} />
         </View>
         {this.state.percent === 0 && <View className='content'>
           <View className='body'>
             <View className='title'>
               选择时间
             </View>
             <View>
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
           </View>
           <View className='button-bar'>
             <AtButton
               disabled={this.state.percent === 0}
               type='secondary'
               circle
               onClick={this.handlePreClick}
             >
               上一步
             </AtButton>
             <AtButton
               type='primary'
               circle
               onClick={this.handleNextClick}
             >
               下一步
             </AtButton>
           </View>
         </View>}
         {(this.state.percent !== 0 ) && <View className='content'>
           <View className='body'>
             <View className='title'>
               发布通知
             </View>
             <View className='input-area'>
               <AtInput
                 name='title'
                 title='标题'
                 type='text'
                 placeholder='输入通知标题'
                 value={this.state.title}
                 onChange={this.handleInputChange.bind(this, 'title')}
               />
               <AtTextarea
                 value={this.state.content}
                 onChange={this.handleInputChange.bind(this, 'content')}
                 placeholder='请输入您发布的通知'
                 height={400}
               />
             </View>
           </View>
           <View className='button-bar'>
             <AtButton
               disabled={this.state.percent === 0 || this.state.status === 'success'}
               type='secondary'
               circle
               onClick={this.handlePreClick}
             >
               上一步
             </AtButton>
             <AtButton
               disabled={this.state.content === "" || this.state.title === "" || this.state.status === 'success'}
               type='primary'
               circle
               onClick={this.handleSubmitClick}
               loading={this.props.isLoading}
             >
               确 定
             </AtButton>
           </View>
         </View>}

       </View>
     )
  }
}

export default CreateNoticeView;
