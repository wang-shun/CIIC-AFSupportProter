<template>
  <div>
    <Table border :columns="injuryReportManageColumns" :data="injuryReportManage" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col class="tr">
        <Button type="primary" @click="modal1 = true">新增</Button>
        <Button type="primary"  @click="instance()">提交</Button>
      </Col>
    </Row>
    <Modal
        v-model="modal1"
        title="新增工伤申报管理"
        @on-ok="ok"
        @on-cancel="cancel">
      <Form :model="handleInfo" ref="handleInfo" :label-width="150">
      <!-- <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="操作员：" prop="operateManw">
             <Input v-model="handleInfo.operateManw" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
       </Row> -->
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="操作日期：" prop="operateDatew">
            <DatePicker type="date" v-model="handleInfo.operateDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="工伤认定日期：" prop="affirmDatew">
            <DatePicker type="date" v-model="handleInfo.affirmDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="鉴定结论：" prop="evaluationw" transfer>
             <Select v-model="handleInfo.evaluationw" transfer>
              <Option v-for="item in jdjlTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
             </Select>
          </Form-item>
        </Col>
       </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="鉴定结论日期：" prop="remarkDatew">
            <DatePicker type="date" v-model="handleInfo.evaluationDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
     <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label=" 申报单位：" prop="remarkDatew">
             <Select v-model="handleInfo.declareUnitw" transfer>
              <Option v-for="item in handleTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
         </Col>
      </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="是否放弃鉴定：" prop="remarkDatew">
             <Checkbox v-model="handleInfo.ifGiveupEvaluationw" true-value="1" false-value="0">是否放弃鉴定</Checkbox>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="完成：" prop="ifCompletew">
            <Checkbox v-model="handleInfo.ifCompletew" true-value="1" false-value="0">完成</Checkbox>
          </Form-item>
         </Col>
      </Row>
    </Form>
    </Modal>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      injuryReportManageInfo: {
        type: Array
      },fileInfo1: {
        type: Object
      },userInfo:{
        type:Object
      }
    },
    data() {
      return {
         modal1: false,
         jdjlTypeList: [
          {value: '无等级', label: '无等级'},
          {value: '1', label: '1'},
          {value: '2', label: '2'},
          {value: '3', label: '3'},
          {value: '4', label: '4'},
          {value: '5', label: '5'},
          {value: '6', label: '6'},
          {value: '7', label: '7'},
          {value: '8', label: '8'},
          {value: '9', label: '9'},
          {value: '10', label: '10'}
              
        ], 
         handleTypeList:[
          {value: '中智', label: '中智'},
          {value: '中智外包', label: '中智外包'},
          {value: '独立', label: '独立'}
        ],  
        injuryReportManageColumns: [
          {title: '工伤认定日期', key: 'affirmDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.affirmDate),
              ]);
            }
          },
          {title: '鉴定结论', key: 'evaluatio', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.evaluation),
              ]);
            }
          },
          {title: '鉴定结论日期', key: 'evaluationDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.evaluationDate),
              ]);
            }
          },
          {title: '申报单位', key: 'reportCompany', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.declareUnit),
              ]);
            }
          },
          {title: '是否放弃鉴定', key: 'ifGiveupEvaluationLabel', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ifGiveupEvaluationLabel),
              ]);
            }
          },
          {title: '完成', key: 'ifComplete', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ifCompleteLabel),
              ]);
            }
          },
          {title: '操作员', key: 'operateMan', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateMan),
              ]);
            }
          },
          {title: '操作日期', key: 'operateDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateDate),
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index,params.row.injuryId)
                            }
                        }
                    }, '删除')
                ]);
            }
         }
        ],handleInfo: {
          operateManw: '',
          operateDatew: '',
          affirmDatew:'',
          evaluationw:'',
          evaluationDatew:'',
          declareUnitw:'',
          ifGiveupEvaluationw:'',
          ifCompletew:''
        },realHandInfo:{
          operateMan: '',
          operateDate: '',
          affirmDate:'',
          evaluation:'',
          evaluatioDate:'',
          declareUnit:'',
          ifGiveupEvaluation:'',
          ifComplete:'',
          ifCompleteLabel:'',
          ifGiveupEvaluationLabel:'',
        }
      }
    },
    computed: {
      injuryReportManage() {
        return this.injuryReportManageInfo
      }
    },
    methods: {
            ok () {

              if(this.handleInfo.operateDatew==''){
                 this.$Message.success("操作日期为空");
                 return;
              }
            
              if(this.handleInfo.affirmDatew==''){
                 this.$Message.success("工伤认定日期为空");
                 return;
              }
              if(this.handleInfo.evaluationDatew==''){
                 this.$Message.success("鉴定结论日期为空");
                 return;
              }
              if(this.handleInfo.declareUnitw==''){
                 this.$Message.success("申报单位为空");
                 return;
              }

             
              var fromData = this.$utils.clear(this.realHandInfo,'');
               fromData.operateDate = this.$utils.formatDate(this.handleInfo.operateDatew, 'YYYY-MM-DD');
               fromData.operateMan = this.userInfo.userName;
               fromData.evaluationDate = this.$utils.formatDate(this.handleInfo.evaluationDatew, 'YYYY-MM-DD');
               fromData.evaluation = this.handleInfo.evaluationw;
               fromData.injuryComfirmDate = this.$utils.formatDate(this.handleInfo.injuryComfirmDatew, 'YYYY-MM-DD');
               fromData.affirmDate = this.$utils.formatDate(this.handleInfo.affirmDatew, 'YYYY-MM-DD');
               fromData.declareUnit = this.handleInfo.declareUnitw;
               fromData.ifGiveupEvaluation = this.handleInfo.ifGiveupEvaluationw;
               fromData.ifComplete = this.handleInfo.ifCompletew;
               fromData.archiveId = this.fileInfo1.archiveId;
               if(fromData.ifComplete==1){
                 fromData.ifCompleteLabel = '是';
               }
               if(fromData.ifGiveupEvaluation==1){
                 fromData.ifGiveupEvaluationLabel = '是';
               }
               
               this.injuryReportManage.push(fromData);
            },
            cancel () {
               
            },instance() {
        
            api.saveAmInjury(this.injuryReportManage).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
          
       },show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index,injuryId) {
                if(!injuryId){
                  this.injuryReportManage.splice(index, 1);
              
                }else{
                     this.$Modal.confirm({
                      title: '',
                      content: '确认删除吗?',
                      onOk:function(){

                        let params = {injuryId:injuryId}

                        api.deleteAmInjury(params).then(data=>{
                              history.go(-1);
                      })
                       
                      },
                      error:function(error){
                        self.$Modal.remove();
                    }
                    });
                }
                
            },del(){
                 let selection = this.$refs.payComSelection.getSelection();
                  //判断条件
                  //是否有选中列
                  if(selection.length == 0){
                    alert("没有选中的列");
                    return;
                  }
                 
                  selection.some(item => {
                       var ff = item;
            
                  });
            },clickRow (index) {
              
            }
        
    }
  }
</script>
