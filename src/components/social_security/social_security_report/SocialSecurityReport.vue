<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name='1'>
        下载Excel报表
        <div slot="content">
           <Form ref="operatorSearchData" :model="operatorSearchData" :label-width='150' :rules="ruleValidate">
            <Row type="flex" justify="start">
                 <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                 <Form-item label="报表年月：" prop="ssMonth">
                   <Date-picker v-model="operatorSearchData.ssMonth" type="month"  placeholder="选择年月份" style="width: 100%;">
                  </Date-picker>
                 
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="ssAccount">
                   <input-account v-model="operatorSearchData.ssAccount" v-on:listenToChildEvent="listentChild"></input-account>
                </Form-item>
              </Col>
            </Row>
            <br/>
            <br/>
            <Row type="flex" justify="start">
              <Col :sm="{span: 12}" offset='7'>
                  <Button type="info" @click="employeeCostDetail">雇员缴费明细</Button>
                  <Button type="info" @click="refundDetails">退费明细</Button>
                   <Button type="info" @click="monthlypaymentnotice">月缴费通知书</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

  </div>
</template>
<script>
  import customerModal from '../../common_control/CustomerModal.vue'
  import companyAccountSearchModal from '../../common_control/CompanyAccountSearchModal.vue'
  import EventType from '../../../store/event_types'
import InputAccount from './InputAccount.vue'
  export default {
    components: {customerModal, companyAccountSearchModal,InputAccount},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          ssMonth:'',//报表年月
          ssAccount:'',//企业社保账户
          comAccountId:'',//企业社保账户ID
          isShowAccountType: false, //社保账户模糊块的显示
        },
        employeeResultColumns: [

          {title: '雇员编号', key: 'employeeNumber',  align: 'center',
            render: (h, params) => {
              return h('div',{style:{textAlign:'center'}}, [

              ]);
            }
          },
          {title: '姓名', key: 'employeeName',  align: 'center',
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '变更类型', key: 'changeType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.changeType),
              ]);
            }
          },
          {title: '险种', key: 'insuranceType',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.insuranceType),
              ]);
            }
          },
          {title: '项目', key: 'project',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.project),
              ]);

            }
          },
          {title: '导入金额', key: 'importAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.importAmount),
              ]);
            }
          },
          {title: '系统金额', key: 'systemAmount',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.systemAmount),
              ]);
            }
          },
          {title: '差异', key: 'difference', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.difference),
              ]);
            }
          }
        ],
        ruleValidate:{
          ssMonth:[    
            {required:true,type:'date',message: '选择报表日期.',trigger:'change'},
          ],
           ssAccount:[
            {required:true,type:'string',message: '选择企业账户.',trigger:'change'},
            ]
        }
      }
      
    },
    mounted() {
     
    },
    computed: {
     
    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      listentChild(data){
          this.operatorSearchData.comAccountId=data
      },
      ok () {

      },
      cancel () {

      },
      goBack(){
        history.go(-1);
      },
      monthlypaymentnotice(){
        this.$router.push({name: 'monthlyPaymentNotice'})
      },
      employeeCostDetail(){
        
        let ssMonth = this.$utils.formatDate(this.operatorSearchData.ssMonth, 'YYYYMMDD')
        this.$router.push({name: 'employeeCostDetail',query:{ssMonth:ssMonth,comAccountId:this.operatorSearchData.comAccountId}})
      },
      refundDetails(){
        let result = false;
        this.$refs['operatorSearchData'].validate((valid) => {
                    if (valid)result=true;
                })
                if(!result)return;
         let ssMonth = this.$utils.formatDate(this.operatorSearchData.ssMonth, 'YYYYMMDD')
         this.$router.push({name: 'refundDetails',query:{ssMonth:ssMonth,comAccountId:this.operatorSearchData.comAccountId}})
      }
    }
  }
</script>
