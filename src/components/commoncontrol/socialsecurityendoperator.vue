<template>
  <Form :label-width=150>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更类型：" class="">
          <Select v-model="socialSecurityEndOperator.changeType" style="width: 100%;" transfer 	> <!--@on-change="taskTypeChange" -->
                    <Option v-for="item in changeTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：" prop="taskStatus">
                   <Select v-model="socialSecurityEndOperator.taskStatus" style="width: 100%;" transfer 	> <!--@on-change="taskTypeChange" -->
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="办理方式：" class="">
          <Select v-model="socialSecurityEndOperator.doMethodValue" style="width: 100%;" transfer>
            <Option v-for="item in socialSecurityEndOperator.doMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="社保终止月份：" class="">
          <DatePicker v-model="socialSecurityEndOperator.socialSecurityEndMonth"  placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col> -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="受理日期：" class="">
          <DatePicker v-model="socialSecurityEndOperator.accpetDate"  placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="送审日期：" class="">
          <DatePicker v-model="socialSecurityEndOperator.date"  placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="完成日期：" class="">
          <DatePicker v-model="socialSecurityEndOperator.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="办理备注：" class="">
          <Input v-model="socialSecurityEndOperator.doNotes" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="批退备注：" class="">
          <Input v-model="socialSecurityEndOperator.refuseNotes" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    name:"socialsecurityendoperator",
    props:{
      operatorType:{
        type: String
      }
    },
    data() {
      return {
         empTaskId:this.$route.query.empTaskId,
         taskTypeList:[
            {value: '0',label: '初始(材料收缴)',disabled:false},
            {value: '1', label: '受理中',disabled:false},
            {value: '2', label: '送审中',disabled:false},
            {value: '3', label: '已完成',disabled:false},
          ],//任务状态类型
        //雇员特殊任务单的类型
             changeTypeList:[
                //{value:'0', label: '无'},
                {value:'1',label:'死亡'},
                {value:'2',label:'终止'},
                {value:'3',label:'修改个人信息'},
                {value:'4',label:'修改人员信息'},
                {value:'5',label:'退账'},
                {value:'6',label:'工龄认定'},
                {value:'7',label:'特殊工种认定'},
                {value:'8',label:'账户合并'},
                {value:'9',label:'遗属'},
                {value:'10',label:'退休'},
                {value:'11',label:'因病丧劳提前退休'},
                {value:'12',label:'特殊工种提前退休'},
                {value:'13',label:'退休高级专家增资'},
                {value:'14',label:'退休军转增资'},
                {value:'15',label:'外国人终止提取'},
                {value:'16',label:'外来人员医保卡领取'},
                {value:'17',label:'医保帐户提取'},
                {value:'18',label:'生育津贴领取'}
            ],
        socialSecuritySpecialOperator: {
            taskStatus:'',
          changeType: '',
          doMethodValue: '',
          doMethodList: [
            {value: '1', label: '网上申报'},
            {value: '2', label: '柜面办理'}
          ],
          socialSecurityEndMonth: '',
          accpetDate: '',
          date: '',
          finishDate: '',
          doNotes: '',
          refuseNotes: ''
        }
      }
    },
    mounted() {
      
        this.empTaskId
    },
    computed: {

    },
    methods: {
      insert(index) {
        this.socialSecurityPayOperator.operatorListData.splice(index, 0, {operator: '', startMonth: '', endMonth: '', base: '', action: '', disabled: false});
      },
      remove (index) {
        this.socialSecurityPayOperator.operatorListData.splice(index, 1);
      }
    }
  }
</script>