<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        导出申报表及执行年调
        <div slot="content">
          <Form :label-width=150 ref="accountSearchData" :model="accountSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调整年份：" prop="adjustYear">
                <Col span="5">
                <Input v-model="accountSearchData.adjustYear" readonly></Input>
                </Col>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账户类型：" prop="ssAccountType">
                <Select v-model="accountSearchData.ssAccountType" style="width: 100%;" transfer>
                  <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="账户编号：" prop="comAccountId">
                <input-account v-model="accountSearchData.comAccountId"></input-account>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['accountSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
      <Button type="info" @click="importExcel">批量导入社保年平均工资申报表</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="accountResultData"
             :columns="accountResultColumns"
             :data="accountResultData"
      ></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="accountResultPageData.total"
        :page-size="accountResultPageData.pageSize"
        :page-size-opts="accountResultPageData.pageSizeOpts"
        :current="accountResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

    <!-- 批量上传-->
    <Modal
      :width="960"
      v-model="isUpload"
      :closable="false"
      :mask-closable="false"
      style="position:absolute;z-index:90;">
      <div style="text-align: center;">
        <Form :label-width=100 ref="uploadData" :model="uploadData" style="width: 500px">
          <Row type="flex" justify="start">
            <Col :sm="{span:15}">
            <Form-item label="账户编号：" prop="comAccountId">
              <input-account v-model="uploadData.ssAccount" :styles="inputAccountStyle"></input-account>
            </Form-item>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span:15}">
            <Form-item label="批量上传：" prop="uploadFile">
              <Upload ref="upload" :action="uploadAttr.actionUrl" :data="uploadData" :accept="uploadAttr.acceptFileExtension"
                      :before-upload="beforeUpload" :on-success="onSuccess">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
          </Row>
        </Form>
        <Row class="mt20">
          <Col :sm="{span:24}">
          <Table border ref="importResultData"
                 :columns="importResultColumns"
                 :data="importResultData"
          ></Table>
          <Page
            class="pageSize"
            @on-change="importResultHandlePageNum"
            @on-page-size-change="importResultHandlePageSize"
            :total="importResultPageData.total"
            :page-size="importResultPageData.pageSize"
            :page-size-opts="importResultPageData.pageSizeOpts"
            :current="importResultPageData.pageNum"
            show-sizer show-total></Page>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="importClose"><span>取消</span></button>
        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="submitData"><span>导入</span></button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import api from '../../../api/social_security/year_base_applicate/annual_adjust_account'
  import InputAccount from '../../common_control/form/input_account'
  import InputCompany from '../../common_control/form/input_company'

  export default {
    components: {InputAccount, InputCompany},

    data() {
      return {
        collapseInfo: [1], //展开栏
        accountSearchData: {
          adjustYear: (new Date()).getFullYear(),
          ssAccountType: '',
          comAccountId: '',
        },
        accountTypeList: [
          {value: '', label: '全部'},
          {value: '1', label: '中智大库'},
          {value: '2', label: '中智独立库'},
          {value: '3', label: '独立户'},
        ],
        inputAccountStyle: {
          'z-index': 99
        },
        isUpload: false,
        isSubmit: false,
        uploadData: {
          ssAccount: '',
          annualAdjustAccountId: '',
        },
        uploadAttr: {
          actionUrl: '/api/soccommandservice/ssAnnualAdjustAccount/annualAdjustAccountEmpUpload',
          acceptFileExtension: '.xls,.xlsx',
        },
        importResultData: [],
        importResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        importResultColumns: [
          {
            title: '社保序号', key: 'ssSerial', width: 120, align: 'left'
          },
          {
            title: '姓名', key: 'employeeName', width: 100, align: 'left'
          },
          {
            title: '身份证号', key: 'idNum', width: 180, align: 'left'
          },
          {
            title: '本单位缴费月数', key: 'paymentMonths', width: 100, align: 'left'
          },
          {
            title: '人员分类', key: 'accountStatus', width: 120, align: 'left',
            render: (h, params) => {
              return this.$decode.accountStatus(params.row.accountStatus)
            }
          },
          {
            title: '错误信息', key: 'errorMsg', width: 300, align: 'left'
          },
        ],
        accountResultData: [],
        accountResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        accountResultColumns: [
          {
            title: '操作', key: '', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  props: {},
                  on: {
                    click: () => {
                      this.annualAdjustAccountDelete(params.row.annualAdjustAccountId);
                    }
                  }
                }, '删除')
              ])
            }
          },
          {
            title: '企业社保账户', key: 'ssAccount', width: 120, align: 'center'
          },
          {
            title: '企业账户名称', key: 'comAccountName', width: 220, align: 'center'
          },
          {
            title: '查看差异', key: '', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  props: {},
                  on: {
                    click: () => {
                      this.matchEmpInfo(params.row.annualAdjustAccountId, params.row.ssAccount, params.row.comAccountName)
                    }
                  }
                }, '查看差异')
              ])
            }
          },
          {
            title: '导出', key: '', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  props: {},
                  on: {
                    click: () => {
                      this.exportExcel(params.row.annualAdjustAccountId);
                    }
                  }
                }, '导出申报')
              ])
            }
          },
          {
            title: '前道导入雇员总数', key: 'afImportTotal', width: 150, align: 'center'
          },
          {
            title: '社保申报表雇员总数（转入/转出）', key: 'ssImportTotal', width: 150, align: 'center'
          },
          {
            title: '匹配成功总数', key: 'matchTotal', width: 120, align: 'center'
          },
          {
            title: '未匹配总数', key: 'unMatchTotal', width: 120, align: 'center'
          },
        ]
      }
    },
    mounted() {
      let local_accountSearchData = localStorage.getItem('annualAdjustAccount.accountSearchData');
      let local_accountResultPageData = localStorage.getItem('annualAdjustAccount.accountResultPageData');
      if (local_accountSearchData) {
        this.accountSearchData = JSON.parse(local_accountSearchData);
        localStorage.removeItem('annualAdjustAccount.accountSearchData');
      }
      if (local_accountResultPageData) {
        this.accountResultPageData = JSON.parse(local_accountResultPageData);
        localStorage.removeItem('annualAdjustAccount.accountResultPageData')
      }
      this.annualAdjustAccountQuery();
    },
    methods: {
      matchEmpInfo(aaaid,ssaccount,comaccountname) {
        localStorage.setItem('annualAdjustAccount.accountSearchData', JSON.stringify(this.accountSearchData));
        localStorage.setItem('annualAdjustAccount.accountResultPageData', JSON.stringify(this.accountResultPageData));
        this.$router.push({name:'annualadjustaccountemp', query: {annualAdjustAccountId: aaaid,ssAccount: ssaccount,comAccountName: comaccountname}});
      },
      beforeUpload(file) {
        if (!this.uploadData.ssAccount || this.uploadData.ssAccount == '') {
          this.$Message.error("请选择社保账户");
          return false;
        }
        this.$refs['upload'].clearFiles();
      },
      onSuccess(response, file, fileList) {
        var data = response;
        if (data.code == 0) {
          this.uploadData.annualAdjustAccountId = data.object['annual_adjust_account_id'];
          this.annualAdjustAccountEmpTempQuery();
          this.isSubmit = false;
        } else {
          this.$Message.error(data.message);
        }
      },
      submitData() {
        if (this.importResultData && this.importResultData.length > 0) {
          var rtn = confirm("是否导入以下正确的行？")
          if (rtn) {
            api.annualAdjustAccountEmpInsert({
              params: {
                annualAdjustAccountId: this.uploadData.annualAdjustAccountId
              },
            }).then(data => {
              if (data.code == 200) {
                this.$Message.info("导入成功");
                this.isSubmit = true;
              }
            })
          }
        } else {
          this.$Message.error("请先上传文件")
        }
      },
      annualAdjustAccountEmpTempQuery() {
        api.annualAdjustAccountEmpTempQuery( {
          pageSize: this.importResultPageData.pageSize,
          pageNum: this.importResultPageData.pageNum,
          params: {
            annualAdjustAccountId: this.uploadData.annualAdjustAccountId
          },
        }).then(data => {
          if (data.code == 200) {
            this.importResultData = data.data.rows;
            this.importResultPageData.total = Number(data.data.total);
          }
        })
      },
      importResultHandlePageNum(val) {
        this.importResultPageData.pageNum = val;
        this.annualAdjustAccountEmpTempQuery();
      },
      importResultHandlePageSize(val) {
        this.importResultPageData.pageSize = val;
        this.annualAdjustAccountEmpTempQuery();
      },
      annualAdjustAccountQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.accountSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          // 处理
//          if ((!params.ssAccountType || params.ssAccountType == "[全部]" || params.ssAccountType == "1")
//            && (!params.companyId || params.companyId == "")) {
//            this.$Message.error("账户类型未设定，或设定为全部或中智大库时，请选择客户");
//            return false;
//          }
        }

        api.annualAdjustAccountQuery(
          {
            pageSize: this.accountResultPageData.pageSize,
            pageNum: this.accountResultPageData.pageNum,
            params: params,
          }
        ).then(data => {
          if (data.code == 200) {
            this.accountResultData = data.data.rows;
            this.accountResultPageData.total = Number(data.data.total);
          }
        })
      },
      handlePageNum(val) {
        this.accountResultPageData.pageNum = val;
        this.annualAdjustAccountQuery();
      },
      handlePageSize(val) {
        this.accountResultPageData.pageSize = val;
        this.annualAdjustAccountQuery();
      },
      importExcel() {
        this.isUpload = true;
      },
      importClose() {
        if (!this.isSubmit && this.importResultData && this.importResultData.length > 0) {
          var rtn = confirm("尚未导入，是否取消？")
          if (rtn) {
            this.importResultData.length = 0;
            this.importResultPageData.total = 0;
            this.importResultPageData.pageNum = 1;
            this.importResultPageData.pageSize = this.$utils.DEFAULT_PAGE_SIZE;
            this.importResultPageData.pageSizeOpts = this.$utils.DEFAULT_PAGE_SIZE_OPTS;
            this.accountResultPageData.pageNum = 1;
            this.annualAdjustAccountQuery();
          } else {
            return false;
          }
        }
        this.isUpload = false;
        this.isSubmit = false;
        this.$refs['upload'].clearFiles();
        this.uploadData.accountId = '';
      },
      exportExcel(annualAdjustAccountId) {
        api.accountEmpAvgMonthSalaryExport({
          params: {
            annualAdjustAccountId: annualAdjustAccountId
          }
        });
      },
      annualAdjustAccountDelete(annualAdjustAccountId) {
        api.annualAdjustAccountDelete({
          params: {
            annualAdjustAccountId: annualAdjustAccountId
          }
        });
      }
    }
  }
</script>
