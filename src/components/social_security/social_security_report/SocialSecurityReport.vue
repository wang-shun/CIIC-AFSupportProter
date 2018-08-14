<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name='1'>
        社保报表
        <div slot="content">
           <Form ref="operatorSearchDataFirst" :model="operatorSearchDataFirst" :label-width='150' :rules="ruleValidateFirst">
            <Row type="flex" justify="start">
                 <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                 <Form-item label="报表年月：" prop="ssMonth">
                   <Date-picker v-model="operatorSearchDataFirst.ssMonth" type="month" format="yyyyMM"  placeholder="选择年月份" style="width: 100%;" transfer>
                  </Date-picker>

                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保账户类型：" prop="ssAccountType">
                <Select v-model="operatorSearchDataFirst.ssAccountType" style="width: 100%;" transfer>
                  <Option v-for="item in ssAccountTypeDict" :value="item.key" :key="item.key" :label="item.value"></Option>
                </Select>
              </Form-item>
              </Col> -->
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：" prop="ssAccount">
                  <input-account v-model="operatorSearchDataFirst.ssAccount" @listenToChildEvent="listenToChild"></input-account>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="operatorSearchDataFirst.companyId"></input-company>
              </Form-item>
              </Col>  
            </Row>
            <br/>
            <br/>
            <Row type="flex" justify="start">
              <Col :sm="{span: 20}" offset='2'>
                  <Button type="info" @click="employeeCostDetail">雇员缴费明细</Button>
                  <Button type="info" @click="refundDetails">退费明细</Button>
                  <Button type="info" @click="monthlypaymentnotice">月缴费通知书</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

      <Panel name='2'>
        变更汇总报表
        <div slot="content">
          <Form ref="operatorSearchData" :model="operatorSearchData" :label-width='150' :rules="ruleValidate">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="报表年月：" prop="ssMonth">
                <Date-picker v-model="operatorSearchData.ssMonth" type="month" format="yyyyMM"  placeholder="选择年月份" style="width: 100%;" transfer>
                </Date-picker>

              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保账户类型：" prop="ssAccountType">
                <Select v-model="operatorSearchData.ssAccountType" style="width: 100%;" transfer>
                  <Option v-for="item in ssAccountTypeDict" :value="item.key" :key="item.key" :label="item.value"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账号：" prop="ssAccount">
                <input-account v-model="operatorSearchData.ssAccount"></input-account>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="operatorSearchData.companyId"></input-company>
              </Form-item>
              </Col>
            </Row>
            <br/>
            <br/>
            <Row type="flex" justify="start">
              <Col :sm="{span: 20}" offset='2'>
              <Button type="info" @click="monthEmpChange">月缴变更汇总表（养医失）</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

  </div>
</template>
<script>
  import dict from '../../../api/dict_access/social_security_dict'
  import customerModal from '../../common_control/CustomerModal.vue'
  import companyAccountSearchModal from '../../common_control/CompanyAccountSearchModal.vue'
//  import EventType from '../../../store/event_types'
  import InputAccount from '../../common_control/form/input_account'
  import InputCompany from '../../common_control/form/input_company'
  import sessionData from '../../../api/session-data'
  export default {
    components: {customerModal, companyAccountSearchModal,InputAccount,InputCompany},
    data() {
      return {
        collapseInfo: [1, 2], //展开栏
        operatorSearchDataFirst: {
          ssMonth:'',//报表年月
          ssAccount:'',//企业社保账户
          isShowAccountType: false, //社保账户模糊块的显示
          ssAccountType:'',
          ssAccountId:'',
          companyId:''
        },
        operatorSearchData: {
          ssMonth:'',//报表年月
          ssAccount:'',//企业社保账户
          isShowAccountType: false, //社保账户模糊块的显示
          ssAccountType:'',
          companyId:''
        },
        ssAccountTypeDict: [],
//        employeeResultColumns: [
//
//          {title: '雇员编号', key: 'employeeNumber',  align: 'center',
//            render: (h, params) => {
//              return h('div',{style:{textAlign:'center'}}, [
//
//              ]);
//            }
//          },
//          {title: '姓名', key: 'employeeName',  align: 'center',
//             render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.employeeName),
//              ]);
//            }
//          },
//          {title: '变更类型', key: 'changeType', align: 'center',
//            render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.changeType),
//              ]);
//            }
//          },
//          {title: '险种', key: 'insuranceType',  align: 'center',
//            render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.insuranceType),
//              ]);
//            }
//          },
//          {title: '项目', key: 'project',  align: 'center',
//            render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.project),
//              ]);
//
//            }
//          },
//          {title: '导入金额', key: 'importAmount', align: 'center',
//            render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.importAmount),
//              ]);
//            }
//          },
//          {title: '系统金额', key: 'systemAmount',  align: 'center',
//            render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.systemAmount),
//              ]);
//            }
//          },
//          {title: '差异', key: 'difference', align: 'center',
//            render: (h, params) => {
//              return h('div', {style: {textAlign: 'center'}}, [
//                h('span', params.row.difference),
//              ]);
//            }
//          }
//        ],
        ruleValidateFirst:{
          ssMonth:[
            {required:true,type:'date',message: '选择报表日期.',trigger:'change'},
          ],
          // ssAccount:[
          //   {required:true,type:'string',message: '选择社保账户.',trigger:'change'},
          // ]
        },
        ruleValidate:{
          ssMonth:[
            {required:true,type:'date',message: '选择报表日期.',trigger:'change'},
          ],
           ssAccountType:[
            {required:true,type:'string',message: '选择社保账户类型.',trigger:'change'},
            ]
        }
      }

    },
    created() {
      sessionData.getJsonDataFromSession('ssReport.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('ssReport.operatorSearchDataFirst', this.operatorSearchDataFirst);
    },
    mounted() {
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.ssAccountTypeDict = data.data.SocialSecurityAccountType;
        }
      });

