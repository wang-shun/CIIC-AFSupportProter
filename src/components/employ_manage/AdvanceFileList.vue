<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
          <Panel name="1">
        档案预增管理
        <div slot="content">
          <search-advance @on-search="searchEmploiees" :isLoading='isLoading' :showHandle="showHandle" ></search-advance>
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

    <!-- 删除备注 -->
    <Modal
        v-model="isRefuseReason"
        :mask-closable="false">
        <Form>
          <p>
            <Form-item>
              <Input type="textarea" v-model="deleteRemark" :rows=4  placeholder="请填写删除备注..."></Input>
            </Form-item>
          </p>
        </Form>
         <div slot="footer">
            <Button  size="large"  @click="cancel">取消</Button>
            <Button  size="large"  @click="handleRefuseReason" :loading="isLoading">确定</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
  import api from '../../api/employ_manage/hire_operator'
  import searchAdvance from "./common/SearchAdvance.vue"

  export default {
    components: { searchAdvance},
    data() {
      return {
        isLoading: false,
        showHandle:{
           show:false
        },
        isRefuseReason: false,
         pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        searchCondition: {
          employeeName: '',
          employeeIdcardNo:'',
          status: ''
        },
        deleteRemark: '',
        deleteId: '',
        collapseInfo: [1],
        statusList: [
          {value: '', label: '全部'},
          {value: '1', label: '未匹配'},
          {value: '2', label: '已匹配'}
        ],
        dismissalColumns: [
          {title: '状态', key: 'status', align: 'center', width: 90,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.status == 0 ? '已删除' : params.row.status == 1 ? '未匹配' : params.row.status == 2 ? '已匹配' : '未知状态'),
              ]);
            }
          },
          {title: '档案类型', key: 'reservedArchiveType', align: 'center', width: 130,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.reservedArchiveType),
              ]);
            }
          },
          {title: '档案编号', key: 'reservedArchiveNo', align: 'center', width: 135,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.reservedArchiveNo),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 110,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '身份证号', key: 'employeeIdcardNo', align: 'center', width: 160,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeIdcardNo),
              ]);
            }
          },
          {title: '入库日期', key: 'enteringDate', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.enteringDate),
              ]);
            }
          },
          {title: '档案来源', key: 'archiveSource', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.archiveSource),
              ]);
            }
          },
          {title: '存档地', key: 'archivePlace', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.archivePlace),
              ]);
            }
          },
          {title: '操作人', key: 'createdBy', align: 'center', width: 100,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createdBy),
              ]);
            }
          },
          {title: '备注', key: 'remark', align: 'center', width: 460,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
              ]);
            }
          }
        ],
        dismissalData: []

      }
    },
    mounted() {
      // this.querySalCompany({})
    },
    methods: {
      searchEmploiees(conditions,searchForm,type) {
           // 查询
              this.pageData.pageNum =1;
             this.searchConditions =[];
             for(var i=0;i<conditions.length;i++){
               this.searchConditions.push(conditions[i].exec);
             }

             this.searchCondition.params = this.searchConditions.toString();
           if(type == 0){

              this.querySalCompany(this.searchCondition);
           }else if(type == 1){
             // 导出
              let params = this.searchCondition;
              api.advanceSearchExportOpt(params);
           }

      },
      handleData(row, index) {
        if(row.status == 1){

          this.$router.push({
            name: "advanceFile",
            query: {archiveAdvanceId:row.archiveAdvanceId,reservedArchiveType:row.reservedArchiveType,
                                                            reservedArchiveNo:row.reservedArchiveNo,employeeName:row.employeeName,
                                                            employeeIdcardNo:row.employeeIdcardNo,enteringDate:row.enteringDate,
                                                            archiveSource:row.archiveSource,archivePlace:row.archivePlace,
                                                            createdBy:row.createdBy,remark:row.remark,exitThePlaceDate:row.exitThePlaceDate,
                                                            createdTime:moment(Number(row.createdTime)).format("YYYY-MM-DD")
            }
          });
        }else{
          this.$router.push({
            name: "advanceFileView",
            query: {archiveAdvanceId:row.archiveAdvanceId,reservedArchiveType:row.reservedArchiveType,
                                                        reservedArchiveNo:row.reservedArchiveNo,employeeName:row.employeeName,
                                                        employeeIdcardNo:row.employeeIdcardNo,enteringDate:row.enteringDate,
                                                        archiveSource:row.archiveSource,archivePlace:row.archivePlace,
                                                        createdBy:row.createdBy,remark:row.remark,exitThePlaceDate:row.exitThePlaceDate,
                                                        createdTime:moment(Number(row.createdTime)).format("YYYY-MM-DD")
            }
          });
        }
    },
      querySalCompany(params){
        let self =this
        api.queryAmArchiveAdvanceList({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          self.dismissalData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
      showInfoT (companyId,reservedArchiveType,reservedArchiveNo,employeeName,employeeIdcardNo,enteringDate,archiveSource,archivePlace,createdBy,remark,exitThePlaceDate) {

        this.$router.push({name:'advanceFile', query: {archiveAdvanceId:companyId,reservedArchiveType:reservedArchiveType,
                                                        reservedArchiveNo:reservedArchiveNo,employeeName:employeeName,
                                                        employeeIdcardNo:employeeIdcardNo,enteringDate:enteringDate,
                                                        archiveSource:archiveSource,archivePlace:archivePlace,
                                                        createdBy:createdBy,remark:remark,exitThePlaceDate:exitThePlaceDate
        }});

      },
      showInfoTView (companyId,reservedArchiveType,reservedArchiveNo,employeeName,employeeIdcardNo,enteringDate,archiveSource,archivePlace,createdBy,remark,exitThePlaceDate) {

        this.$router.push({name:'advanceFileView', query: {archiveAdvanceId:companyId,reservedArchiveType:reservedArchiveType,
                                                        reservedArchiveNo:reservedArchiveNo,employeeName:employeeName,
                                                        employeeIdcardNo:employeeIdcardNo,enteringDate:enteringDate,
                                                        archiveSource:archiveSource,archivePlace:archivePlace,
                                                        createdBy:createdBy,remark:remark,exitThePlaceDate:exitThePlaceDate
        }});

      },
      exportXLS() {
        let params = this.searchCondition;
        api.advanceSearchExportOpt(params);
      },
      cancel () {
         this.isRefuseReason = false;
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
      },
      // 删除
      showDeleteReason(id) {
          this.deleteId = id;
          this.deleteRemark = '';
          this.isRefuseReason = true;
      },
      // 删除
      handleRefuseReason() {
        let remark= this.deleteRemark;
        if(remark==""){
          this.$Message.warning('请填写删除备注！');
          return;
        }

        var ajax = api.deleteAmArchiveAdvance({
          deleteRemark:remark,
          archiveAdvanceId: this.deleteId
        }).then(data=>{
          this.$Message.info(data.message);
          let params = this.searchCondition;
          this.querySalCompany(params);
          this.isLoading = false;
        }).catch(
          error=>{
            this.isLoading = false;
          }
        )
        this.$ajax.handle({
          vm: this,
          ajax: ajax,
          title: '预增档案删除',
          callback: (data) => {
            this.isRefuseReason = false;
            let params = this.searchCondition;
            this.querySalCompany(params);
          }
        })

        this.isRefuseReason = false;
      }
    }
  }
</script>
