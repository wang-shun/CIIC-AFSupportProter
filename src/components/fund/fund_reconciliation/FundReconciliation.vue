<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        公积金对账
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金月份：" prop="hfMonth">
                  <DatePicker type="month" v-model="operatorSearchData.hfMonth" format='yyyyMM' placement="bottom" placeholder="选择日期" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金企业账户：" prop="hfComAccount">
                  <InputAccount v-model="operatorSearchData.hfComAccount"></InputAccount>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="operatorSearchData.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="isShowCreateReconciliation = true">新建对账</Button>
      </Col>
    </Row>
    <Table border class="mt20" :columns="reconciliationColumns" :data="viewReconciliationData"></Table>
    <Page
      class="pageSize"
      @on-change="handlePageNum"
      @on-page-size-change="handlePageSite"
      :total="page.total"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizeOpts"
      :current="page.pageNum"
      show-sizer show-total></Page>

    <Modal v-model="isShowDeleteReconciliation" width="360">
      <p slot="header" style="color:#f60; text-align:center">
        <Icon type="information-circled"></Icon>
        <span>确认删除对账</span>
      </p>
      <div style="text-align:center">
        <p>确认删除对账吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="delStatement">删除</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowReconciliation"
      title="查看对账"
      width="800"
    >
      <Form :label-width=150>
        <Row type="flex" justify="start">
          <Col :sm="{span:12}">
            <Form-item label="公积金月份：">
              {{viewReconciliation.hfMonth}}
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="公积金企业账户：">
              {{viewReconciliation.comAccountName}}
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="导入记录总数：">
              {{viewReconciliation.impRecordCount}}
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="差异记录总数：">
              {{viewReconciliation.diffCount}}
            </Form-item>
          </Col>
        </Row>
      </Form>
      <Table border class="mt20" height="201" ref="viewReconciliation" :columns="viewReconciliationColumns" :data="viewReconciliation.items"></Table>
      <div slot="footer">
        <Button type="info" @click="exportData">导出Excel</Button>
        <Button type="warning" @click="isShowReconciliation = false;">返回</Button>
      </div>
    </Modal>

    <Modal v-model="isShowCreateReconciliation" title="新建对账" width="800" :mask-closable="false">
      <Form :label-width=150 ref="newReconciliation" :model="newReconciliation">
        <Row type="flex" justify="start">
          <Col :sm="{span:24}">
            <Form-item label="公积金月份：" prop="hfMonth">
              <DatePicker type="month" format='yyyyMM' v-model="newReconciliation.hfMonth" @on-change="newReconciliation.hfMonth=$event"></DatePicker>
            </Form-item>
          </Col>
          <Col :sm="{span:24}">
            <Form-item label="公积金类型：" prop="hfType">
              <Select v-model="newReconciliation.hfType" style="width: 100%;" transfer>
                <Option v-for="item in fundTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Form-item label="选择对账文件：" :label-width="150">
              <Upload
                action="-"
                accept=".xls,.xlsx"
                :before-upload="handleUpload">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
              <div v-if="reconciliateFile !== null">
                文件名称: {{reconciliateFile.name}} <span>{{loadingStatus ? '上传中' : ''}}</span>
              </div>
            </Form-item>
          </Col>
          <Col :sm="{span:12}">
            <Button type="primary" icon="ios-search" @click="downTemplate">下载导入模板</Button>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item label="公积金账户类型：" prop="hfAccountType">
              <Select v-model="newReconciliation.hfAccountType" style="width: 100%;" transfer>
                <Option v-for="item in hfAccountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span:24}">
            <Form-item label="公积金企业账户：" prop="fundComCurrentValue">
              <Input v-model="newReconciliation.fundComCurrentValue" icon="ios-search" placeholder="请点击右侧搜索按钮..." @on-click="showFundAccountSearch"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>

      <Form :label-width="150">
        <Form-item>
          <Form :label-width="150" ref="fundAccountQueryForm" :model="fundAccountQueryForm" v-if="isShowFundAccountSearch">
            <Row type="flex" justify="start">
              <Col :sm="{span: 18}">
                <Form-item prop="comAccountName">
                  <Input v-model="fundAccountQueryForm.comAccountName" placeholder="请输入【客户编号】或【企业公积金账号】" class="ml10"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 6}" class="tr">
                <Button type="primary" icon="ios-search" @click="handleFundAccountPageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('fundAccountQueryForm')">重置</Button>
              </Col>
            </Row>
            <Row>
              <Table :columns="fundAccountColumns" :data="fundAccountData" class="mt20"></Table>
              <Page
                class="pageSize"
                @on-change="handleFundAccountPageNum"
                @on-page-size-change="handleFundAccountPageSite"
                :total="fundAccountPage.total"
                :page-size="fundAccountPage.pageSize"
                :page-size-opts="fundAccountPage.pageSizeOpts"
                :current="fundAccountPage.pageNum"
                show-sizer show-total></Page>
            </Row>
          </Form>
        </Form-item>
      </Form>

      <div slot="footer">
        <Button type="primary" @click="saveReconciliation" :isLoading='isLoading'>保存</Button>
        <Button type="warning" @click="resetSearchCondition('newReconciliation'); isShowCreateReconciliation = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import api from '../../../api/house_fund/fund_reconciliation/fund_reconciliation'
  import commonApi from '../../../api/house_fund/common/common'
  import InputAccount from "../common/input_account"
  import sessionData from '../../../api/session-data'

  export default {
    components: {InputAccount},
    data() {
      return {
        collapseInfo: [1],
        isLoading:false,
        page: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        operatorSearchData: {
          hfMonth: '',
          hfComAccount: '',
          companyId:''
        },
        isShowReconciliation: false, // 查看详情
        isShowCreateReconciliation:false, // 新建对账
        isShowDeleteReconciliation: false, // 确认删除对账
        currentStatementId: '', // 要删除的对账
        reconciliationColumns: [
          {title: '操作', fixed: 'left', width: 220, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button', {props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.execReconciliate(params.row.statementCompareId);
                    }
                  }
                }, '执行对账'),
                h('Button', {props: {type: 'success', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {
                      sessionData.setJsonDataToSession('fundReconCiliation.operatorSearchData', this.operatorSearchData);
                      sessionData.setJsonDataToSession('fundReconCiliation.fundAccountPage', this.fundAccountPage);
                      this.isShowReconciliation = true;
                      this.getStatementDetail(params.row.statementCompareId);
                      this.currentStatementId = params.row.statementCompareId;
                    }
                  }
                }, '查看'),
                h('Button', {props: {type: 'error', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {
                      this.isShowDeleteReconciliation = true;
                      this.currentStatementId = params.row.statementCompareId;
                    }
                  }
                }, '删除'),
              ]);
            }
          },
          {title: '公积金月份', key: 'hfMonth', width: 179, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.hfMonth),
              ]);
            }
          },
          {title: '公积金企业账户名称', key: 'comAccountName', width: 350, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '公积金导入文件', key: 'impPath', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.impPath),
              ]);
            }
          },
          {title: '公积金类型', key: 'hfType', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hfType(params.row.hfType)),
              ]);
            }
          },
          {title: '对账人', key: 'compareOperateName', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.compareOperateName),
              ]);
            }
          },
          {title: '对账时间', key: 'compareTime', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.compareTime),
              ]);
            }
          },
        ],
        newReconciliation: {
          hfMonth: '',
          comAccountId: '',
          hfAccountType: '',
          createdBy: '',
          fundComCurrentValue: '',
          hfType: '',
          hfComAccount: ''
        },
        viewReconciliation: {
          hfMonth: "",
          comAccountName: "",
          impRecordCount: "",
          diffCount: "",
          items: []
        },
        viewReconciliationColumns: [
          {title: '导入公积金账号', key: 'empAccount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.empAccount),
              ]);
            }
          },
          {title: '姓名', key: 'empName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.empName),
              ]);
            }
          },
          {title: '导入月缴金额', key: 'impAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.impAmount),
              ]);
            }
          },
          {title: '系统金额', key: 'sysAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.sysAmount),
              ]);
            }
          },
          {title: '差异金额', key: 'diffAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.diffAmount),
              ]);
            }
          },
          {title: '备注', key: 'remark', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.remark),
              ]);
            }
          },
        ],
        viewReconciliationData: [],
        fundTypeList: [
          {label: "基本公积金", value: 1},
          {label: "补充公积金", value: 2}
        ],
        // 新建对账中查找企业公积金账户
        fundAccountQueryForm: {
          comAccountName: ''
        },
        hfAccountTypeList: [
          {label: '请选择公积金账户类型', value: ''},
          {label: '大库', value: 1},
          {label: '外包', value: 2},
          {label: '独立户', value: 3}
        ],
        currentIndex: -1,
        isShowFundAccountSearch: false,
        fundAccountPage: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        fundAccountColumns: [
          {
            title: '', key: '', align: 'center',
            render: (h, params) => {
              return h('Radio', {
                props: {
                  value: this.currentIndex === params.index
                },
                on: {
                  'on-change': (val) => {
                    this.currentIndex = params.index;
                    this.newReconciliation.fundComCurrentValue = params.row.comAccountName;
                    this.newReconciliation.comAccountId = params.row.comAccountId;
                    this.newReconciliation.hfComAccount = params.row.hfComAccount;
                   // this.newReconciliation.hfAccountType = params.row.hfAccountType;
                    this.isShowFundAccountSearch=false;
                  }
                }
              }, '');
            }
          },
          {
            title: '企业公积金账号', key: 'hfComAccount', align: 'center'
          },
          {
            title: '企业公积金账户名称', key: 'comAccountName', align: 'center'
          }
        ],
        fundAccountData: [],
        reconciliateFile: null,
        loadingStatus: false,
      }
    },
    mounted() {
      sessionData.getJsonDataFromSession('fundReconCiliation.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('fundReconCiliation.fundAccountPage', this.fundAccountPage);
      this.getStatement()
    },
    methods: {
      getStatement() { // 对账列表
        if(this.operatorSearchData.hfMonth){
            this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, 'YYYYMM');
        }
        var params = this.$utils.clear(this.operatorSearchData);
        params = this.$utils.clear(params, '');
        api.getStatements({
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.viewReconciliationData = data.data;
            this.page.total = Number(data.total);
          }
        })
      },
      getStatementDetail(statementId) { // 对账详情
        var params = statementId;
        api.getStatementDetail({
          params: params,
        }).then(data => {
          if (data.code == 0) {
            this.viewReconciliation = data.data;
          }
        })
      },
      delStatement() { // 删除对账
        var params = this.currentStatementId;
        api.delStatement({
          params: params,
        }).then(data => {
          this.isShowDeleteReconciliation = false;
          if (data.code == 0) {
            this.getStatement();
            this.$Message.success('删除成功');
          }
        })
      },
      showFundAccountSearch() { // 显示查找公积金账户名条件
        if (this.newReconciliation.hfType === '') {
          this.$Message.error('请先选择公积金类型');
          return;
        }
        if (this.newReconciliation.hfAccountType === '') {
          this.$Message.error('请先选择公积金账户类型');
          return;
        }
        this.isShowFundAccountSearch = !this.isShowFundAccountSearch;
        this.getComFundAccountList();
      },
      getComFundAccountList() { // 查找公积金账户名
        if (!this.isShowFundAccountSearch) {
          return;
        }
        this.currentIndex = -1;
        var params = this.fundAccountQueryForm;
        params.hfAccountType = this.newReconciliation.hfAccountType;
        params.hfType = this.newReconciliation.hfType;
        commonApi.getComFundAccountNameList({
          pageSize: this.fundAccountPage.pageSize,
          pageNum: this.fundAccountPage.pageNum,
          orderBy: '',
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.fundAccountData = data.data;
            this.fundAccountPage.total = data.total;
          }
        })
      },
      handleUpload(file){
        this.reconciliateFile = file;
        return false;
      },

      saveReconciliation() { // 新建对账
      
        if (this.newReconciliation.hfMonth === '') {
          this.$Message.error('请先选择公积金月份!');
          return;
        }
        if (this.reconciliateFile == null) {
          this.$Message.error('请选择对账文件!');
          return;
        }
        if(this.newReconciliation.hfComAccount === ''){
          this.$Message.error('公积金企业账户不能为空!');
          return;
        }
        this.isLoading=true;
        this.loadingStatus = true;
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        let that = this;
        let formData ={};
        formData.hfMonth=that.newReconciliation.hfMonth;
        formData.comAccountId= that.newReconciliation.comAccountId;
        formData.hfAccountType= that.newReconciliation.hfAccountType;
        formData.hfType= that.newReconciliation.hfType;
        formData.hfComAccount= that.newReconciliation.hfComAccount;
        formData.createdBy=JSON.parse(localStorage.getItem('userInfo')).userId;
        formData.file=that.reconciliateFile;
        api.addStatmentUpload(formData).then((data) =>{
          this.isShowCreateReconciliation = false;
          if(data.code == 0) {
            that.getStatement();
            that.reconciliateFile = null;
            this.loadingStatus = false;
            this.isLoading=false;
            that.$Message.info('新增对账成功!');
          }else {
            that.reconciliateFile = null;
            this.loadingStatus = false;
            this.isLoading=false;
            that.$Message.info(data.message);
          }
          this.resetSearchCondition('newReconciliation');
          this.resetSearchCondition('fundAccountQueryForm');
          this.newReconciliation.hfMonth = '';
          this.newReconciliation.fundComCurrentValue = this.newReconciliation.comAccountId = this.newReconciliation.hfComAccount = this.newReconciliation.hfAccountType = '';
        });
      },
      execReconciliate(statementId) {
        var params = {statementId: statementId}
        api.execStatement({
          params: params,
        }).then(data => {
          if (data.code == 0) {
            this.$Message.success(data.message);
            this.getStatement();
          } else {
            this.$Message.success('对账失败');
          }
        });
      },
      exportData() {
        var params = {statementId : this.currentStatementId};
        api.exportStatementDetail(params);
      },
      downTemplate() {
        api.downTemplate();
      },
      setFundMonth(month) {
        this.newReconciliation.hfMonth = month.replace('-', '');
      },
      resetSearchCondition(name) {
        if(name === 'newReconciliation'){
          this.currentIndex = -1;
        }
        this.$refs[name].resetFields();
        this.fundAccountQueryForm.comAccountName='';
      },
      handlePageNum(val) {
        this.page.pageNum = val;
        this.getStatement();
      },
      handlePageSite(val) {
        this.page.pageSize = val;
        this.getStatement();
      },
      searchData(){
        this.page.pageNum = 1;
        this.getStatement();
      },

      handleFundAccountPageNum(val) {
        this.fundAccountPage.pageNum = val;
        this.getComFundAccountList();
      },
      handleFundAccountPageSite(val) {
        this.fundAccountPage.pageSize = val;
        this.getComFundAccountList();
      },
    }
  }
</script>
