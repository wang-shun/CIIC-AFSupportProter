<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
          <Panel name="1">
        独立户客户管理
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编码：" prop="companyId">
                  <Input v-model="searchCondition.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="title">
                  <Input v-model="searchCondition.title" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      </Collapse>
    </div>
  
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
        searchCondition: {
          title: '',
          companyId:''
        },
        collapseInfo: [1],
        dismissalColumns: [
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
                      this.showInfoT(params.row.companyId)
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '公司编码', key: 'companyId', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
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
          {title: '客服经理', key: 'salManagerName', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.salManagerName),
              ]);
            }
          },
          {title: '客服中心', key: 'handleType', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'special', align: 'center', width: 300,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.special),
              ]);
            }
          }
        ],
        dismissalData: []
    
      }
    },
    mounted() {
      this.querySalCompany({})
    },
    methods: {
      searchEmploiees(conditions) {
           
        this.querySalCompany(this.searchCondition);
          
      },
      goHandle() {
        this.$router.push({name: "dismissalHandleEmployment"});
      },querySalCompany(params){
        let self =this
        api.querySalCompany({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          self.dismissalData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
      showInfoT (companyId) {
        
        this.$router.push({name:'independentHandleCustom', query: {companyId:companyId}});

      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.querySalCompany(params);
      },
      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.querySalCompany(params);
      }
    }
  }
</script>
