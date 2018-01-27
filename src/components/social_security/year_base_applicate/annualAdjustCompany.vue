<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        年调雇员工资信息管理
        <div slot="content">
          <Form :label-width=150 ref="companySearchData" :model="companySearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调整年份：" prop="adjustYear">
                <Col span="5">
                <Input v-model="companySearchData.adjustYear" readonly></Input>
                </Col>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账户类型：" prop="ssAccountType">
                <Select v-model="companySearchData.ssAccountType" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="中智大库"></Option>
                  <Option value="2" label="中智外包"></Option>
                  <Option value="3" label="独立户"></Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="账户编号：" prop="comAccountId">
                <input-account v-model="companySearchData.comAccountId"></input-account>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="companySearchData.companyId"></input-company>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['companySearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
      <Button type="info" @click="importExcel">上传客户采集名单</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="companyResultData"
             :columns="companyResultColumns"
             :data="companyResultData"
             ></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="companyResultPageData.total"
        :page-size="companyResultPageData.pageSize"
        :page-size-opts="companyResultPageData.pageSizeOpts"
        :current="companyResultPageData.pageNum"
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
            <Form-item label="客户编号：" prop="companyId">
              <input-company v-model="uploadData.companyId" :styles="inputCompanyStyle"></input-company>
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
  import api from '../../../api/social_security/year_base_applicate/annual_adjust_company'
  import InputAccount from '../../common_control/form/input_account'
  import InputCompany from '../../common_control/form/input_company'

  export default {
    components: {InputAccount, InputCompany},

    data() {
      return {
        collapseInfo: [1], //展开栏
        companySearchData: {
          adjustYear: (new Date()).getFullYear(),
          ssAccountType: '',
          comAccountId: '',
          companyId: '',
        },
        inputCompanyStyle: {
          'z-index': 99
        },
        isUpload: false,
        isSubmit: false,
        uploadData: {
          companyId: '',
          annualAdjustCompanyId: '',
        },
        uploadAttr: {
          actionUrl: '/api/soccommandservice/ssAnnualAdjustCompany/annualAdjustCompanyEmpUpload',
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
            title: '雇员编号', key: 'employeeId', width: 100, align: 'left'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 100, align: 'left'
          },
          {
            title: '社保序号', key: 'ssSerial', width: 100, align: 'left'
          },
          {
            title: '工资', key: 'salary', width: 100, align: 'left'
          },
          {
            title: '身份证号', key: 'idNum', width: 200, align: 'left'
          },
          {
            title: '社保状态', key: 'archiveStatus', width: 80, align: 'left'
          },
          {
            title: '账户类型', key: 'ssAccountType', width: 100, align: 'left'
          },
          {
            title: '人员属性', key: 'empClassify', width: 80, align: 'left'
          },
          {
            title: '社保基数', key: 'baseAmount', width: 100, align: 'left'
          },
          {
            title: '结算区县', key: 'settlementArea', width: 80, align: 'left'
          },
          {
            title: '企业社保账户', key: 'ssAccount', width: 100, align: 'left'
          },
          {
            title: '养老金独立开户用户名', key: 'ssUsername', width: 100, align: 'left'
          },
          {
            title: '养老金独立开户密码', key: 'ssPwd', width: 100, align: 'left'
          },
          {
            title: '客户编号', key: 'companyId', width: 120, align: 'left'
          },
          {
            title: '错误信息', key: 'errorMsg', width: 300, align: 'left'
          },
        ],
        companyResultData: [],
        companyResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        companyResultColumns: [
          {
            title: '雇员数据维护', key: '', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  props: {},
                  on: {
                    click: () => {
                      this.editEmpInfo(params.row.annualAdjustCompanyId, params.row.companyId, params.row.companyName)
                    }
                  }
                }, '维护')
              ])
            }
          },
          {
            title: '调整年份', key: 'adjustYear', width: 100, align: 'center'
          },
          {
            title: '客户编号', key: 'companyId', width: 150, align: 'center'
          },
          {
            title: '客户姓名', key: 'companyName', width: 150, align: 'center'
          },
          {
            title: '数据收集完成时间', key: 'dataCollectTime', width: 150, align: 'center'
          }
        ]
      }
    },
    mounted() {
      let local_companySearchData = localStorage.getItem('annualAdjustCompany.companySearchData');
      let local_companyResultPageData = localStorage.getItem('annualAdjustCompany.companyResultPageData');
      if (local_companySearchData) {
        this.companySearchData = JSON.parse(local_companySearchData);
        localStorage.removeItem('annualAdjustCompany.companySearchData');
      }
      if (local_companyResultPageData) {
        this.companyResultPageData = JSON.parse(local_companyResultPageData);
        localStorage.removeItem('annualAdjustCompany.companyResultPageData')
      }
      this.annualAdjustCompanyQuery();
    },
    methods: {
      editEmpInfo(aacid,compid,compnm) {
        localStorage.setItem('annualAdjustCompany.companySearchData', JSON.stringify(this.companySearchData));
        localStorage.setItem('annualAdjustCompany.companyResultPageData', JSON.stringify(this.companyResultPageData));
        this.$router.push({name:'annualadjustcompanyemp', query: {annualAdjustCompanyId: aacid,companyId: compid,companyName: compnm}});
      },
      beforeUpload(file) {
        if (!this.uploadData.companyId || this.uploadData.companyId == '') {
          this.$Message.error("请选择客户");
          return false;
        }
        this.$refs['upload'].clearFiles();
      },
      onSuccess(response, file, fileList) {
        var data = response;
        if (data.code == 0) {
          this.uploadData.annualAdjustCompanyId = data.object['annual_adjust_company_id'];
          this.annualAdjustCompanyEmpTempQuery();
          this.isSubmit = false;
        } else {
          this.$Message.error(data.message);
        }
      },
      submitData() {
        if (this.importResultData && this.importResultData.length > 0) {
          var rtn = confirm("是否导入以下正确的行？")
          if (rtn) {
            api.annualAdjustCompanyEmpInsert({
              params: {
                annualAdjustCompanyId: this.uploadData.annualAdjustCompanyId
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
      annualAdjustCompanyEmpTempQuery() {
        api.annualAdjustCompanyEmpTempQuery( {
          pageSize: this.importResultPageData.pageSize,
          pageNum: this.importResultPageData.pageNum,
          params: {
            annualAdjustCompanyId: this.uploadData.annualAdjustCompanyId
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
        this.annualAdjustCompanyEmpTempQuery();
      },
      importResultHandlePageSize(val) {
        this.importResultPageData.pageSize = val;
        this.annualAdjustCompanyEmpTempQuery();
      },
      annualAdjustCompanyQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.companySearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          // 处理
//          if ((!params.ssAccountType || params.ssAccountType == "[全部]" || params.ssAccountType == "1")
//            && (!params.companyId || params.companyId == "")) {
//            this.$Message.error("账户类型未设定，或设定为全部或中智大库时，请选择客户");
//            return false;
//          }
        }

        api.annualAdjustCompanyQuery(
          {
            pageSize: this.companyResultPageData.pageSize,
            pageNum: this.companyResultPageData.pageNum,
            params: params,
          }
        ).then(data => {
          if (data.code == 200) {
            this.companyResultData = data.data.rows;
            this.companyResultPageData.total = Number(data.data.total);
          }
        })
      },
      handlePageNum(val) {
        this.companyResultPageData.pageNum = val;
        this.annualAdjustCompanyQuery();
      },
      handlePageSize(val) {
        this.companyResultPageData.pageSize = val;
        this.annualAdjustCompanyQuery();
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
          } else {
            return false;
          }
        }
        this.isUpload = false;
        this.isSubmit = false;
        this.$refs['upload'].clearFiles();
        this.uploadData.companyId = '';

      }
    }
  }
</script>
