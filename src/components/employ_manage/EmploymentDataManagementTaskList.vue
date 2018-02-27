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
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span: 24}" class="tr">
        <!--<Button type="primary" @click="goHandle">办理</Button>-->
          <!-- <Button type="primary">
            打印
            <Icon type="arrow-down-b"></Icon>
          </Button> -->
          <DropdownMenu slot="list">
            <DropdownItem v-for="(print, index) in printList" :key="index">{{print}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="info" @click="exportData">导出XLS</Button>
        <!-- <Button type="primary" @click="isShowStockTitle = true">生成入库贴头</Button>
        <Button type="primary" @click="sendToFileMangement">递交档案处</Button> -->
      </Col>
    </Row>
    <Table border :columns="employmentColumns" :data="employmentData" ref="employmentData" class="mt20"></Table>
    <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>
    <Table  border :columns="searchResultColumns" :data="searchResultData" ref="searchResultData" class="mt20"></Table>

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
          taskStatus:0
        },
        // 当中按钮操作
        printList: em_print,
        // 下半部分
        employmentColumns: [
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
                      this.showInfoT(params.row.idNum,params.row.idCardType,params.row.empTaskId,params.row.employeeId,params.row.companyId)
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '用工方式', key: 'employMethods', align: 'center', width: 150,
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
          // {title: '序号', key: 'index', align: 'center', width: 100,
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'right'}}, [
          //       h('span', params.row.index),
          //     ]);
          //   }
          // },
          {title: '公司编码', key: 'licenseCode', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.licenseCode),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeNumber', align: 'center', width: 150,
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
          {title: '证件号', key: 'IdNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNum),
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
          {title: '客服中心', key: 'serviceCenter', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'companySpecialCase', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companySpecialCase),
              ]);
            }
          },
          {title: '档案编号', key: 'fileNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.docNum),
              ]);
            }
          },
          {title: '预留档案编号', key: 'reservedFileNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.yuliuDocNum),
              ]);
            }
          },
          {title: '用工反馈操作日期', key: 'employFeedbackOptDate', align: 'center', width: 150,
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
          {title: '已开F单未完成', key: 'finished', align: 'center', width: 220,
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
     searchEmploiees(conditions) {
            this.searchConditions =[];
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
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.employeeQuery(this.searchCondition);

      },
      showInfoTws (ind) {
           this.searchCondition.params = this.searchConditions.toString();
           this.searchCondition.taskStatus = ind;
           this.employeeQuery(this.searchCondition);

      },
      generateInStock() {

      },
      sendToFileMangement() {

      },
      exportData() {
        this.$refs['employmentData'].exportCsv({
          filename: '原始数据'
        });
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      showInfo (ind) {
        this.$router.push({name:'employeeSocialSecurityInfo', query: {empArchiveId: ind}});

      },
      employeeQuery(params){

        let self =this
        api.employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          self.employmentData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
       employeeCollectionQuery(params){

        let self =this
        api.employeeCollectionQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
         
          self.searchResultData = data.data.row;
         
        })
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
      },
    },
    computed: {

    }
  }
</script>
