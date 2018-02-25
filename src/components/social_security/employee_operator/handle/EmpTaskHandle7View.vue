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
        社保{{handleTitle}}操作
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理方式：">
                <label v-if="source=='3'">{{socialSecurityPayOperator.handleWay=='1'?'网上申报':'柜面办理'}}</label>
                <Select v-else v-model="socialSecurityPayOperator.handleWay" style="width: 100%;" transfer>
                  <Option value="1" label="网上申报"></Option>
                  <Option value="2" label="柜面办理"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理月份：">
                <label v-if="source=='3'">{{socialSecurityPayOperator.handleMonth}}</label>
                <DatePicker v-else v-model="socialSecurityPayOperator.handleMonth" type="month" placeholder="办理年月"
                            style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="变更类型：">
                <span>退账</span>
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
                <label v-if="source=='3'">{{socialSecurityPayOperator.handleRemark}}</label>
                <Input v-else v-model="socialSecurityPayOperator.handleRemark" placeholder="请输入..."></Input>
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
                <label v-if="source=='3'">{{socialSecurityPayOperator.rejectionRemark}}</label>
                <Input v-else v-model="socialSecurityPayOperator.rejectionRemark" placeholder="请输入..."></Input>
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
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('3')" v-if="showButton">办理</Button>
      <Button type="error" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('4')" v-if="showButton">批退</Button>  
      <Button type="warning"  @click="goBack">返回</Button>
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

  const HANDLE_TITLE = "退账";

  export default {
    components: {companyInfo, employeeInfo},
    data() {
      return {
        handleTitle:HANDLE_TITLE,
        empTaskId: '',
        operatorType: '',
        currentIndex: this.$route.params.index,
         source:this.$route.query.type,
        sourceFrom: '',
        collapseInfo: [1, 2, 3],
        employee: {},
        company: {},

        taskCategoryType: [
          {value: '1', label: '新进'},
          {value: '2', label: '转入'},
          {value: '3', label: '新进转出'},
          {value: '4', label: '转入转出'},
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
            title: HANDLE_TITLE+'起始月份',
            key: 'startMonth',
            align: 'center',
            render: (h, params) => {
              return h('DatePicker', {
                props: {value: params.row.startMonth, type: 'month', disabled: Boolean(params.row.disabled)},
                attrs: {placeholder: '选择年月'},
                on: {
                  input: (event) => {
                    this.setRow(params, 'startMonth', event);
                  }
                }
              });
            }
          },
          {
            title: `${HANDLE_TITLE}截止月份`,
            key: 'endMonth',
            align: 'center',
            render: (h, params) => {
              return h('DatePicker', {
                props: {value: params.row.endMonth, type: 'month', disabled: Boolean(params.row.disabled)},
                attrs: {placeholder: '选择年月'},
                on: {
                  input: (event) => {
                    this.setRow(params, 'endMonth', event);
                  }
                }
              });
            }
          },
          {
            title: `${HANDLE_TITLE}金额`,
            key: 'refundAmount',
            align: 'center',
            render: (h, params) => {
              return h('Input', {
                props: {value: params.row.refundAmount, disabled: Boolean(params.row.disabled)},
                on: {
                  'on-blur': (e) => {
                    this.setRow(params, 'refundAmount', e.target.value);
                  }
                }
              }, params.row.refundAmount);
            }
          },
          /**@augments
           * 不能删除  暂时屏蔽
           * 现在只做一条时间段的需求
           */
          // {
          //   title: '操作',
          //   key: 'base',
          //   align: 'center',
          //   width: 130,
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {type: 'default', shape: 'circle', icon: 'edit', size: 'small'},
          //         style: {marginRight: '5px'},
          //         on: {
          //           click: () => {
          //             params.row.disabled = false;
          //           }
          //         }
          //       }),
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
          {remitWay: '', startMonth: '', endMonth: '', refundAmount: '', disabled: false}
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

          taskStatus: '',
          empTaskId: '',
          empArchiveId: '',
          empBase:'',
           isChange:'',
           isHaveSameTask:'',
            employeeId:'',
           comAccountId:'',
           taskId:'',
           businessInterfaceId:''
        },

        // 任务单参考信息
        taskNewInfoColumns: [
          {title: '基数', key: 'base', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.base),
              ]);
            }
          },
          {title: '起缴月份', key: 'startMonth', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {title: '截至月份', key: 'endYear', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.endYear),
              ]);
            }
          }
        ], //任务单参考信息 -- 新增
        showButton: true,
      }
    },
    mounted() {
      this.initData(this.$route.query)
      this[EventTypes.COMPANYSOCIALSECURITYNEWTYPE]()
    },
    computed: {
      ...mapState('companySocialSecurityNew', {
        taskChangeInfo: state => state.data.taskChangeInfo,
      })
    },
    methods: {
      ...mapActions('companySocialSecurityNew', [EventTypes.COMPANYSOCIALSECURITYNEWTYPE]),
      initData(data) {
        this.empTaskId = data.empTaskId;
        this.operatorType = data.operatorType;
        this.sourceFrom = data.sourceFrom;
        this.socialSecurityPayOperator.empTaskId = this.empTaskId;
        var empTaskId = data.empTaskId;
        
        //查询退账金额
        
        let refundAmount = '';
        let disabled = false;
        if('3'== this.source){
          api.queryRefundAmountByTaskId({empTaskId: empTaskId}).then(data=>{
            disabled = true;
            if(data.data!=null){
              refundAmount=data.data.amount;
            }
          })
        }
        api.queryEmpTaskById({
          empTaskId: empTaskId,
          operatorType: 1,// 任务单费用段
        }).then(data => {
          
          if (data.data.empTaskPeriods.length > 0) {
            this.operatorListData = data.data.empTaskPeriods;
          }else{
            this.operatorListData=[{
                remitWay: '1', 
                startMonth: data.data.startMonth, 
                endMonth: data.data.endMonth, 
                refundAmount:refundAmount,
                disabled: disabled
               }]
          }
          this.showButton = data.data.taskStatus == '1' || data.data.taskStatus=='2';
          this.$utils.copy(data.data, this.socialSecurityPayOperator);

           this.$Notice.config({
                top:80
              })
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

          if(data.data!=null){
            this.company = data.data;
             this.socialSecurityPayOperator.comAccountId = data.data.comAccountId
          }

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
              refundAmount: row.refundAmount,
              remitWay: row.remitWay,
            });
          }
        }
        return newRows;
      },
      // newRow() {
      //   return {
      //     remitWay: '',
      //     startMonth: '',
      //     endMonth: '',
      //     baseAmount: '',
      //     disabled: false
      //   };
      // },
      getRows() {
        return this.operatorListData;
      },
      setRow(params, name, value) {
        this.getRows()[params.index][name] = value;
        params.row[name] = value;
      },
      // insertRow(index) {
      //   this.getRows().splice(index, 0, this.newRow());
      // },
      // removeRow(index) {
      //   var data = this.getRows();

      //   // 保留最后一个并清空
      //   if (data.length == 1) {
      //     this.$utils.copy(this.newRow(), data[0]);
      //   } else {
      //     data.splice(index, 1);
      //   }
      // },
      instance(taskStatus, type) {
        var fromData = this.$utils.clear(this.socialSecurityPayOperator,'');

        // 办理状态：1、未处理 2 、处理中  3 已完成（已办） 4、批退 5、不需处理
        var content = "任务办理";
        if ('4' == taskStatus) {
          if(this.socialSecurityPayOperator.rejectionRemark==''){
            this.$Message.warning('请输入批退原因。');
            return;
          }
          content = "批退办理";
        }
        let self= this
        this.$Modal.confirm({
          title: "确认办理吗？",
          content: content,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            {// 处理日期
              fromData.handleMonth = self.yyyyMM(fromData.handleMonth)
              fromData.startMonth = self.yyyyMM(self.operatorListData[0].startMonth)
              fromData.endMonth = self.yyyyMM(self.operatorListData[0].endMonth)
              fromData.handleRemarkDate = null;
              fromData.rejectionRemarkDate = null;
              fromData.refundAmount=self.operatorListData[0].refundAmount;
              fromData.taskStatus = taskStatus;
            }


            // 转下月处理
            if(type && type == 'next'){
              var nextDay = parseInt(this.company.expireDate) + 1;
              var submitTime = new Date();
              submitTime.setDate(nextDay);
              fromData.submitTime = this.$utils.formatDate(submitTime, 'YYYY-MM-DD 00:00:00');
            }
            //获得时间段
            //fromData.empTaskPeriods = this.filterData();
            
            api.handleEmpTask(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success(content + "成功");
                // 返回任务列表页面
                history.go(-1);
              } else {
                this.$Message.error(content + "失败！" + data.message);
              }
            })
          }
        });

      }
    }
  }
</script>
