<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
          <Panel name="1">
        Ukey管理
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="已绑定客户编号：" prop="companyId">
                  <!-- <Input v-model="searchCondition.companyId" placeholder="请输入..."></Input> -->
                  <input-company v-model="searchCondition.companyId"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="已绑定客户：" prop="companyName">
                  <!-- <Input v-model="searchCondition.companyName" placeholder="请输入..."></Input> -->
                  <input-company-name v-model="searchCondition.companyName" ></input-company-name>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="Ukey编号：" prop="keyCode">
                  <Input v-model="searchCondition.keyCode" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="Ukey状态" prop="keyStatus">
                <Select transfer v-model="searchCondition.keyStatus">
                  <Option v-for="item in UkeyStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="primary" @click="showInfoT(0)">新增</Button>
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

      <!-- 续签 -->
    <Modal
        v-model="isRenew"
        :mask-closable="false">
        <Form>
          <p>
            <Form-item>
              <Input type="text" v-model="keyRenewFee" placeholder="请填写续签费用"></Input>
            </Form-item>
          </p>
        </Form>
         <div slot="footer">
            <Button  size="large"  @click="cancel">取消</Button>
            <Button  size="large"  @click="UkeyRenew" :loading="isLoading">确定</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
  import api from '../../api/employ_manage/hire_operator'
  import customerModal from '../common_control/CustomerModal.vue'
  import InputCompanyName from '../common_control/form/input_company/InputCompanyName.vue'
  import InputCompany from '../common_control/form/input_company'

  export default {

    components: {customerModal,InputCompanyName,InputCompany},
    data() {
      return {
        isLoading: false,
        isRefuseReason: false,
        isRenew: false,
         pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        searchCondition: {
          companyId: '',
          companyName: '',
          keyCode:'',
          keyStatus: ''
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
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 300,
            render: (h, params) => {
                return h('div', [
                  h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.showInfoTView(params.row.keyType,params.row.keyCode,
                                      params.row.keySeq,params.row.keyPwd,
                                      params.row.keyStatus,params.row.keyFee,
                                      params.row.companyId,params.row.companyName
                      )
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.showInfoT(params.row.id,params.row.keyType,params.row.keyCode,
                                      params.row.keySeq,params.row.keyPwd,
                                      params.row.keyStatus,params.row.keyFee,
                                      params.row.companyId,params.row.companyName
                      )
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {type: 'error', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.deleteUkey(params.row.id)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.showInfoRenew(params.row.id,params.row.keyFee)
                    }
                  }
                }, '续签'),
              ]);
            },
          },
          {title: 'Ukey类别', key: 'keyType', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyType),
              ]);
            }
          },
          {title: 'Ukey编号', key: 'keyCode', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyCode),
              ]);
            }
          },
          {title: '档案部Ukey密码', key: 'keyPwd', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyPwd),
              ]);
            }
          },
          {title: 'Ukey状态', key: 'keyStatus', align: 'center', width: 185,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyStatus),
              ]);
            }
          },
          {title: 'Ukey序列号', key: 'keySeq', align: 'center', width: 230,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keySeq),
              ]);
            }
          },
          {title: '已绑定客户编号', key: 'companyId', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '已绑定客户', key: 'companyName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '费用', key: 'keyFee', align: 'center', width: 105,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.keyFee),
              ]);
            }
          },
        ],
        dismissalData: []
    
      }
    },
    mounted() {
      this.querySalCompany({});
    },
    methods: {
      searchEmploiees(conditions) {
           
        this.querySalCompany(this.searchCondition);
          
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
      showInfoT (id,keyType,keyCode,keySeq,keyPwd,keyStatus,keyFee,companyId,companyName) {
        
        this.$router.push({name:'UkeyManage', query: {id:id,keyType:keyType,keyCode:keyCode,
                                                        keySeq:keySeq,keyPwd:keyPwd,
                                                        keyStatus:keyStatus,keyFee:keyFee,
                                                        companyId:companyId,companyName:companyName}});

      },
      showInfoTView (keyType,keyCode,keySeq,keyPwd,keyStatus,keyFee,companyId,companyName) {
        
        this.$router.push({name:'UkeyManageView', query: {keyType:keyType,keyCode:keyCode,
                                                        keySeq:keySeq,keyPwd:keyPwd,
                                                        keyStatus:keyStatus,keyFee:keyFee,
                                                        companyId:companyId,companyName:companyName
        }});

      },
      exportXLS() {
        let params = this.searchCondition;
        api.advanceSearchExportOpt(params);
      },
      cancel () {
         this.isRefuseReason = false;
         this.isRenew = false;
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
      // 续签
      showInfoRenew(id,keyFee){
        this.keyId = id;
        this.keyFee = keyFee;
        this.isRenew = true;
      },
      // 续签
      UkeyRenew() {
        let keyRenewFee= this.keyRenewFee;
        if(keyRenewFee==""){
          this.$Message.warning('请填写续签费用！');
          return;
        }
        var ajax = api.amArchiveUkeyRenew({
          keyId: this.keyId,
          keyFee: this.keyFee,
          keyRenewFee: this.keyRenewFee
        }).then(data=>{
          this.$Message.info("续签成功");
          this.isRenew = false;
          this.querySalCompany(params);
          this.isLoading = false;
        }).catch(
          error=>{
            this.isLoading = false;
          }
        )

        this.isRenew = false;
      },
      // 删除Ukey
      deleteUkey(id) {
        if(confirm("确定删除吗")){
          api.saveAmArchiveUkey({id:id,isActive:0}).then(data => {
            if (data.code == 200) {
              this.$Message.success("删除成功");
              this.querySalCompany({});
            } else {
              this.$Message.error("删除失败！" + data.message);
            }
          })
        }
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
