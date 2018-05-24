<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          用工资料管理任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees" :isLoading='isLoading' :showHandle="showHandle"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span: 24}" class="tr">
          <DropdownMenu slot="list">
            <DropdownItem v-for="(print, index) in printList" :key="index">{{print}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="info" @click="exportData">导出XLS</Button>
        <Button type="info" @click="printLabel">打印贴头</Button>
        <!-- <Button type="primary" @click="batchManagement">批理办理</Button> -->
      </Col>
    </Row>
    <Table border :columns="employmentColumns" :data="employmentData"  :loading="isLoading" ref="employmentData" class="mt20"></Table>
    <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>
    <Table  border :columns="searchResultColumns" :data="searchResultData" :loading="isLoading" ref="searchResultData" class="mt20"></Table>

    <Modal
      v-model="isShowStockTitle"
      title="生成入库贴头"
      >
      <employee-info :customerInfo="info" v-for="(info, index) in customerInfos" :key="index" :style="{borderBottom: index !== customerInfos.length - 1 ? '1px solid #ccc' : '', marginBottom: index !== customerInfos.length - 1 ? '20px' : ''}"></employee-info>
      <div slot="footer">
        <Button type="primary" @click="isShowStockTitle = false;">生成入库贴头</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
  import {em_print, customerInfo} from "../../assets/js/employ_manage/common_filed"
  import searchEmployment from "./common/SearchEmployment.vue"
  import employeeInfo from "./common/EmployeeInfo.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {employeeInfo, searchEmployment},
    data() {
      return {
        initSearch:false,
        initSearchC:false,
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
          taskStatus:0
        },
        showHandle:{
           show:true
        },
        isLoading: false,
        // 当中按钮操作
        printList: em_print,
        // 下半部分
        employmentColumns: [
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
                      this.showInfoT(params.row.idNum,params.row.idCardType,params.row.empTaskId,params.row.employeeId,params.row.companyId)
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
          {title: '序号', key: 'employmentId', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employmentId),
              ]);
            }
          },
          {title: '公司编号', key: 'companyId', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '公司名称', key: 'title', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('div', params.row.title),
                h('div', params.row.cici),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeId', align: 'center', width: 150, sortable: true,
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
          {title: '证件号', key: 'idNum', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNum),
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
          {title: '服务中心', key: 'serviceCenter', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'employSpecial', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employSpecial),
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
          {title: '用工反馈操作日期', key: 'employFeedbackOptDate', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employFeedbackOptDate),
              ]);
            }
          },
          {title: '调档反馈', key: 'diaodangFeedback', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.diaodangFeedback),
              ]);
            }
          },
          {title: '调档反馈操作日期', key: 'diaodangFeedbackOptDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.diaodangFeedbackOptDate),
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
        employmentData: [],//列表数据

        searchResultColumns: [
          {title: '用工材料未签收', key: 'noSign', align: 'center', width: 220,
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
                    this.showInfoTw(2)
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
                    this.showInfoTw(3)
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
                    this.showInfoTw(4)
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
                    this.showInfoTw(5)
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
        // 弹出框
        isShowStockTitle: false,
        customerInfos: [customerInfo, customerInfo, customerInfo]
      }
    },
    mounted() {
      this.employeeQuery({}),
      this.employeeCollectionQuery({})
    },
    methods: {
     batchManagement(){
        let selection = this.$refs.employmentData.getSelection();
        if(selection.length == 0){
          alert("没有选中的列");
          return;
        }
        console.info(selection);
        let empTaskIds = [];
        selection.forEach(item => {
          empTaskIds.push(item.empTaskId);
        });
        this.$router.push({name: "employHandleEmploymentBatch", query: {empTaskIds:empTaskIds}});
     },
     searchEmploiees(conditions,searchForm) {

            this.pageData.pageNum =1;
            this.searchConditions =[];
            if(searchForm.isFinish!=2)
            {
              var isFinish = "a.is_finish="+searchForm.isFinish;
              this.searchConditions.push(isFinish);
            }
            for(var i=0;i<conditions.length;i++)
                  this.searchConditions.push(conditions[i].exec);
        
           this.searchCondition.params = this.searchConditions.toString();
           this.employeeQuery(this.searchCondition);
           this.employeeCollectionQuery(this.searchCondition);
           
      }, goHandle() {
        this.$router.push({name: "employHandleEmployment"});
      },
      showInfoT (idNum,idCardType,empTaskId,employeeId,companyId) {

        this.$router.push({name:'employHandleEmployment', query: {idNum:idNum,idCardType:idCardType,empTaskId:empTaskId,employeeId:employeeId,companyId:companyId}});
      },
      showInfoTw (ind) {  
           this.pageData.pageNum = 1;
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.employeeQuery(this.searchCondition);
           

      },
      showInfoTws (ind) {
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.employeeQuery(this.searchCondition);

      },
      printLabel(){
        let selection = this.$refs.employmentData.getSelection();
        if(selection.length == 0){
          alert("没有选中的列");
          return;
        }
        console.info(selection);
        let head = `<!doctype html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>打印贴头</title></head><body>`;
        let foot = `</body></html>`;
        let obj = '';
        let isFrist = true;
        obj +=  '<table cellpadding="0" cellspacing="0">';
        selection.forEach(sel => {
          let docType = '';
          let docNum = '';
          if(sel.docType && sel.docNum){
            docType = sel.docType;
            docNum = sel.docNum;
          }else if(sel.yuliuDocType && sel.yuliuDocNum){
            docType = sel.yuliuDocType;
            docNum = sel.yuliuDocNum
          }
          if(isFrist == false){
            //obj += '<tr><td height="50px"></td></tr>';
          }
          if(isFrist){
            isFrist = false;
          }
          obj += 
            '<tr>'+
              '<td height="60px">'+
                '<div class="lh20" style="width: 300;" float="left">&nbsp;&nbsp;<font size="6">'+ docType +'</font><font size="6">'+ docNum +'</font>&nbsp;&nbsp;&nbsp;<font size="6">'+ sel.employeeName +'</font></div>'+
                '<div class="lh20" style="width: 60px;"><br/></div>'+
                '<div class="lh20" style="width: 145px;" float="right">&nbsp;&nbsp;&nbsp;<font size="6">'+ sel.idNum +'</font></div>'+
              '</td>'+
            '</tr>';
        });
        obj += '</table>';
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
      exportData() {
        let params = this.searchCondition;
        api.employSearchExportOpt(params);
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      showInfo (ind) {
        this.$router.push({name:'employeeSocialSecurityInfo', query: {empArchiveId: ind}});

      },
      employeeQuery(params){
        if(this.initSearch){
          this.isLoading = true;
            let self =this
            api.employeeQuery({
              pageSize: this.pageData.pageSize,
              pageNum: this.pageData.pageNum,
              params: params,
            }).then(data => {
              self.employmentData = data.data.rows;
              self.pageData.total = Number(data.data.total);
              self.isLoading = false;
              this.searchCondition.taskStatus =0;
            })
        }else{
          this.initSearch = true;
        }
      
       
      },
       employeeCollectionQuery(params){
          if(this.initSearchC)
          {
              let self =this
              api.employeeCollectionQuery({
                pageSize: this.pageData.pageSize,
                pageNum: this.pageData.pageNum,
                params: params,
              }).then(data => {
              
                self.searchResultData = data.data.row;
              
              })
          }else{
            this.initSearchC = true;
          }
         
        
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
        this.employeeCollectionQuery(params);
      },
    },
    computed: {

    }
  }
</script>
