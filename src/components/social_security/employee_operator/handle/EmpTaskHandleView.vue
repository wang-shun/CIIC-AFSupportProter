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

          <Form :label-width=150 >
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="开AF单日期：">
                <label>{{reworkInfo.openAfDate}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="存档地：">
                <label>{{reworkInfo.archivePlace}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="工资：">
                <label>{{reworkInfo.salary}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="用工状态：">
                <label>{{this.$decode.recruitAndUseStatus(reworkInfo.taskCategory, reworkInfo.taskStatus)}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="用工成功日期：">
                <label>{{reworkInfo.employFeedbackOptDate}}</label>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
                     <!--  v-if="operatorType === '1' || operatorType === '2'" -->
            <Form :label-width=150 >
            <!--<Row class="mt20" type="flex" justify="start">-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<Form-item label="开AF单日期：">-->
                <!--<label>{{reworkInfo.openAfDate}}</label>-->
              <!--</Form-item>-->
              <!--</Col>-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<Form-item label="存档地：">-->
                <!--<label>{{reworkInfo.archivePlace}}</label>-->
              <!--</Form-item>-->
              <!--</Col>-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<Form-item label="工资：">-->
                <!--<label>{{reworkInfo.salary}}</label>-->
              <!--</Form-item>-->
              <!--</Col>-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<Form-item label="用工状态：">-->
                <!--<label>{{this.$decode.recruitAndUseStatus(reworkInfo.taskCategory, reworkInfo.taskStatus)}}</label>-->
              <!--</Form-item>-->
              <!--</Col>-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<Form-item label="用工成功日期：">-->
                <!--<label>{{reworkInfo.employFeedbackOptDate}}</label>-->
              <!--</Form-item>-->
              <!--</Col>-->
            <!--</Row>-->
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
                <Select v-model="socialSecurityPayOperator.taskCategory" style="width: 100%;"  @on-change="taskCategoryChg"  transfer>
                  <Option v-for="item in taskCategoryType" :value="item.value" :key="item.value"
                          :label="item.label"></Option>
                </Select>
              </Form-item>
              </Col>
              <!-- 仅新增 -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保序号：">
                  <Row>
                    <Col span="11">
                      <Input v-model="socialSecurityPayOperator.empSsSerial" placeholder="请输入..."></Input>
                    </Col>
                    <!-- <Input v-model="socialSecurityPayOperator.empSsSerial" placeholder="请输入..."></Input> -->
                    <Col span="11" class="ml20">
                      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="getSerial" :loading="isLoading">获取序号</Button>
                    </Col>
                  </Row>
                </Form-item>

              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人员属性：">
                <Select v-model="socialSecurityPayOperator.empClassify" style="width: 100%;"  transfer>
                  <Option v-for="item in SocialSecurityEmployeeClassify" :value="item.key" :key="item.key"
                          :label="item.value"></Option>
                </Select>
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
                            style="width: 100%;" @on-change="handleStartMonthChange"
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
          </Form>
        </div>
      </Panel>
      <Panel name="5">
        备注
        <div slot="content">
          <Form :label-width=120>
            <Row>
              <Col :sm="{span: 12}">
                <Form-item label="备注：">
                  <Input style="width: 500px" v-model="remarkInfo.remark" placeholder=""></Input>
                      <Button type="primary" @click="saveRemark" >添加</Button>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 12}">
              <Form-item label="点击添加固定项：">
                  <Button @click="addRemark('上家未转出')">上家未转出</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('人员属性不一致，需身份证户口簿复印件')">人员属性不一致，需身份证户口簿复印件</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('未办理录用')">未办理录用</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('上家已缴费')">上家已缴费</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('录用日期与社保缴纳月不一致')">录用日期与社保缴纳月不一致</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('缺相关材料')">缺相关材料</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('已领失业金')">已领失业金</Button>&nbsp;&nbsp;
                  <Button @click="addRemark('其他')">其他</Button>&nbsp;&nbsp;
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 12}">
                <Table border style="width: 1080px" :columns="socialSecurityRemarkListColumns" :data="socialSecurityRemarkData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="6">
        历史任务单
        <div slot="content">
          <origin-emp-task-info :empTaskId="this.$route.query.empTaskId"></origin-emp-task-info>
        </div>
      </Panel>
      <Panel name="7">
        雇员未做任务单
        <div slot="content">
          <Form :label-width=150 >
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Table border width="1200" :columns="theSameTaskListColumns"
                     :data="socialSecurityPayOperator.theSameTask"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '2' " @click="printForm" >打印登记表|申报表</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('1','next')" v-if="showButton && isNextMonth==0" :loading="isLoading">转下月处理</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('5','noProgress')" v-if="showButton" :loading="isLoading">不需处理</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('2','handle')" v-if="showButton" :loading="isLoading">办理</Button>
      <Button type="error" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('4','refuse')" v-if="showButton" :loading="isLoading">批退</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('1','save')" v-if="showButton" :loading="isLoading">暂存</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
//  import {mapState, mapGetters, mapActions} from 'vuex'
import {localStorage, sessionStorage} from '../../../../assets/api/storage'
  import companyInfo from '../../components/CompanyInfo.vue'
  import employeeInfo from '../../components/EmployeeInfo.vue'
  import originEmpTaskInfo from './OriginEmpTaskInfo.vue'
//  import EventTypes from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'
  import dict from '../../../../api/dict_access/social_security_dict'

  export default {
    components: {companyInfo, employeeInfo, originEmpTaskInfo},
    data() {
      return {
        empTaskId: '',
        operatorType: '',
        processCategory: '',
        socialSecurityRemarkData:[],//备注列表
        currentIndex: this.$route.params.index,
        isNextMonth:this.$route.query.isNextMonth,
        sourceFrom: '',
        collapseInfo: [1, 2, 3, 4, 5, 6, 7],
        remarkInfo:{
          companyId:'',
          employeeId:'',
          remark: '',
          empArchiveId: '',
          empTaskId: ''
        },
        employee: {
          idNum:'',
          education:'',
          inDate:'',
          employeeId:'',
          employeeName:'',
          residenceAddress:'',
          residenceAttribute:'',
          contactAddress:'',
          employeeAttribute:'',
          zipCode:''
        },
        isLoading: false,
        company: {},
        //用退工信息
        reworkInfo:{},
        taskNewInfo: {
          afDate: '2017-12-01',
          storePlace: '外来从业人员',
          salary:'18000',
          jobState: '已用工',
          jobDate: '2017-12-01'
        },
        SocialSecurityEmployeeClassify: [],
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
        socialSecurityRemarkListColumns: [
          {
            title: '备注', key: 'remark', align: 'center', width: 600,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.remark),
              ]);
            }
          },
          {
            title: '创建时间', key: 'createdTime', align: 'center', width: 183,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.createdTime),
              ]);
            }
          },
          {
            title: '创建人', key: 'createdDisplayName', align: 'center', width: 203,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.createdDisplayName),
              ]);
            }
          },
          {
            title: '操作',
            align: 'center',
            width: 80,
            key: 'operat',
            render: (h, params) => {
              if(params.row.createdDisplayName==JSON.parse(localStorage.getItem('userInfo')).displayName){
                return h('div', [
                  h('Button', {
                    props: {type: 'error', size: 'small'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        this.deleteRemark(params.row.empRemarkId)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          }
        ],
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

            }
          },
          {
            title: '基数',
            key: 'baseAmount',
            align: 'center',
            render: (h, params) => {
              return h('span',params.row.baseAmount)
            }
          },
        ],
        theSameTaskListColumns:[
          {
            title: '任务单ID', key: 'empTaskId', align: 'center', width: 100,
            render: (h, params) => {
              let taskCategory = params.row.taskCategory
              let processCategory = params.row.processCategory
              let empTaskId  =params.row.empTaskId
              return h('a', {
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.routerMethed(taskCategory, processCategory, empTaskId)
                  }
                }
              }, params.row.empTaskId);
            }
          },
          {
            title: '任务单类型', key: 'taskCategory', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.taskCategory(params.row.taskCategory)),
              ]);
            }
          },
          {
            title: '起始月份',
            key: 'startMonth',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.taskCategory=='5' || params.row.taskCategory=='6' ||params.row.taskCategory =='14'|| params.row.taskCategory=='15'?'':params.row.startMonth);
            }
          },
          {
            title: '截止月份',
            key: 'endMonth',
            align: 'center',
            render: (h, params) => {
               return h('span',params.row.endMonth)
            }
          },
          {
            title: '基数',
            key: 'empBase',
            align: 'center',
            render: (h, params) => {

              return h('span',params.row.empBase)
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

          rejectionRemarkMan: '',
          rejectionRemarkDate: '',
          empBase:'',
          taskStatus: '',
          empTaskId: '',
          empArchiveId: '',
          isChange:'',
          theSameTask:[],
          employeeId:'',
          comAccountId:'',
          taskId:'',
          businessInterfaceId:'',
          oldAgreementId:'',
          policyDetailId:'',
          welfareUnit:'',

          createdDisplayName:'',
          modifiedDisplayName:'',
          leaderShipName:'',
          serviceCenter:'',
          empClassify:''
        },

        // 任务单参考信息
        taskNewInfoColumns: [
          {
            title: '基数', key: 'base', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.base),
              ]);
            }
          },
          {
            title: '起缴月份', key: 'startMonth', align: 'center', width: 100,
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
            title: '截至月份', key: 'endYear', align: 'center', width: 100,
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
          },
          {
            title: '模板名称', key: 'policyName', align: 'center', width: 289,
            render: (h, params) => {
              let self = this
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.policyName,{
                  on: {
                  input: (event) => {
                    self.taskNewInfoData[params.index].row.policyName = event
                  }
                }
                }),
              ]);
            }
          },
        ], //任务单参考信息 -- 新增

        showButton: true,
      }
    },
    mounted() {
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.SocialSecurityEmployeeClassify = data.data.SocialSecurityEmployeeClassify;
        } else {
          this.$Message.error(data.message);
        }
      })
      this.initData(this.$route.query)
    },
    computed: {

    },
    methods: {
      addRemark(val){
        this.remarkInfo.remark = this.remarkInfo.remark+val;
      },
      saveRemark(){
        if(this.remarkInfo.remark==''||this.remarkInfo.remark==undefined){
          this.$Message.error("请输入备注！");
          return;
        }
        this.remarkInfo.companyId = this.companyId;
        this.remarkInfo.employeeId = this.employeeId;
        this.remarkInfo.empTaskId = this.empTaskId;
        api.saveEmpRemark(this.remarkInfo).then(data => {
          if (data.data.code == 200) {
            this.$Message.success("备注保存成功");
            this.remarkInfo.remark = '';
            api.queryEmpRemark({companyId:this.remarkInfo.companyId,employeeId:this.remarkInfo.employeeId}).then(data2 => {
            if (data2.data.code == 200) {
              this.socialSecurityRemarkData = data2.data.data;
            }
            })
          } else {
            this.$Message.error("备注保存失败！" + data.message);
          }
        })
      },
      deleteRemark(empRemarkId){
        this.$Modal.confirm({
          title: "确认",
          content: "删除备注吗？",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            api.delEmpRemark({empRemarkId:empRemarkId,
            companyId:this.companyId,
            employeeId:this.employeeId}).then(data2 => {
              if (data2.data.code == 200) {
                this.socialSecurityRemarkData = data2.data.data;
              }
            })
          }
        })
      },
      routerMethed(taskCategory,processCategory,empTaskId){

          // 任务类型，DicItem.DicItemValue 1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作
          var name = 'empTaskHandleView';
          switch (taskCategory) {
            case '1':
            case '2':
            case '12':
            case '13':
            case '99':
              name = 'empTaskHandleView';
              break;
            case '3':
              name = 'empTaskHandle3View';
              break;
            case '4':
              name = 'empTaskHandle4View';
              break;
            case '5':
            case '6':
            case '14':
            case '15':
              name = 'empTaskHandle5View';
              break;
              case '7':
              name = 'empTaskHandle7View';
              break;
            default:
              name = 'empTaskHandleView'
          }
          if(this.$route.name == name){
              this.$router.push({name:'emprefresh',query:{operatorType:taskCategory,processCategory:processCategory,empTaskId: empTaskId,isNextMonth:0,name:name}})
          }else{
            // 根据任务类型跳转
          this.$router.push({
            name: name,
            query: {operatorType: taskCategory, processCategory:processCategory,empTaskId: empTaskId,isNextMonth:0}
          });
          }
      },
        getYearMonth(date){

        if(date==null || date=="")return "";
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        if(month>=1 && month<=9){
              month='0'+month
        }
          return year+'-'+month;
      },
      getSerial(){
        if (!this.socialSecurityPayOperator.comAccountId || this.socialSecurityPayOperator.comAccountId == '') {
          this.$Message.error("企业账号不存在，获取社保序号失败")
          return
        }
        this.isLoading = true;
        api.getSerial({
          comAccountId : this.socialSecurityPayOperator.comAccountId
        }).then(data => {
          if (data.data.code == 200) {
            this.socialSecurityPayOperator.empSsSerial = data.data.data;
          } else {
            this.$Message.error(data.data.message)
          }
          this.isLoading = false;
        })
      },
      initData(data) {
        this.empTaskId = data.empTaskId;
        this.operatorType = data.operatorType;
        this.processCategory = data.processCategory;
        this.sourceFrom = data.sourceFrom;
        this.socialSecurityPayOperator.empTaskId = this.empTaskId;
        var empTaskId = data.empTaskId;
        api.queryEmpTaskById({
          empTaskId: empTaskId,
          operatorType: 1,// 任务单费用段
          isNeedSerial:1//是否需要社保序号
        }).then(data => {

          if(data.data!=null) {
            this.employeeId = data.data.employeeId;
            this.companyId = data.data.companyId;
            this.empTaskId = data.data.empTaskId;
            this.socialSecurityRemarkData = data.data.remarks;
            if (data.data.empTaskPeriods.length > 0) {
              this.operatorListData = data.data.empTaskPeriods;
            } else {
              let operatorListData = []
              let periodObj = {}
              periodObj.remitWay = '1';
              periodObj.startMonth = data.data.startMonth;
              periodObj.endMonth = data.data.endMonth;
              periodObj.baseAmount = data.data.empBase
              operatorListData.push(periodObj)
              this.operatorListData = operatorListData
            }
            this.showButton = data.data.taskStatus == '1' || data.data.taskStatus == '2';
            this.$utils.copy(data.data, this.socialSecurityPayOperator);
            let handleMonth = this.socialSecurityPayOperator.handleMonth;

            if (handleMonth == null || handleMonth == '' || typeof(handleMonth) == 'undefined') {
              let date = new Date();
              handleMonth = this.getYearMonth(date, 'show');

              this.socialSecurityPayOperator.handleMonth = handleMonth;
            }
            let periodArr = []
            let period = {}
            period.base = this.socialSecurityPayOperator.empBase
            period.startMonth = this.socialSecurityPayOperator.startMonth
            period.endMonth = this.socialSecurityPayOperator.endMonth
            period.policyName = this.socialSecurityPayOperator.policyName
            this.taskNewInfoData.push(period)
            //获取用退工信息
            this.reworkInfo = data.data.amEmpTaskDTO
            this.reworkInfo.salary = data.data.salary

            if (!this.reworkInfo.taskStatus || (
                this.reworkInfo.taskStatus !== '3' && this.reworkInfo.taskStatus !== '10' && this.reworkInfo.taskStatus !== '12' && this.reworkInfo.taskStatus !== '13')) {
              this.reworkInfo.employFeedbackOptDate = '';
            }

            if (!this.socialSecurityPayOperator.rejectionRemarkMan || this.socialSecurityPayOperator.rejectionRemarkMan == '') {
              this.socialSecurityPayOperator.rejectionRemarkMan = data.data.modifiedDisplayName;
            }
            if (!this.socialSecurityPayOperator.handleRemarkMan || this.socialSecurityPayOperator.handleRemarkMan == '') {
              this.socialSecurityPayOperator.handleRemarkMan = data.data.modifiedDisplayName;
            }

            api.queryComAccountByEmpTaskId({empTaskId: empTaskId,operatorType:this.operatorType}).then((data) => {
              if(data.data!=null){
                this.company = data.data;
                this.company.leaderShipName = this.socialSecurityPayOperator.leaderShipName;
                this.company.serviceCenter = this.socialSecurityPayOperator.serviceCenter;
                this.socialSecurityPayOperator.comAccountId = data.data.comAccountId

              }
            })

            if(this.operatorType=='12'||this.operatorType=='13'){
              this.taskCategoryType=[{value: '12', label: '翻牌新进'},{value: '13', label: '翻牌转入'}]
            } else if (this.operatorType=='1'||this.operatorType=='2'){
              this.taskCategoryType=[{value: '1', label: '新进'},{value: '2', label: '转入'}]
            } else {
              if (this.processCategory=='1') {
                this.taskCategoryType=[{value: '1', label: '新进'},{value: '2', label: '转入'},{value: '99', label: '不做'}]
              } else if (this.processCategory=='4') {
                this.taskCategoryType=[{value: '12', label: '翻牌新进'},{value: '13', label: '翻牌转入'},{value: '99', label: '不做'}]
              }
              this.showButton = false;
            }
          }else{
             this.$Message.error(data.message)
          }
        });
        api.queryEmpArchiveByEmpTaskId({empTaskId: empTaskId,operatorType:data.operatorType}).then((res) => {
          if(res.data!=null){
            this.employee = res.data;
          }
        })
      },
      goBack() {
        this.sourceFrom !== 'search' ? this.$router.push({name: 'employeeOperatorView'}) : this.$router.go(-1);
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

        this.socialSecurityPayOperator.startMonth = value;
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
      handleStartMonthChange(value) {
        this.operatorListData[0]['startMonth'] = value;
      },
      instance(taskStatus, type) {
        var fromData = this.$utils.clear(this.socialSecurityPayOperator, '');

        // 办理状态：1、未处理 2 、处理中  3 已完成（已办） 4、批退 5、不需处理
        var content = "任务操作";
        if ('refuse' == type) {
          // if(this.socialSecurityPayOperator.rejectionRemark==''){
          //   this.$Message.warning('请输入批退原因。');
          //   return;
          // }
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

        if('save' == type || 'handle'==type){
          let comAccountId=this.socialSecurityPayOperator.comAccountId;
          if(typeof(comAccountId)=='undefined' || comAccountId==''){
             this.$Message.error("该雇员对应的企业没有开户,不能办理.");
            return;
          }
        }
        let handleType = 'handle'==type || 'save'==type;

//        if (handleType && (!this.socialSecurityPayOperator.empSsSerial || this.socialSecurityPayOperator.empSsSerial.trim() == '')) {
//          this.$Message.error("社保序号不能为空.");
//          return;
//        }
//
//        var reg = /(^[1-9]([0-9]{1,9})?$)/;
//        if (handleType && (!reg.test(this.socialSecurityPayOperator.empSsSerial))) {
//          this.$Message.error("社保序号输入不正确.");
//          return;
//        }
        if ((!this.socialSecurityPayOperator.empSsSerial || this.socialSecurityPayOperator.empSsSerial.trim() == '')) {
          if ('handle' == type) {
            this.$Message.error("社保序号不能为空.");
            return;
          }
        } else {
          var reg = /(^[1-9]([0-9]{1,9})?$)/;
          if (handleType && (!reg.test(this.socialSecurityPayOperator.empSsSerial))) {
            this.$Message.error("社保序号输入不正确.");
            return;
          }
        }

        let handleMonth = this.yyyyMM(this.socialSecurityPayOperator.handleMonth)
        let startMonthIsEqual = this.yyyyMM(this.socialSecurityPayOperator.startMonth) == handleMonth
        let handleMonthIsEqual = this.yyyyMM(this.socialSecurityPayOperator.startMonth) == this.yyyyMM(this.operatorListData[0].startMonth)

        if(handleType || 'noProgress'==type){
          let startMonth1IsNull = typeof(this.yyyyMM(this.socialSecurityPayOperator.startMonth))=='undefined' || this.yyyyMM(this.socialSecurityPayOperator.startMonth)==null || this.yyyyMM(this.socialSecurityPayOperator.startMonth)=='';
          let startMonth2IsNull = typeof(this.yyyyMM(this.operatorListData[0].startMonth))=='undefined' || this.yyyyMM(this.yyyyMM(this.operatorListData[0].startMonth))==null || this.yyyyMM(this.yyyyMM(this.operatorListData[0].startMonth))=='';
          if(startMonth1IsNull || startMonth2IsNull){
               this.$Message.error("起缴月份不能为空.");
               return;
          }
        }

        if(handleType){
            let currentMonth = this.yyyyMM(new Date());
            if(Number(handleMonth)<Number(currentMonth)){
               this.$Message.error("办理月份不能小于当前月份.");
               return;
            }

//            if (!this.socialSecurityPayOperator.empClassify) {
//              this.$Message.error("人员属性不能为空.");
//              return;
//            }
        }

        if(handleType && (!startMonthIsEqual || !handleMonthIsEqual)){
          if(!handleMonthIsEqual){
               this.$Message.error("两个起缴月份必须相等.");
               return;
          }else if(!startMonthIsEqual){
              if(Number(this.yyyyMM(this.socialSecurityPayOperator.startMonth))>Number(handleMonth)){
                  this.$Message.error("起缴月份必须小于或者等于办理月份.");
                  return;
              }

          }
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
              fromData.empClassify = this.socialSecurityPayOperator.empClassify;
              fromData.inDate = self.employee.inDate;
            }

            // 转下月处理
            if (type && type == 'next') {

              var nextDay = 27;
              if (self.company.expireDate) {
                nextDay = parseInt(self.company.expireDate) + 1;
              }
              var submitTime = new Date();
              submitTime.setDate(nextDay);
              fromData.submitTime = self.$utils.formatDate(submitTime, 'YYYY-MM-DD 00:00:00');
            }

            fromData.empTaskPeriods = self.filterData();
            this.isLoading = true;
            api.handleEmpTask(fromData).then(data => {

              if (data.code == 200) {
                self.$Message.success(content + "成功");
                if(taskStatus=='2'){
                  if(self.socialSecurityPayOperator.theSameTask.length>0){
                    let taskObj = self.socialSecurityPayOperator.theSameTask[0]
                    this.routerMethed(taskObj.taskCategory,taskObj.processCategory,taskObj.empTaskId);
                  }else{
                     // 返回任务列表页面
                    this.$router.push({name:'employeeOperatorView',})
                  }
                }else{
                    this.$router.push({name:'employeeOperatorView',})
                }
              } else {
                self.$Message.error(content + "失败！" + data.message);
              }
              this.isLoading = false;
            })
          }
        });

      },
      taskCategoryChg(option) {
        if (!option || option.value === '99') {
          this.showButton = false;
        } else {
          this.showButton = true;
        }
      },
      printForm(){
        api.printForm(this,api);
      }
    }
  }
</script>
