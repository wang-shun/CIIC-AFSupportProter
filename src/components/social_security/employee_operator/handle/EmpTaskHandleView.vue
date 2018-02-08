<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-info :company="company"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :operatorType='operatorType' :employee="employee"></employee-info>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
                     <!--  v-if="operatorType === '1' || operatorType === '2'" -->
            <Form :label-width=150 >
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="开AF单日期：">
                <label>{{taskNewInfo.afDate}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="存档地：">
                <label>{{taskNewInfo.storePlace}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="工资：">
                <label>{{taskNewInfo.salary}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="用工状态：">
                <label>{{taskNewInfo.jobState}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="用工日期：">
                <label>{{taskNewInfo.jobDate}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 13}">
              <Table border width="601" :columns="taskNewInfoColumns" :data="taskNewInfoData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        社保缴纳操作
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理方式：">
                <Select v-model="socialSecurityPayOperator.handleWay" style="width: 100%;" transfer>
                  <Option value="1" label="网上申报"></Option>
                  <Option value="2" label="柜面办理"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理月份：">
                <DatePicker v-model="socialSecurityPayOperator.handleMonth" type="month"  placeholder="办理年月"
                            style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="变更类型：">
                <Select v-model="socialSecurityPayOperator.taskCategory" style="width: 100%;"  transfer>
                  <Option v-for="item in taskCategoryType" :value="item.value" :key="item.value"
                          :label="item.label"></Option>
                </Select>
              </Form-item>
              </Col>
              <!-- 仅新增 -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保序号：">
                <label >{{socialSecurityPayOperator.empSsSerial}}</label>
                <!-- <Input v-model="socialSecurityPayOperator.empSsSerial" placeholder="请输入..."></Input> -->
              </Form-item>
              </Col>
              <!-- 仅转出 -->
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '2'">
              <Form-item label="特殊变更类型：">
                <Select v-model="socialSecurityPayOperator.taskCategorySpecial" style="width: 100%;" transfer>
                  <Option v-for="item in specialChangeType" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col> -->
              <!-- 仅新增 -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="起缴月份：">
                <DatePicker v-model="socialSecurityPayOperator.startMonth" type="month" placeholder="请选择" 
                            style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <!-- 仅转出 -->
              <!-- 仅新增 -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="截至月份：">

                <label>{{socialSecurityPayOperator.endMonth}}</label>
                <!-- <DatePicker v-model="socialSecurityPayOperator.endMonth"  
                            type="month"
                            placement="bottom-end"
                            placeholder="请选择"
                            style="width: 100%;"  transfer></DatePicker> -->
              </Form-item>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span:24}">
              <Table border width="100%" :columns="operatorListColumns"
                     :data="operatorListData"></Table>
              </Col>
            </Row>
            <Row class="mt20">
              <Col span="16">
              <Form-item label="办理备注：" prop="handleRemark">
                <Input v-model="socialSecurityPayOperator.handleRemark" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col span="4">
              <Form-item label="备注人：">
                <label>{{socialSecurityPayOperator.handleRemarkMan}}</label>
              </Form-item>
              </Col>
              <Col span="4">
              <Form-item label="备注时间：">
                <label>{{socialSecurityPayOperator.handleRemarkDate}}</label>
              </Form-item>
              </Col>
              <Col span="16">
              <Form-item label="批退备注：" prop="rejectionRemark">
                <Input v-model="socialSecurityPayOperator.rejectionRemark" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col span="4">
              <Form-item label="备注人：">
                <label>{{socialSecurityPayOperator.rejectionRemarkMan}}</label>
              </Form-item>
              </Col>
              <Col span="4">
              <Form-item label="备注时间：">
                <label>{{socialSecurityPayOperator.rejectionRemarkDate}}</label>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('1','next')" v-if="showButton">转下月处理</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('5','noProgress')" v-if="showButton">不需处理</Button>
      <Button type="primary" @click="instance('2','handle')" v-if="showButton">办理</Button>
      <Button type="error" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('4','refuse')" v-if="showButton">批退</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('1','save')" v-if="showButton">暂存</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import companyInfo from '../../components/CompanyInfo'
  import employeeInfo from '../../components/EmployeeInfo.vue'

  import EventTypes from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'

  export default {
    components: {companyInfo, employeeInfo},
    data() {
      return {
        empTaskId: '',
        operatorType: '',
        currentIndex: this.$route.params.index,
        sourceFrom: '',
        collapseInfo: [1, 2, 3, 4],
        employee: {
          idNum:'',
          education:'',
          inDate:'',
          employeeId:'',
          employeeName:'',
          residenceAddress:'',
          residenceAttribute:'',
          contactAddress:'',
         employeeAttribute:''
        },
        company: {},
        taskNewInfo: {
        afDate: '2017-12-01',
        storePlace: '外来从业人员',
        salary:'18000',
        jobState: '已用工',
        jobDate: '2017-12-01'
      },
      taskNewInfoData: [], //任务单参考信息 -- 新增
        taskCategoryType: [
          {value: '1', label: '新进'},
          {value: '2', label: '转入'},
          // {value: '3', label: '新进转出'},
          // {value: '4', label: '转入转出'},
        ], //变更方式
        specialChangeType: [
          {value: 1, label: '退休'},
          {value: 2, label: '终止'}
        ], //特殊变更类型：

        operatorListColumns: [
          {
            title: '', key: 'remitWay', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remitWay),
              ]);
            }
          },
          {
            title: '起缴月份',
            key: 'startMonth',
            align: 'center',
            render: (h, params) => {
              return h('DatePicker', {
                props: {value: params.row.startMonth, type: 'month', disabled:Boolean(params.row.disabled)},//Boolean(params.row.disabled)
                attrs: {placeholder: '选择年月'},
                on: {
                  input: (event) => {
                    this.setRow(params, 'startMonth', event);
                  },
            
                },
                
              });
            }
          },
          {
            title: '截止月份',
            key: 'endMonth',
            align: 'center',
            render: (h, params) => {
               return h('span',params.row.endMonth)
              // return h('DatePicker', {
              //   props: {value: params.row.endMonth, type: 'month', disabled:true},
              //   attrs: {placeholder: ''},//选择年月
              //   on: {
              //     input: (event) => {
              //       this.setRow(params, 'endMonth', event);
              //     }
              //   }
              // });
            }
          },
          {
            title: '基数',
            key: 'baseAmount',
            align: 'center',
            render: (h, params) => {

              return h('span',params.row.baseAmount)
              // return h('Input', {
              //   props: {value: params.row.baseAmount, disabled:true},//disabled: true
              //   on: {
              //     'on-blur': (e) => {
              //       this.setRow(params, 'baseAmount', e.target.value);
              //     }
              //   }
              // }, params.row.baseAmount);
            }
          },
          // {
          //   title: '操作',
          //   key: 'base',
          //   align: 'center',
          //   width: 130,
          //   render: (h, params) => {
          //     return h('div', [
          //       // h('Button', {
          //       //   props: {type: 'default', shape: 'circle', icon: 'edit', size: 'small'},
          //       //   style: {marginRight: '5px'},
          //       //   on: {
          //       //     click: () => {
          //       //       params.row.disabled = false;
          //       //     }
          //       //   }
          //       // }),
          //       h('Button', {
          //         props: {type: 'default', shape: 'circle', icon: 'minus', size: 'small'},
          //         style: {marginRight: '5px'},
          //         on: {
          //           click: () => {
          //             this.removeRow(params.index);
          //           }
          //         }
          //       }),
          //       h('Button', {
          //         props: {type: 'default', shape: 'circle', icon: 'plus', size: 'small'},
          //         on: {
          //           click: () => {
          //             this.insertRow(params.index);
          //           }
          //         }
          //       })
          //     ]);
          //   }
          // }
        ],
        operatorListData: [
          {remitWay: '', startMonth: '', endMonth: '', baseAmount: '', disabled: false}
        ],
        socialSecurityPayOperator: {
          handleWay: '1',
          handleMonth: '',
          taskCategory: '1',
          empSsSerial: '',
          startMonth: '',
          endMonth: '',
          rejectionRemark: '',
          handleRemark: '',
          handleRemarkMan: '',
          handleRemarkDate: '',
          rejectionRemark: '',
          rejectionRemarkMan: '',
          rejectionRemarkDate: '',
          empBase:'',
          taskStatus: '',
          empTaskId: '',
          empArchiveId: '',
          isChange:'',
          isHaveSameTask:'',
          employeeId:'',
          comAccountId:'',
        },

        // 任务单参考信息
        taskNewInfoColumns: [
          {
            title: '基数', key: 'base', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.base),
              ]);
            }
          },
          {
            title: '起缴月份', key: 'startMonth', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.startMonth,{
                  on: {
                  input: (event) => {
                    self.taskNewInfoData[params.index].row.startMonth = event
                  }
                }
                }),
              ]);
            }
          },
          {
            title: '截至月份', key: 'endYear', align: 'center', width: 200,
            render: (h, params) => {
              let self = this
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.endYear,{
                  on: {
                  input: (event) => {
                    self.taskNewInfoData[params.index].row.endYear = event
                  }
                }
                }),
              ]);
            }
          }
        ], //任务单参考信息 -- 新增

        showButton: true,
      }
    },
    mounted() {
      
      this.initData(this.$route.query)

    },
    computed: {

    },
    methods: {
        getYearMonth(date){
        
        if(date==null || date=="")return "";
        let year = date.getFullYear(); 
        let month = date.getMonth()+1;
        if(month>=1 && month<=9){
              month='0'+month
        }
          return year+'-'+month;
      },
      initData(data) {
        this.empTaskId = data.empTaskId;
        this.operatorType = data.operatorType;
        this.sourceFrom = data.sourceFrom;
        this.socialSecurityPayOperator.empTaskId = this.empTaskId;
        var empTaskId = data.empTaskId;

        api.queryEmpTaskById({
          empTaskId: empTaskId,
          operatorType: 1,// 任务单费用段
          isNeedSerial:1
        }).then(data => {
          if (data.data.empTaskPeriods.length > 0) {
            
            this.operatorListData = data.data.empTaskPeriods;
          }else{
            
            let operatorListData =[]
            //remitWay: '', startMonth: '', endMonth: '', baseAmount: '', disabled: false
            let periodObj ={}
             periodObj.remitWay='1';
             periodObj.startMonth=data.data.startMonth;
             periodObj.endMonth=data.data.endMonth;
             periodObj.baseAmount = data.data.empBase
             operatorListData.push(periodObj)
             this.operatorListData = operatorListData
          }
          this.showButton = data.data.taskStatus == '1' || data.data.taskStatus=='2';

          this.$utils.copy(data.data, this.socialSecurityPayOperator);
          let handleMonth = this.socialSecurityPayOperator.handleMonth;
          
          if(handleMonth==null ||handleMonth=='' || typeof(handleMonth)=='undefined'){
            let date = new Date();
            handleMonth=this.getYearMonth(date,'show');
            
            this.socialSecurityPayOperator.handleMonth=handleMonth;
          }
           //{base: '18000', startMonth: '201712', endYear: ''}
             let periodArr = []
             let period ={}
            period.base = this.socialSecurityPayOperator.empBase
            period.startMonth = this.socialSecurityPayOperator.startMonth
            period.endMonth=this.socialSecurityPayOperator.endMonth
            this.taskNewInfoData.push(period)
            if(this.socialSecurityPayOperator.isHaveSameTask=='1'){
                this.$Notice.warning({
                    title: '温馨提示',
                    desc: '该雇员存在相同类型的未办任务.',
                    duration: 0
                });
            }

        });

        api.queryEmpArchiveByEmpTaskId({empTaskId: empTaskId,operatorType:data.operatorType}).then((data) => {

          if(data.data!=null){
            this.employee = data.data;
          }

        })
        api.queryComAccountByEmpTaskId({empTaskId: empTaskId,operatorType:data.operatorType}).then((data) => {
          
          this.company = data.data;
          this.socialSecurityPayOperator.comAccountId = data.data.comAccountId
        })
      },
      goBack() {
        this.sourceFrom !== 'search' ? this.$router.push({name: 'employeeOperatorView'}) : this.$router.push({name: 'employeeSocialSecurityInfo'});
      },
      // yyyy-MM or date
      yyyyMM(date) {
        if (typeof(date) == 'string') {
          return date.replace('-', '');
        }
        return this.$utils.formatDate(date, 'YYYYMM')
      },
      filterData() {
        var oldRows = this.getRows();
        var empTaskId = this.socialSecurityPayOperator.empTaskId;

        var newRows = [];
        for (var row of oldRows) {
          if (row.startMonth != '' || row.endMonth != '' || row.baseAmount != '') {
            newRows.push({
              empTaskId: empTaskId,
              startMonth: this.yyyyMM(row.startMonth),
              endMonth: typeof(row.endMonth)!='undefined'&& row.endMonth!=''?this.yyyyMM(row.endMonth):"",
              baseAmount: row.baseAmount,
              remitWay: row.remitWay,
            });
          }
        }
        return newRows;
      },
      newRow() {
        return {
          remitWay: '',
          startMonth: '',
          endMonth: '',
          baseAmount: '',
          disabled: false
        };
      },
      getRows() {
        
        return this.operatorListData;
      },
      setRow(params, name, value) {
        this.getRows()[params.index][name] = value;
        params.row[name] = value;
      },
      insertRow(index) {

        this.getRows().splice(0, 0, this.newRow());
      },
      removeRow(index) {
        var data = this.getRows();

        // 保留最后一个并清空
        if (data.length == 1) {
          this.$utils.copy(this.newRow(), data[0]);
        } else {
          data.splice(index, 1);
        }
      },
      instance(taskStatus, type) {
        var fromData = this.$utils.clear(this.socialSecurityPayOperator, '');

        // 办理状态：1、未处理 2 、处理中  3 已完成（已办） 4、批退 5、不需处理
        var content = "任务操作";
        if ('refuse' == type) {
          content = "批退";
        }else if('next'==type){
          content = "转下月处理";
        }else if('noProgress'==type){
          content = "不需处理";
        }else if('save'==type){
          content = "暂存";
        }else if('handle'==type){
          content = "办理";
        }
        let handleType = 'handle'==type || 'save'==type;
        let startMonthIsEqual = this.yyyyMM(this.socialSecurityPayOperator.startMonth) == this.yyyyMM(this.socialSecurityPayOperator.handleMonth)
        let handleMonthIsEqual = this.yyyyMM(this.socialSecurityPayOperator.startMonth) == this.yyyyMM(this.operatorListData[0].startMonth)
        
        if(handleType && (!startMonthIsEqual || !handleMonthIsEqual)){
          if(!handleMonthIsEqual){
               this.$Message.error("两个起缴月份必须相等.");
          }else if(!startMonthIsEqual){
                this.$Message.error("办理月份和起缴月份必须相等.");
          }
          return;
        }
        let self= this;
        this.$Modal.confirm({
          title: "操作确认",
          content: '你确定'+content+'吗?',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            let salary='';
            if(typeof(self.employee)!='undefined'){
                if(typeof(self.employee.ssEmpTask)!='undefined'){
                  if(typeof(self.employee.ssEmpTask.salary)=='undefined'){
                      salary=self.employee.ssEmpTask.salary;
                  }
                }
            }
            {// 处理日期
              fromData.handleMonth = self.yyyyMM(this.socialSecurityPayOperator.handleMonth)
              fromData.startMonth = self.yyyyMM(self.socialSecurityPayOperator.startMonth)
              fromData.endMonth = typeof(self.socialSecurityPayOperator.endMonth)=='undefined'|| self.socialSecurityPayOperator.endMonth==null || self.socialSecurityPayOperator.endMonth==""?"":self.yyyyMM(self.socialSecurityPayOperator.endMonth)
              fromData.handleRemarkDate = null;
              fromData.rejectionRemarkDate = null;
              fromData.taskStatus = taskStatus;
              fromData.companyId = self.company.companyId;
              fromData.comAccountId = self.company.comAccountId;
              fromData.employeeId = self.employee.employeeId;
              fromData.employeeName = self.employee.employeeName;
              fromData.salary = salary;
              //fromData.empClassify = self.employee.employeeAttribute;
              fromData.inDate = self.employee.inDate;
            }

            // 转下月处理
            if (type && type == 'next') {
              var nextDay = parseInt(self.company.expireDate) + 1;
              var submitTime = new Date();
              submitTime.setDate(nextDay);
              fromData.submitTime = self.$utils.formatDate(submitTime, 'YYYY-MM-DD 00:00:00');
            }

            fromData.empTaskPeriods = self.filterData();
            
            api.handleEmpTask(fromData).then(data => {
              if (data.code == 200) {
                self.$Message.success(content + "成功");
                // 返回任务列表页面
                history.go(-1);
              } else {
                self.$Message.error(content + "失败！" + data.message);
              }
            })
          }
        });

      }
    }
  }
</script>
