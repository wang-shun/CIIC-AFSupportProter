<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          退工档案任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <!-- <Button type="primary" @click="goHandle">办理</Button> -->
        <Button type="primary" @click="batchOperating">批量操作</Button>
        <Button type="info" @click="exportXLS">导出XLS</Button>
      </Col>
    </Row>
    <Table border :columns="dismissalColumns" :data="dismissalData" class="mt20"></Table>
       <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>
    <Table border :columns="searchResultColumns" :data="searchResultData" class="mt20"></Table>
  </div>
</template>
<script>
  import {em_print, customerInfo, batchOperate} from "../../assets/js/employ_manage/common_filed"
  import searchEmployment from "./common/SearchEmployment.vue"
  import employeeInfo from "./common/EmployeeInfo.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {searchEmployment},
    data() {
      return {
         pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        searchConditions:[],
        searchCondition: {
          params: '',
          taskStatus:0
        },
        collapseInfo: [1],
        dismissalColumns: [
          {title: '', type: 'selection', width: 60},
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.showInfoT(params.row.employeeId,params.row.companyId,params.row.employmentId)
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '序号', key: 'index', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.index),
              ]);
            }
          },
          {title: '职介反馈日期', key: 'intermediaryFeedbackDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.intermediaryFeedbackDate),
              ]);
            }
          },
          {title: '退工原因', key: 'refuseReason', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseReason),
              ]);
            }
          },
          {title: '用工属性', key: 'employProperty', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employProperty),
              ]);
            }
          },
          {title: '办理类型', key: 'handleType', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleType),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '身份证号码', key: 'idNum', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '客户编号', key: 'companyNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'title', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '客服经理', key: 'serviceManager', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceManager),
              ]);
            }
          },
          {title: '客服中心', key: 'serviceCenter', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '档案编号', key: 'docNum', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.docNum),
              ]);
            }
          },
          {title: '预留档案编号', key: 'yuliuDocNum', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.yuliuDocNum),
              ]);
            }
          },
          {title: '存档地', key: 'archivePlace', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.archivePlace),
              ]);
            }
          },
          {title: '实际录用日期', key: 'employDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employDate),
              ]);
            }
          },
          {title: '退工日期', key: 'refuseDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseDate),
              ]);
            }
          },
          {title: '出库日期', key: 'storageOutDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.storageOutDate),
              ]);
            }
          },
          {title: '退工反馈', key: 'refuseFeedback', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseFeedback),
              ]);
            }
          },
          {title: '退工反馈2', key: 'refuseFeedback2', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseFeedback2),
              ]);
            }
          },
          {title: '录用处理结束', key: 'employHandleEnd', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employHandleEnd),
              ]);
            }
          },
          {title: '综保退工日期', key: 'comprehensiveInsuranceRefuseDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comprehensiveInsuranceRefuseDate),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'companySpecialCase', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companySpecialCase),
              ]);
            }
          }
        ],
        dismissalData: [],
         searchResultColumns: [
          {title: '未反馈', key: 'noFeedback', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.noFeedback),
              ]);
            }
          },
          {title: '退工成功', key: 'refuseFinished', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseFinished),
              ]);
            }
          },
          {title: '档未到先退工', key: 'refuseBeforeWithFile', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseBeforeWithFile),
              ]);
            }
          },
          {title: '退工单盖章未返回', key: 'refuseTicketStampNoReturn', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseTicketStampNoReturn),
              ]);
            }
          },
          {title: '退工失败', key: 'refuseFailed', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseFailed),
              ]);
            }
          },
          {title: '前道要求批退', key: 'beforeBatchNeedRefuse', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.beforeBatchNeedRefuse),
              ]);
            }
          },
          {title: '其他', key: 'other', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.other),
              ]);
            }
          },
          {title: '总计', key: 'amount', align: 'center', width: 231,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.amount),
              ]);
            }
          }
        ],
        searchResultData: [],
      }
    },
    mounted() {
      this.queryAmResign({}),
      this.queryResignTaskCount({})
    },
    methods: {
      searchEmploiees(conditions) {
          
            this.searchConditions =[];
            for(var i=0;i<conditions.length;i++)
                  this.searchConditions.push(conditions[i].exec);
        
           this.searchCondition.params = this.searchConditions.toString();
           
           this.queryAmResign(this.searchCondition);
           this.queryResignTaskCount(this.searchCondition);
      },
      goHandle() {
        this.$router.push({name: "dismissalHandleEmployment"});
      },
      batchOperating() {

      },
      exportXLS() {

      },queryAmResign(params){
        let self =this
        api.queryAmResign({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          self.dismissalData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
      queryResignTaskCount(params){

        let self =this
        api.queryResignTaskCount({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
         
          self.searchResultData = data.data.row;
         
        })
      },
      showInfoT (employeeId,companyId,employmentId) {
       
        this.$router.push({name:'dismissalHandleEmployment', query: {employeeId:employeeId,companyId:companyId,employmentId:employmentId}});

      },
      handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.employeeQuery(params);
      },
      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.employeeQuery(params);
      }
    }
  }
</script>
