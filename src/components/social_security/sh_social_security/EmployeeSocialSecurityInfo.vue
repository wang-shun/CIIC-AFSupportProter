<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        客户基本信息
        <div slot="content">
          <Form :label-width=120>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：">
                  <label>{{employeeAndCustomer.companyId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：">
                  <label>{{employeeAndCustomer.title}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：">
                  <label>{{employeeAndCustomer.leaderShipName}}</label>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：">
                  <label>{{employeeAndCustomer.serviceCenter}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="开户密码：">
                  <label>{{employeeAndCustomer.ssPwd}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：">
                  <label>{{employeeAndCustomer.settlementArea}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：">
                  <label>{{employeeAndCustomer.employeeId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：">
                  <label>{{employeeAndCustomer.employeeName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号码：">
                  <label>{{employeeAndCustomer.idNum}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入职日期：">
                  <label>{{employeeAndCustomer.inDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保序号：">
                  <Input style="width: 200px" v-model="employeeAndCustomer.ssSerial" :disabled="this.$route.query.empArchiveId==null"  placeholder=""></Input>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="学历：">
                  <label>{{employeeAndCustomer.education}}</label>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：">
                  <label>{{employeeAndCustomer.ssAccount}}</label>
                </Form-item>
              </Col>

              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="人员分类：">
                  <label>{{getEmpClassify(employeeAndCustomer.empClassify)}}</label>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="离职日期：">
                  <label>{{employeeAndCustomer.outDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="人员属性：">
                  <Select style="width: 200px"  v-model="employeeAndCustomer.empClassify" transfer :disabled="this.$route.query.empArchiveId==null"  placeholder="" >
                    <Option value="" > </Option>
                    <Option v-for="item in SocialSecurityEmployeeClassifyList" :value="item.key" :key="item.key" :label="item.value"></Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：">
                  <label>{{$decode.accountType(employeeAndCustomer.ssAccountType)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="离职操作日期：">
                  <label>{{employeeAndCustomer.outOperateDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="合同起始日期：">
                  <label>{{employeeAndCustomer.laborStartDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="合同截止日期：">
                  <label>{{employeeAndCustomer.laborEndDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="前道提交费用缴纳至：">
                  <label>{{employeeAndCustomer.endMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保状态：">
                <label>{{this.$decode.ssArchiveTaskStatus(employeeAndCustomer.archiveTaskStatus)}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理月份（操作日期）：">
                <label>{{ employeeAndCustomer.ssMonth }}</label>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        用退工信息
        <div slot="content">
          <Form :label-width=120>
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
      <Panel name="4">
        社保汇缴信息
        <div slot="content">
          <Form :label-width=120>
            <Row>
              <Col :sm="{span: 12}">
                <Table border :columns="socialSecurityInfoListColumns" :data="socialSecurityInfoListData"></Table>
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
                  <Input style="width: 500px" v-model="remarkInfo.remark" :disabled="this.$route.query.empArchiveId==null"  placeholder=""></Input>
                      <Button type="primary" @click="saveRemark" v-show="this.$route.query.empArchiveId" >添加</Button>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 12}">
              <Form-item label="点击添加固定项：">
                <Button @click="addRemark('客服要求缴纳至')" :disabled="this.$route.query.empArchiveId==null">客服要求缴纳至</Button>&nbsp;&nbsp;
                <Button @click="addRemark('集体转移')" :disabled="this.$route.query.empArchiveId==null">集体转移</Button>&nbsp;&nbsp;
                <Button @click="addRemark('补缴')" :disabled="this.$route.query.empArchiveId==null">补缴</Button>&nbsp;&nbsp;
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
        雇员任务单
        <div slot="content">
          <origin-emp-task-info :empArchiveId="this.$route.query.empArchiveId"></origin-emp-task-info>
        </div>
      </Panel>
      <!--<Panel name="4">-->
        <!--变动历史-->
        <!--<div slot="content">-->
          <!--<Form :label-width=100>-->
            <!--<Row class="mt20">-->
              <!--<Col :sm="{span: 20}">-->
                <!--<Table width="731" border :columns="changeListColumns" :data="changeListData"></Table>-->
              <!--</Col>-->
            <!--</Row>-->
          <!--</Form>-->
        <!--</div>-->
      <!--</Panel>-->
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="saveEmpSerial" v-show="this.$route.query.empArchiveId" >保存</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
//  import {mapState, mapGetters, mapActions} from 'vuex'
//  import EventTypes from '../../../store/event_types'
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import api from '../../../api/social_security/employee_operator'
  import originEmpTaskInfo from './OriginEmpTaskInfo.vue'
  import dict from '../../../api/dict_access/social_security_dict'

  export default {
    components: {originEmpTaskInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6], //展开栏
        customer:{

        },
        SocialSecurityEmployeeClassifyList:[],
        //用退工信息
        reworkInfo:{},
        //备注信息
        remarkInfo:{
          companyId:'',
          employeeId:'',
          remark: '',
          empArchiveId: ''
        },
        employeeAndCustomer:{
          companyId:'',
          title:'',
          leaderShipName:'',
          employeeId:'',
          idNum:'',
          inDate:'',
          ssSerial:'',
          education:'',
          ssAccount:'',
          ssMonth:'',
         // empClassify:'',
          outDate:'',
          comAccountId:'',
        },//客户和雇员基本信息
        socialSecurityInfoListData:[],//基数变更详情
        socialSecurityRemarkData:[],//备注列表
        changeListData:[],//变动历史
        socialSecurityInfoListColumns: [
          {
            title: '变更类型', key: 'remitWay', align: 'center', width: 162,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.remitWay==1?'正常': params.row.remitWay==2?'补缴':params.row.remitWay==3?'调整':''),
              ]);
            }
          },
          {
            title: '基数', key: 'baseAmount', align: 'center', width: 183,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.baseAmount),
              ]);
            }
          },
          {
            title: '起缴年月', key: 'startMonth', align: 'center', width: 203,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {
            title: '截至年月', key: 'endMonth', align: 'center', width: 203,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          }
        ],
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

        changeListColumns: [
          {
            title: '任务单编号', key: 'empTaskId', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.enterView(params.row);
                      // this.$router.push({
                      //   name: 'employeeSocialSecurityTaskInfo',
                      //   query: {operatorType: params.row.taskCategory, sourceFrom: 'search',empTaskId:params.row.empTaskId,empArchiveId:this.$route.query.empArchiveId}
                      // });
                    }
                  }
                }, params.row.empTaskId)
              ]);
            }
          },
          {
            title: '办理方式', key: 'handleWay', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.handleWay=='1'?'网上申报':params.row.handleWay=='2'?'柜面办理':''),
              ]);
            }
          },
          {
            title: '变更内容', key: 'taskCategory', align: 'center', width: 105,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.taskCategory!='9'?this.$decode.taskCategory(params.row.taskCategory):this.$decode.specialOperatorType(params.row.taskCategorySpecial)),
              ]);
            }
          },
          {
            title: '任务发起人', key: 'createdDisplayName', align: 'center', width: 115,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.createdDisplayName),
              ]);
            }
          },
          {
            title: '任务发起日期', key: 'submitTime', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          {
            title: '办理结果', key: 'taskStatus', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', this.$decode.empTaskStatus(params.row.taskStatus)),
              ]);
            }
          }
        ]
      }
    },
    async mounted() {

      this.loadDict();

      let params = {empArchiveId:this.$route.query.empArchiveId,
                    companyId:this.$route.query.companyId,
                    employeeId:this.$route.query.employeeId}

      api.employeeDetailInfoQuery(params).then(data=>{
          this.employeeAndCustomer=data.data.ssEmpArchive
          this.socialSecurityInfoListData=data.data.empBasePeriod
          this.changeListData = data.data.ssEmpTasks
          this.reworkInfo = data.data.amEmpTask
          this.socialSecurityRemarkData = data.data.remarks
          if (!this.reworkInfo.taskStatus || (
            this.reworkInfo.taskStatus !== '3' && this.reworkInfo.taskStatus !== '10' && this.reworkInfo.taskStatus !== '12' && this.reworkInfo.taskStatus !== '13')) {
              this.reworkInfo.employFeedbackOptDate = '';
          }
      })
    },
    computed: {

    },
    methods: {
      addRemark(val){
        this.remarkInfo.remark = this.remarkInfo.remark+val;
      },
      deleteRemark(empRemarkId){
        this.$Modal.confirm({
          title: "你确认保存信息吗？",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            api.delEmpRemark({empRemarkId:empRemarkId,
            companyId:this.employeeAndCustomer.companyId,
            employeeId:this.employeeAndCustomer.employeeId}).then(data2 => {
              if (data2.data.code == 200) {
                this.socialSecurityRemarkData = data2.data.data;
              }
            })
          }
        })
      },
      saveRemark(){
        if(this.remarkInfo.remark==''||this.reworkInfo.remark==undefined){
          this.$Message.error("请输入备注");
          return;
        }
        this.remarkInfo.empArchiveId = this.$route.query.empArchiveId;
        this.remarkInfo.companyId = this.employeeAndCustomer.companyId;
        this.remarkInfo.employeeId = this.employeeAndCustomer.employeeId;
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
      goBack() {
        this.$router.push({name: 'employeeSocialSecuritySearch'});
      },
      // getEmpClassify(val){
      //   if(val==null || typeof(val)=='undefined')return ''
      //   return this.$decode.empClassify(val)
      // }
      saveEmpSerial(){
        var reg = /(^[1-9]([0-9]{1,9})?$)/;
        if (!reg.test(this.employeeAndCustomer.ssSerial)) {
          this.$Message.error("社保序号输入不正确.");
          return;
        }
          var formData={
            ssSerial:'',
            empClassify:this.employeeAndCustomer.empClassify,
            empArchiveId:this.$route.query.empArchiveId,
            comAccountId: this.employeeAndCustomer.comAccountId
          };
          this.$Modal.confirm({
          title: "你确认保存信息吗？",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            {//收集数据
              formData.ssSerial = this.employeeAndCustomer.ssSerial
            }
            api.saveEmpSerial(formData).then(data => {
              data=data.data;
              if (data.code == 200) {
                this.$Message.success("信息保存成功");
                // 返回任务列表页面
                history.go(-1);
              } else {
                this.$Message.error("信息保存失败！" + data.message);
              }
            })
           }
        })
      },
      loadDict(){
       dict.getDictData().then(data => {
        if (data.code == 200) {
          this.SocialSecurityEmployeeClassifyList = data.data.SocialSecurityEmployeeClassify;
        }
      });
      },
      enterView(data){
        // 任务类型，DicItem.DicItemValue 1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作
          var taskCategory = data.taskCategory;
          var name = 'empTaskHandleView';
          let type={}
          switch (taskCategory) {
            case '1':
            case '2':
            case '12':
            case '13':
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
              type={type:3}
              name = 'empTaskHandle7View';
              break;
            default:
              name = 'empTaskHandleView'
          }


          // 根据任务类型跳转
          this.$router.push({
            name: name,
            query: {operatorType: taskCategory,...type,empTaskId: data.empTaskId,sourceFrom:'search'}
          });
      }
    }
  }
</script>
