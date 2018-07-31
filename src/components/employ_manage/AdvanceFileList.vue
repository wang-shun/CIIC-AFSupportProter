<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
          <Panel name="1">
        档案预增管理
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="身份证号：" prop="employeeIdcardNo">
                  <Input v-model="searchCondition.employeeIdcardNo" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="状态" prop="status">
                <Select style="width: 100%;" v-model="searchCondition.status"  transfer>
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="primary" @click="showInfoT(0)">新增</Button>
                <Button type="primary" @click="exportXLS">导出XLS</Button>
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

  export default {
    data() {
      return {
        isLoading: false,
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
          {value: '2', label: '已匹配'},
          // {value: '0', label: '已删除'}
        ],
        dismissalColumns: [
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 130,
            render: (h, params) => {
              if(params.row.status == 0 || params.row.status == 2){//删除 或 已匹配  状态
                return h('div', [
                  h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.showInfoTView(params.row.archiveAdvanceId,params.row.reservedArchiveType,
                                      params.row.reservedArchiveNo,params.row.employeeName,
                                      params.row.employeeIdcardNo,params.row.enteringDate,
                                      params.row.archiveSource,params.row.archivalPlace,
                                      params.row.createdBy,params.row.remark
                      )
                    }
                  }
                }, '查看'),
              ]);
              }
              else if(params.row.status == 1){// 未匹配状态
                return h('div', [
                  h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.showInfoTView(params.row.archiveAdvanceId,params.row.reservedArchiveType,
                                      params.row.reservedArchiveNo,params.row.employeeName,
                                      params.row.employeeIdcardNo,params.row.enteringDate,
                                      params.row.archiveSource,params.row.archivalPlace,
                                      params.row.createdBy,params.row.remark,params.row.exitThePlaceDate
                      )
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.showInfoT(params.row.archiveAdvanceId,params.row.reservedArchiveType,
                                      params.row.reservedArchiveNo,params.row.employeeName,
                                      params.row.employeeIdcardNo,params.row.enteringDate,
                                      params.row.archiveSource,params.row.archivalPlace,
                                      params.row.createdBy,params.row.remark,params.row.exitThePlaceDate
                      )
                    }
                  }
                }, '修改'),
                /*h('Button', {
                  props: {type: 'error', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.showDeleteReason(params.row.archiveAdvanceId);
                    }
                  }
                }, '删除'),*/
              ]);
              }
            },
          },
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
          {title: '存档地', key: 'archivalPlace', align: 'center', width: 150,sortable: true,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.archivalPlace),
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
          {title: '备注', key: 'remark', align: 'center', width: 230,sortable: true,
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
      this.querySalCompany({})
    },
    methods: {
      searchEmploiees(conditions) {
           
        this.querySalCompany(this.searchCondition);
          
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
      showInfoT (companyId,reservedArchiveType,reservedArchiveNo,employeeName,employeeIdcardNo,enteringDate,archiveSource,archivalPlace,createdBy,remark,exitThePlaceDate) {
        
        this.$router.push({name:'advanceFile', query: {archiveAdvanceId:companyId,reservedArchiveType:reservedArchiveType,
                                                        reservedArchiveNo:reservedArchiveNo,employeeName:employeeName,
                                                        employeeIdcardNo:employeeIdcardNo,enteringDate:enteringDate,
                                                        archiveSource:archiveSource,archivalPlace:archivalPlace,
                                                        createdBy:createdBy,remark:remark,exitThePlaceDate:exitThePlaceDate
        }});

      },
      showInfoTView (companyId,reservedArchiveType,reservedArchiveNo,employeeName,employeeIdcardNo,enteringDate,archiveSource,archivalPlace,createdBy,remark,exitThePlaceDate) {
        
        this.$router.push({name:'advanceFileView', query: {archiveAdvanceId:companyId,reservedArchiveType:reservedArchiveType,
                                                        reservedArchiveNo:reservedArchiveNo,employeeName:employeeName,
                                                        employeeIdcardNo:employeeIdcardNo,enteringDate:enteringDate,
                                                        archiveSource:archiveSource,archivalPlace:archivalPlace,
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