//      if (this.operatorSearchData.ssMonth) {
//        this.operatorSearchData.ssMonth = this.$utils.parseDate(this.operatorSearchData.ssMonth, 'YYYYMM').toDate();
//      }
    },
    computed: {

    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      listenToChild(row){
        if (row && row.comAccountId) {
          this.operatorSearchDataFirst.ssAccountId = row.comAccountId;
//          console.log("this.operatorSearchDataFirst.ssAccountId ：" + this.operatorSearchDataFirst.ssAccountId)
        } else {
          this.operatorSearchDataFirst.ssAccountId = '';
        }
      },
      ok () {

      },
      cancel () {

      },
      goBack(){
        history.go(-1);
      },
      monthlypaymentnotice(){
        let result = this.validConditionFirst();
        if(!result)return;


        
        let ssMonth = this.$utils.formatDate(this.operatorSearchDataFirst.ssMonth, 'YYYYMM');

        let param={
          ssMonth:ssMonth,
          ssAccountType:this.operatorSearchDataFirst.ssAccountType,
          ssAccount:this.operatorSearchDataFirst.ssAccount,
          companyId:this.operatorSearchDataFirst.companyId,
          ssAccountId:this.operatorSearchDataFirst.ssAccountId
        };
        this.$router.push({name: 'monthlyPaymentNotice',query:param})
      },
      employeeCostDetail(){
        let result = this.validConditionFirst();
        if(!result)return;
        let ssMonth = this.$utils.formatDate(this.operatorSearchDataFirst.ssMonth, 'YYYYMM')
        let param={
          ssMonth:ssMonth,
          ssAccountType:this.operatorSearchDataFirst.ssAccountType,
          ssAccount:this.operatorSearchDataFirst.ssAccount,
          companyId:this.operatorSearchDataFirst.companyId,
          ssAccountId:this.operatorSearchDataFirst.ssAccountId
        };
        this.$router.push({name: 'employeeCostDetail',query:param})
      },
      refundDetails(){
        let result = this.validConditionFirst();
        if(!result)return;
         let ssMonth = this.$utils.formatDate(this.operatorSearchDataFirst.ssMonth, 'YYYYMM')
         let param={
          ssMonth:ssMonth,
          ssAccountType:this.operatorSearchDataFirst.ssAccountType,
          ssAccount:this.operatorSearchDataFirst.ssAccount,
          companyId:this.operatorSearchDataFirst.companyId,
          ssAccountId:this.operatorSearchDataFirst.ssAccountId
        };
         this.$router.push({name: 'refundDetails',query:param})
      },
      monthEmpChange(){
        let result = this.validCondition();
        if(!result)return;
         let ssMonth = this.$utils.formatDate(this.operatorSearchData.ssMonth, 'YYYYMM')
         let param={ssMonth:ssMonth,
                    ssAccountType:this.operatorSearchData.ssAccountType,
                    ssAccount:this.operatorSearchData.ssAccount,
//                    ssAccountId:this.operatorSearchData.ssAccountId,
                    companyId:this.operatorSearchData.companyId
                    }
         this.$router.push({name: 'socialSecurityEmpChangeDetailYys',query:param})
      },
      validConditionFirst(){
        let result = false;
        sessionData.setJsonDataToSession('ssReport.operatorSearchData', this.operatorSearchData);
        sessionData.setJsonDataToSession('ssReport.operatorSearchDataFirst', this.operatorSearchDataFirst);

        if (this.operatorSearchDataFirst.ssMonth && typeof this.operatorSearchDataFirst.ssMonth === 'string') {
          this.operatorSearchDataFirst.ssMonth = this.$utils.parseDate(this.operatorSearchDataFirst.ssMonth, 'YYYYMM').toDate();
        }

        this.$refs['operatorSearchDataFirst'].validate((valid) => {
          if (valid)result=true;
        })
        return result
      },
      validCondition(){
        let result = false;
        sessionData.setJsonDataToSession('ssReport.operatorSearchDataFirst', this.operatorSearchDataFirst);
        sessionData.setJsonDataToSession('ssReport.operatorSearchData', this.operatorSearchData);

        if (this.operatorSearchData.ssMonth && typeof this.operatorSearchData.ssMonth === 'string') {
          this.operatorSearchData.ssMonth = this.$utils.parseDate(this.operatorSearchData.ssMonth, 'YYYYMM').toDate();
        }

        this.$refs['operatorSearchData'].validate((valid) => {
                    if (valid)result=true;
        })
        return result
      }
    }
  }
</script>
