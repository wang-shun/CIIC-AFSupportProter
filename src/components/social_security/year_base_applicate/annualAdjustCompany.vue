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
      v-model="isUpload"
      style="position:absolute;z-index:90;">
      <div style="text-align: center;">
        <Form :label-width=150 ref="uploadData" :model="uploadData">
          <Row type="flex" justify="start">
            <Col :sm="{span:15}">
            <Form-item label="客户编号：" prop="companyId">
              <input-company v-model="uploadData.companyId"></input-company>
            </Form-item>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span:15}">
            <Form-item label="批量上传：" prop="uploadFile">
              <Upload ref="upload" :action="uploadAttr.actionUrl" :data="uploadData" :accept="uploadAttr.acceptFileExtension" :before-upload="beforeUpload">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="importClose"><span>关闭</span></button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/EventTypes'
  import api from '../../../api/social_security/year_base_applicate/annual_adjust_employee'
  import InputAccount from '../../commoncontrol/form/input-account'
  import InputCompany from '../../commoncontrol/form/input-company'

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
        isUpload: false,
        uploadData: {
          companyId: '',
        },
        uploadAttr: {
          actionUrl: '/api/soccommandservice/ssAnnualAdjustCompany/testUpload',
          acceptFileExtension: '.xls,.xlsx',
        },
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
                      this.editEmpInfo(params.row.annualAdjustCompanyId)
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
            title: '导入时间', key: 'impTime', width: 150, align: 'center'
          },
          {
            title: '数据收集完成时间', key: 'dataCollectTime', width: 150, align: 'center'
          }
        ]
      }
    },
    methods: {
      editEmpInfo(aacid) {
        this.$router.push({name:'annualadjustcompanyemp', query: {annualAdjustCompanyId: aacid}});
      },
      beforeUpload(file) {
        if (!this.uploadData.companyId || this.uploadData.companyId == '') {
          this.$Message.error("上传文件时请选择客户");
          return false;
        }
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
          if ((!params.ssAccountType || params.ssAccountType == "[全部]" || params.ssAccountType == "1")
            && (!params.companyId || params.companyId == "")) {
            this.$Message.error("账户类型未设定，或设定为全部或中智大库时，请选择客户");
            return false;
          }
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
        this.employeeResultPageData.pageSize = val;
        this.annualAdjustCompanyQuery();
      },
      importExcel() {
        this.isUpload = true;
      },
      importClose() {
        this.isUpload = false;
        this.$refs['upload'].clearFiles();
        this.uploadData.companyId='';
      }
    }
  }
</script>
