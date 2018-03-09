<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          用工资料管理任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="goHandle">档案办理</Button>
        <!-- <Button type="primary">批量操作</Button> -->
        <Button type="info" @click="exportXLS">导出XLS</Button>
        <Button type="primary" @click="goFileMatrialsUseAndBorrow">档案材料利用与借出</Button>
        <!--<Button type="primary" @click="isShowStockTitle = true">生成入库贴头</Button>-->
        <!-- <Dropdown>
          <Button type="primary">
            退工单打印
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>打印(套打)</DropdownItem>
            <DropdownItem>打印2(打印一式四联)</DropdownItem>
            <DropdownItem>外来从业人员打印</DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
      </Col>
    </Row>
    <Table border ref="payComSelection" :columns="recordComprehensiveHandlingColumns" :data="recordComprehensiveHandlingData" class="mt20"></Table>
     <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>
    <Table border :columns="searchResultColumns1" :data="searchResultData1" class="mt20"></Table>
    <Table border :columns="searchResultColumns2" :data="searchResultData2" class="mt20"></Table>

    <!-- <Modal
      v-model="isShowStockTitle"
      title="生成入库贴头"
    >
      <employee-info :customerInfo="info" v-for="(info, index) in customerInfos" :key="index" :style="{borderBottom: index !== customerInfos.length - 1 ? '1px solid #ccc' : '', marginBottom: index !== customerInfos.length - 1 ? '20px' : ''}"></employee-info>
      <div slot="footer">
        <Button type="primary" @click="isShowStockTitle = false;">生成入库贴头</Button>
      </div>
    </Modal> -->
  </div>
</template>
<script>
  import {em_print, customerInfo} from "../../assets/js/employ_manage/common_filed"
  import searchEmployment from "./common/SearchEmployment.vue"
  import employeeInfo from "./common/EmployeeInfo.vue"
  import api from '../../api/employ_manage/hire_operator'
  export default {
    components: {employeeInfo, searchEmployment},
    data() {
      return {
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        collapseInfo: [1],
        searchConditions:[],
        searchCondition: {
          params: '',
          taskStatus:'',
          taskCategory:''
        },
        // 下半部分
        recordComprehensiveHandlingColumns: [
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
                      this.showInfoT(params.row.idNum,params.row.idCardType,params.row.empTaskId,params.row.employmentId,params.row.employeeId,params.row.companyId)
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '用工方式', key: 'employWay', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employWay),
              ]);
            }
          },
          {title: '用工属性', key: 'employProperty', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employProperty),
              ]);
            }
          },
          {title: '职介反馈日期', key: 'jobCentreFeedbackDate', align: 'center', width: 150,
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
          {title: '办理类型', key: 'handleType', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleType),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeId', align: 'center', width: 150,
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
          {title: '证件号码', key: 'idNum', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', align: 'center', width: 150,
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
          {title: '退工日期', key: 'outDate', align: 'center', width: 150,
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
          {title: '用工反馈', key: 'employFeedback', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employFeedback),
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
          {title: '退工反馈2', key: 'resignFeedback2', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.resignFeedback2),
              ]);
            }
          },
          {title: '退档日期', key: 'refuseFileDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseFileDate),
              ]);
            }
          },
          {title: '退工送办日期', key: 'refuseSendHandleDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseSendHandleDate),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'companySpecialCase', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companySpecialCase),
              ]);
            }
          }
        ],
        recordComprehensiveHandlingData: [],

        searchResultColumns1: [
          {title: '用工材料未签收', key: 'noSign', align: 'center', width: 220,
             render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(1,1)
                  }
                }
              }, params.row.noSign);
            }
          },
          {title: '已开F单未完成', key: 'finished', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(2,1)
                  }
                }
              }, params.row.finished);
            }
          },
          {title: '用工成功', key: 'employSuccess', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(3,1)
                  }
                }
              }, params.row.employSuccess);
            }
          },
          {title: '用工失败', key: 'employFailed', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(4,1)
                  }
                }
              }, params.row.employFailed);
            }
          },
          {title: '前道要求撤消用工', key: 'employCancel', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(5,1)
                  }
                }
              }, params.row.employCancel);
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
                    this.showInfoTw(6,1)
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
                    this.showInfoTws(0,1)
                }
               }
            }, params.row.amount);
            }
          }
        ],
        searchResultData1: [],

        searchResultColumns2: [
          {title: '未反馈', key: 'noFeedback', align: 'center', width: 220,
            render: (h, params) => {
               return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTw(1,2)
                  }
                }
              }, params.row.noFeedback);
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
                    this.showInfoTw(2,2)
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
                    this.showInfoTw(3,2)
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
                    this.showInfoTw(4,2)
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
                    this.showInfoTw(5,2)
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
                    this.showInfoTw(6,2)
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
                    this.showInfoTw(7,2)
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
                        this.showInfoTws(0,2)
                    }
                  }
                }, params.row.amount);
            }
          }
        ],
        searchResultData2: [],

        // 弹出框
        isShowStockTitle: false,
        customerInfos: [customerInfo, customerInfo, customerInfo]
      }
    },
    mounted() {
       this.archiveQuery({})
       this.employeeArchiveCollection({})
       this.resignArchiveCollection({})
    },
    methods: {
      searchEmploiees(conditions) {
         this.pageData.pageNum =1;
           this.searchConditions =[];
            for(var i=0;i<conditions.length;i++)
                  this.searchConditions.push(conditions[i].exec);
        
           this.searchCondition.params = this.searchConditions.toString();
           this.archiveQuery(this.searchCondition);
           this.employeeArchiveCollection(this.searchCondition);
           this.resignArchiveCollection(this.searchCondition);

      },
      goHandle() {
        this.$router.push({name: "recordComprehensive"});
      },
      goFileMatrialsUseAndBorrow() {
        let selection = this.$refs.payComSelection.getSelection();

        //判断条件
        //是否有选中列
        if(selection.length == 0){
          alert("没有选中的列");
          return;
        }

        //已有批次的不可再添加
        let isHaveBatch = false;
        var tempId;
        var tempId1;
        selection.some(item => {
          tempId = item.archiveId;
          tempId1 = item.employeeId;
        });
        
        this.$router.push({name:'fileMatrialsUseAndBorrow', query: {archiveId:tempId,employeeId:tempId1}});
      },
      exportXLS() {
        let params = this.searchConditions;
        api.archiveSearchExportOpt(params);
      },
      generateInStock() {

      },
      sendToFileMangement() {

      },
      archiveQuery(params){

        let self =this
        api.queryAmArchive({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          self.recordComprehensiveHandlingData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
      employeeArchiveCollection(params){
        let self =this
        api.employeeArchiveCollection({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
         
          self.searchResultData1 = data.data.row;
         
        })
      },
      resignArchiveCollection(params){
        let self =this
        api.resignArchiveCollection({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
         
          self.searchResultData2 = data.data.row;
         
        })
      },
      showInfoTw (ind,category) {  
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.searchCondition.taskCategory = category;
           this.archiveQuery(this.searchCondition);

      },
      showInfoTws (ind,category) {
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.searchCondition.taskCategory = category;
           this.archiveQuery(this.searchCondition);

      },
      showInfoT (idNum,idCardType,empTaskId,employmentId,employeeId,companyId) {
        this.$router.push({name:'recordComprehensive', query: {idNum:idNum,idCardType:idCardType,empTaskId:empTaskId,employmentId:employmentId,employeeId:employeeId,companyId:companyId}});
      },
      handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.archiveQuery(params);
      },
      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.archiveQuery(params);
      }
    },
    computed: {

    }
  }
</script>
