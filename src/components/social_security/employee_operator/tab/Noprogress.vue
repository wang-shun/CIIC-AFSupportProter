<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        查询条件
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="*未处理：" prop="taskStatus">
                <Select v-model="operatorSearchData.taskStatus" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="-1" label="本月未处理"></Option>
                  <Option value="-2" label="下月未处理"></Option>
                  <!--<Option value="3" label="处理中"></Option>
                  <Option value="4" label="已完成"></Option>
                  <Option value="5" label="批退"></Option>-->
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="结算区县：" prop="settlementArea">
                <Select v-model="operatorSearchData.settlementArea" style="width: 100%;" transfer>
                  <Option value="" label="全部"></Option>
                  <Option value="徐汇" label="徐汇"></Option>
                  <Option value="浦东" label="浦东"></Option>
                  <Option value="闵行" label="闵行"></Option>
                  <Option value="闸北" label="闸北"></Option>
                  <Option value="黄浦" label="黄浦"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保账户类型：" prop="ssAccountType">
                <Select v-model="operatorSearchData.ssAccountType" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="中智大库"></Option>
                  <Option value="2" label="中智外包"></Option>
                  <Option value="3" label="独立户"></Option>
                </Select>
              </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人员分类：" prop="empClassify">
                <Select v-model="operatorSearchData.empClassify" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="本地"></Option>
                  <Option value="2" label="外地"></Option>
                  <Option value="3" label="外籍三险"></Option>
                  <Option value="4" label="外籍五险"></Option>
                  <Option value="5" label="延迟退休人员"></Option>
                </Select>
              </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账户：" prop="ssAccount">
                <input-account v-model="operatorSearchData.ssAccount"></input-account>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="operatorSearchData.companyId"></input-company>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="身份证号：" prop="idNum">
                <Input v-model="operatorSearchData.idNum" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单类型：" prop="taskCategory">
                <Select v-model="operatorSearchData.taskCategory" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="新进"></Option>
                  <Option value="2" label="转入"></Option>
                  <Option value="3" label="调整"></Option>
                  <Option value="4" label="补缴"></Option>
                  <Option value="5" label="转出"></Option>
                  <Option value="7" label="退账"></Option>
                  <!--<Option value="6" label="终止"></Option>
                  <Option value="8" label="提取"></Option>
                  <Option value="9" label="特殊操作"></Option>-->
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：" prop="title">
                <input-company-name v-model="operatorSearchData.title" ></input-company-name>
                <!-- <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input> -->
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeId">
                <Input v-model="operatorSearchData.employeeId" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="是否加急：" prop="urgent">
                <Select v-model="operatorSearchData.urgent" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="0" label="否"></Option>
                  <Option value="1" label="是"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保起缴月份：" prop="startMonth">
                <Date-picker v-model="operatorSearchData.startMonth" type="month" 
                             placeholder="选择年月份" style="width: 100%;" transfer></Date-picker>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['operatorSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Button type="primary" style="width: 100px;" @click="checkHandle">批量办理</Button>
      <Button type="error" @click="showRefuseReason">批退</Button>
      <Button type="info" @click="exprotExcel">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="selection"
             :columns="employeeResultColumns"
             :data="employeeResultData"
             @on-selection-change="selectionChange"></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSite"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

    <!-- 批退理由 -->
    <!-- <Modal
      v-model="isRefuseReason"
      :mask-closable="false"
      :closable="false"
      @on-ok="handleRefuseReason">
      <p>
        <Input v-model="rejectionRemark" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
      </p>
    </Modal> -->


    <!-- 批退理由 -->
      <Modal
        v-model="isRefuseReason"
        :mask-closable="false">
        <Form>
          <p>
            <Form-item>
              <Input v-model="rejectionRemark" type="textarea" :rows=4  placeholder="请填写批退备注..."></Input>
            </Form-item>
          </p>
        </Form>
         <div slot="footer">
            <Button  size="large"  @click="cancel">取消</Button>
            <Button  size="large"  @click="handleRefuseReason">确定</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'

  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  export default {
    components: {InputAccount, InputCompany,InputCompanyName},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          taskStatus: '-1',
          employeeName: '',
          settlementArea: '',
          ssAccountType: '',
          //empClassify: '',
          ssAccount: '',
          companyId: '',
          idNum: '',
          taskCategory: '',
          title: '',
          employeeId: '',
          urgent: '',
          startMonth: '',
        },

        // 批退
        isRefuseReason: false,
        rejectionRemark: '',
        selectEmployeeResultData: [],

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        employeeResultColumns: [
          {
            type: 'selection',
            fixed: 'left',
            width: 60,
            align: 'center'
          },
          {
            title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.batchHandle(params.row);
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {
            title: '任务单类型', key: 'taskCategory', width: 120, fixed: 'left', align: 'center',
            render: (h, params) => {
              
              return params.row.isChange=='1'?this.$decode.taskCategory(params.row.taskCategory)+'(更正)':this.$decode.taskCategory(params.row.taskCategory)
            }
          },
          {
            title: '是否加急', key: 'urgent', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.urgent(params.row.urgent)
            }
          },
          {
            title: '雇员', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center'
          },
          {
            title: '雇员证件号', key: 'idNum', width: 200, align: 'center'
          },
          {
            title: '企业社保账号', key: 'ssAccount', width: 200, align: 'center'
          },
          {
            title: 'UKEY密码', key: 'ssPwd', width: 200, align: 'center'
          },
          // {
          //   title: '执行日期', key: 'doDate', width: 150, align: 'center'
          // },
          {
            title: '客户编号', key: 'companyId', width: 120, align: 'center'
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center'
          },
          {
            title: '发起人', key: 'submitterId', width: 100, align: 'center'
          },
          {
            title: '发起时间', key: 'submitTime', width: 180, align: 'center'
          },
          {
            title: '备注', key: 'handleRemark', width: 300, align: 'center'
          }
        ]
      }
    },
    async mounted() {
      
      this.employeeOperatorQuery();
    },
    computed: {
    
    },
    methods: {
      routerToCommcialOperator(name) {
        this.$router.push({
          name: 'employeeCommcialOperator',
          query: {operatorType: name}
        });
      },
      employeeOperatorQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          // 处理 社保起缴月份
          if (params.startMonth) {
            params.startMonth = this.$utils.formatDate(params.startMonth, 'YYYYMM');
          }
        }

        api.employeeOperatorQuery({
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            
            this.employeeResultData = data.data;
            this.employeeResultPageData.total = data.total;
          }
        })
      },
      exprotExcel() {
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          // 处理 社保起缴月份
          if (params.startMonth) {
            params.startMonth = this.$utils.formatDate(params.startMonth, 'YYYYMM');
          }
        }
        api.employeeOperatorQueryExport({
          pageSize: 999999,
          pageNum: 0,
          params: params,
        });
      },
      handlePageNum(val) {
        this.employeeResultPageData.pageNum = val;
        this.employeeOperatorQuery();
      },
      handlePageSite(val) {
        this.employeeResultPageData.pageSize = val;
        this.employeeOperatorQuery();
      },
      // 检查是否选中任务
      checkSelectEmployeeResultData() {
        if (this.selectEmployeeResultData.length == 0) {
          this.$Modal.warning({
            title: '批退',
            content: '请选择任务'
          });
          return false;
        }
        return true;
      },
      cancel () {
         this.isRefuseReason = false;
      },
      // 批退
      showRefuseReason() {
        if (this.checkSelectEmployeeResultData()) {
          this.isRefuseReason = true
        }
      },
      handleRefuseReason() {
        let remark= this.rejectionRemark;
        if(remark==""){
          this.$Message.warning('请填写批退原因！');
          return;
        }
        var ids = [];
        for (var d of this.selectEmployeeResultData) {
          ids.push(d.empTaskId);
        }
        var ajax = api.refuseReason({
          remark:remark,
          ids: ids
        })
        this.$ajax.handle({
          vm: this,
          ajax: ajax,
          title: '任务批退',
          callback: (data) => {
            this.isRefuseReason = false;
            this.employeeOperatorQuery();
          }
        })
         
      },
      // 选中项发生变化时就会触发
      selectionChange(selection) {
        this.selectEmployeeResultData = selection;
      },
      // 检测批量办理
      checkHandle() {
        // 检查类型是否一致（只有选中了任务才能进行办理）
        if (!this.checkSelectEmployeeResultData()) {
          return false;
        }

        var length = this.selectEmployeeResultData.length;
        if (length > 1) {
          var taskCategory = this.selectEmployeeResultData[0].taskCategory

          for (var i = 1; i < length; i++) {
            if (taskCategory != this.selectEmployeeResultData[i].taskCategory) {
              this.$Modal.warning({
                title: '任务办理',
                content: '任务类型不一致'
              });
              return false;
            }
          }
        }
        this.batchHandle(this.selectEmployeeResultData, true);
      },
      // 批量办理
      batchHandle(data, isBatch = false) {
        if (isBatch) {
          // 组织任务 ID
          var empTaskIds = "";
          var rows = data;
          
          for (let i=0;i<rows.length;i++) {
              if(i==rows.length-1){
                empTaskIds+=rows[i].empTaskId;
              }else{
                empTaskIds+=rows[i].empTaskId+",";
              }
          }

          // 任务类型，DicItem.DicItemValue 1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作
          var taskCategory = rows[0].taskCategory;
          var name = 'empTaskHandleView';
          switch (taskCategory) {
            case '1':
            case '2':
              name = 'empTaskBatchHandleView';
              break;
            case '3':
              name = 'empTaskBatchHandle3View';
              break;
            case '4':
              name = 'empTaskBatchHandle4View';
              break;
            case '5':
            case '6':
              name = 'empTaskBatchHandle5View';
              break;
              case '7':
              name = 'empTaskBatchHandle7View';
              break;
            default:
              name = 'empTaskBatchHandleView'
          }

          this.$router.push({
            name: name,
            query: {operatorType: taskCategory, empTaskIds: empTaskIds}
          });
        } else {

          // 任务类型，DicItem.DicItemValue 1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作
          var taskCategory = data.taskCategory;
          var name = 'empTaskHandleView';
          switch (taskCategory) {
            case '1':
            case '2':
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
              name = 'empTaskHandle5View';
              break;
              case '7':
              name = 'empTaskHandle7View';
              break;
            default:
              name = 'empTaskHandleView'
          }

          // 根据任务类型跳转
          this.$router.push({
            name: name,
            query: {operatorType: taskCategory, empTaskId: data.empTaskId}
          });
        }
      },
      
    }
  }
</script>
