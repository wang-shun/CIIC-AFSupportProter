<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          Ukey管理
          <div slot="content">
            <search-ukey @on-search="searchUkey" :isLoading='isLoading' :showHandle="showHandle" ></search-ukey>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Table border :columns="dismissalColumns" @on-row-dblclick="handleData" :data="dismissalData" class="mt20"></Table>
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
  import api from '../../api/employ_manage/hire_operator'
  import searchUkey from "./common/SearchUkey.vue"
  export default {
    components: { searchUkey},
    data() {
      return {
        isLoading: false,
        showHandle:{
           show:false
        },
         pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        searchConditions:[],
        searchCondition: {
          params: ''
        },
        keyId: '',
        keyFee: '',
        keyRenewFee: '',
        deleteRemark: '',
        deleteId: '',
        collapseInfo: [1],
        UkeyStatusList: [
          {value:'空',label:'空'},
          {value:'已绑定公司',label:'已绑定公司'},
          {value:'未绑定公司',label:'未绑定公司'}
        ],
        dismissalColumns: [
          {title: '公司编号', key: 'companyId', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center', width: 185,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '组织机构代码', key: 'organizationCode', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.organizationCode),
              ]);
            }
          },
          {title: '服务中心', key: 'serviceCenter', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: 'team', key: 'team', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.team),
              ]);
            }
          },
          {title: '材料签收日期', key: 'materialReceiveDate', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.materialReceiveDate),
              ]);
            }
          },
          {title: '材料送办日期', key: 'materialDeliveryDate', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.materialDeliveryDate),
              ]);
            }
          },
          {title: '材料反馈日期', key: 'materialFeedbackDate', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.materialFeedbackDate),
              ]);
            }
          },
          {title: '注销日期', key: 'logoutDate', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.logoutDate),
              ]);
            }
          },
          {title: '类别', key: 'keyType', align: 'center', width: 70,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyType),
              ]);
            }
          },
          {title: '编号', key: 'keyCode', align: 'center', width: 105,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyCode),
              ]);
            }
          },
          {title: '密码', key: 'keyPwd', align: 'center', width: 105,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyPwd),
              ]);
            }
          },
          {title: '收费标准', key: 'keyFee', align: 'center', width: 105,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyFee),
              ]);
            }
          },
          {title: '序列号', key: 'keySeq', align: 'center', width: 205,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keySeq),
              ]);
            }
          },
          {title: '到期日期', key: 'dueDate', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.dueDate),
              ]);
            }
          }
        ],
        dismissalData: []
    
      }
    },
    mounted() {
      this.querySalCompany({});
    },
    methods: {
      handleData(row, index) {
      this.$router.push({
        name: "UkeyManage",
        query: {
          id: row.id
        }
      });
    },
      searchUkey(conditions,searchForm,type) {
           // 查询
              this.pageData.pageNum =1;
             this.searchConditions =[];
             for(var i=0;i<conditions.length;i++)
                   this.searchConditions.push(conditions[i].exec);
         
             this.searchCondition.params = this.searchConditions.toString();
           if(type == 0){
            
              this.querySalCompany(this.searchCondition);
           }else if(type == 1){
             // 导出
              let params = this.searchCondition;
              console.info(params);
              api.uekySearchExportOpt(params);
           }
            
      },
      querySalCompany(params){
        let self =this
        api.queryAmArchiveUkeyList({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          self.dismissalData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
      showInfoT (id) {
        this.$router.push({name:'UkeyManage', query: {id:id}});
      },
      showInfoTView (keyType,keyCode,keySeq,keyPwd,keyStatus,keyFee,companyName) {
        
        this.$router.push({name:'UkeyManageView', query: {keyType:keyType,keyCode:keyCode,
                                                        keySeq:keySeq,keyPwd:keyPwd,
                                                        keyStatus:keyStatus,keyFee:keyFee,
                                                        companyName:companyName
        }});

      },
      exportXLS() {
        let params = this.searchCondition;
        api.advanceSearchExportOpt(params);
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
