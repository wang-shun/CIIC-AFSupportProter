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
        <Button type="info" @click="printLabel">打印贴头</Button>
        <Button type="info" @click="exportXLS">导出XLS</Button>
        <Button type="primary" @click="goFileMatrialsUseAndBorrow">档案材料利用与借出</Button>
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
          pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
        },
        collapseInfo: [1],
        searchConditions:[],
        searchCondition: {
          params: '',
          taskStatus:'',
          taskCategory:'',
          taskResignStatus:''
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
                      this.showInfoT(params.row.idNum,params.row.idCardType,params.row.empTaskId,params.row.employmentId,params.row.employeeId,params.row.companyId,params.row.empTaskResignId)
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
          {title: '实际录用日期', key: 'employDate', align: 'center', width: 150,sortable: true,
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
          {title: '公司特殊情况', key: 'archiveSpecial', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.archiveSpecial),
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
          {title: '用工材料已签收', key: 'finished', align: 'center', width: 220,
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
                    this.showInfoTwr(99,2)
                  }
                }
              }, params.row.noFeedback);
            }
          },
          {title: '退工任务单签收退工未成功', key: 'refuseWaitFinished', align: 'center', width: 220,
            render: (h, params) => {
              return h('a', {
                attrs:{
                'href': params.row.dataDownload
                },
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.showInfoTwr(98,2)
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
                    this.showInfoTwr(1,2)
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
                    this.showInfoTwr(2,2)
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
                    this.showInfoTwr(3,2)
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
                    this.showInfoTwr(4,2)
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
                    this.showInfoTwr(5,2)
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
                    this.showInfoTwr(6,2)
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
                        this.showInfoTwsr(0,2)
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
        var employeeName;
        selection.some(item => {
          tempId = item.archiveId;
          tempId1 = item.employeeId;
          employeeName = item.employeeName;
        });
        
        this.$router.push({name:'fileMatrialsUseAndBorrow', query: {archiveId:tempId,employeeId:tempId1,employeeName:employeeName}});
      },
      exportXLS() {
        let params = this.searchCondition;
        api.archiveSearchExportOpt(params);
      },
      printLabel(){
        let selection = this.$refs.payComSelection.getSelection();
        if(selection.length == 0){
          alert("没有选中的列");
          return;
        }
        let head = `<html><head><title>打印贴头</title></head><body style="margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; line-height: 1; font-size: 12px; background-size: 600px 336px; background-repeat: no-repeat;">`;
        let foot = `</body></html>`;
        let obj = '';
        let isFrist = true;
        selection.forEach(sel => {
          let docType = '无';
          let docNum = '无';
          if(sel.docType){
            docType = sel.docType;
          }else if(sel.yuliuDocType){
            docType = sel.yuliuDocType;
          }
          if(sel.docNum){
            docNum = sel.docNum;
          }else if(sel.yuliuDocNum){
            docNum = sel.yuliuDocNum;
          }
          if(isFrist == false){
            obj += '<tr><td height="30px"></td></tr>';
          }
          if(isFrist){
            isFrist = false;
          }
          obj += 
          '<table cellpadding="0" cellspacing="0">'+
            '<tr>'+
              '<td height="60px">'+
                '<div class="lh20" style="width: 300;"><font size="5">'+ docType +'</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size="5">'+ docNum +'</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size="5">'+ sel.employeeName +'</font></div>'+
                '<div class="lh20" style="width: 60px;"><br/></div>'+
                '<div class="lh20" style="width: 60px;"><br/><br/></div>'+
                '<div class="lh20" style="width: 145px;" float="right">&nbsp;&nbsp;&nbsp;<font size="5">'+ sel.idNum +'</font></div>'
              '</td>'+
            '</tr>'+
          '</table>';
        });
        let html = head + obj + foot;
        let pwin = window.open("","print")
        pwin.document.write(html);
        pwin.document.close();
        pwin.print();
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
           this.pageData.pageNum = 1; 
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.searchCondition.taskCategory = category;
           this.archiveQuery(this.searchCondition);

      },
      showInfoTwr (ind,category) {  
           this.pageData.pageNum = 1;
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskResignStatus = ind;
           this.searchCondition.taskCategory = category;
           this.archiveQuery(this.searchCondition);

      },
      showInfoTws (ind,category) {
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.searchCondition.taskCategory = category;
           this.archiveQuery(this.searchCondition);

      }, showInfoTwsr (ind,category) {
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskResignStatus = ind;
           this.searchCondition.taskCategory = category;
           this.archiveQuery(this.searchCondition);

      },
      showInfoT (idNum,idCardType,empTaskId,employmentId,employeeId,companyId,empTaskResignId) {
        this.$router.push({name:'recordComprehensive', query: {idNum:idNum,idCardType:idCardType,empTaskId:empTaskId,employmentId:employmentId,employeeId:employeeId,companyId:companyId,empTaskResignId:empTaskResignId}});
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
