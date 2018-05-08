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
        <!-- <Button type="primary" @click="batchOperating">批量操作</Button> -->
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
          pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
        },
        searchConditions:[],
        searchCondition: {
          params: '',
          taskStatus:0
        },
        collapseInfo: [1],
        dismissalColumns: [
          // {title: '', type: 'selection', width: 60},
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
                      this.showInfoT(params.row.idNum,params.row.idCardType,params.row.empTaskId,params.row.employeeId,params.row.companyId,params.row.employmentId)
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '退工成功日期', key: 'jobCentreFeedbackDate', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.jobCentreFeedbackDate),
              ]);
            }
          },
          {title: '退工原因', key: 'outReason', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.outReason),
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
          {title: '雇员编号', key: 'employeeId', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeId),
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
          {title: '证件号码', key: 'idNum', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '公司名称', key: 'title', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
                 h('span', params.row.cici),
              ]);
            }
          },
          {title: '客服经理', key: 'leaderShipName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.leaderShipName),
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
          {title: '档案编号', key: 'docNum', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.docNum),
              ]);
            }
          },
          {title: '预留档案编号', key: 'yuliuDocNum', align: 'center', width: 150,sortable: true,
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
          {title: '退工日期', key: 'outDate', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.outDate),
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
          {title: '退工反馈', key: 'resignFeedback1', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.resignFeedback1),
              ]);
            }
          },
          {title: '录用处理结束', key: 'luyongHandleEndStr', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.luyongHandleEndStr),
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
          {title: '公司特殊情况', key: 'refuseSpecial', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseSpecial),
              ]);
            }
          },
          {title: '是否翻盘', key: 'change', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.change),
              ]);
            }
          }
        ],
        dismissalData: [],
         searchResultColumns: [
           {title: '未反馈', key: 'noFeedback', align: 'center', width: 220,
            render: (h, params) => {
               return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(99)
                  }
                }
              }, params.row.noFeedback);
            }
          },
          {title: '退工任务单签收退工未成功', key: 'refuseFinished', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(98)
                  }
                }
              }, params.row.refuseWaitFinished);
            }
          },
          {title: '退工成功', key: 'refuseFinished', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(1)
                  }
                }
              }, params.row.refuseFinished);
            }
          },
          {title: '档未到先退工', key: 'refuseBeforeWithFile', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(2)
                  }
                }
              }, params.row.refuseBeforeWithFile);
            }
          },
          {title: '退工单盖章未返回', key: 'refuseTicketStampNoReturn', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(3)
                  }
                }
              }, params.row.refuseTicketStampNoReturn);
            }
          },
          {title: '退工失败', key: 'refuseFailed', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(4)
                  }
                }
              }, params.row.refuseFailed);
            }
          },
          {title: '前道要求批退', key: 'beforeBatchNeedRefuse', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(5)
                  }
                }
              }, params.row.beforeBatchNeedRefuse);
            }
          },
          {title: '其他', key: 'other', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(6)
                  }
                }
              }, params.row.other);
            }
          },
          {title: '总计', key: 'amount', align: 'center', width: 231,
            render: (h, params) => {
                return h('a', {
                    attrs:{
                    'href': params.row.dataDownload
                    },
                    style: {textAlign: 'right'},
                    on:{
                    click:()=>{
                        this.showInfoTws(0)
                    }
                  }
                }, params.row.amount);
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
           this.pageData.pageNum =1;
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
        let params = this.searchCondition;
        api.resignSearchExportOpt(params);

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
      showInfoT (idNum,idCardType,empTaskId,employeeId,companyId,employmentId) {
        
        this.$router.push({name:'dismissalHandleEmployment', query: {idNum:idNum,idCardType:idCardType,empTaskId:empTaskId,employeeId:employeeId,companyId:companyId,employmentId:employmentId}});

      },
      showInfoTw (ind) {  
           this.pageData.pageNum = 1;
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.queryAmResign(this.searchCondition);

      },
      showInfoTws (ind) {
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.queryAmResign(this.searchCondition);

      },
      handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.queryAmResign(params);
      },
      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.queryAmResign(params);
      }
    }
  }
</script>
