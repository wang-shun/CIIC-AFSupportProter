<template>
  <div>
    <Card class="mt15">
      <p slot="title">雇员信息</p>
      <Form ref="employeeInfo" :model="employeeInfo" :label-width="140">
        <Row justify="start" class="m15">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员编号：">{{employeeInfo.employeeId}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员姓名：">{{employeeInfo.employeeName}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="公司编号：">{{employeeInfo.companyId}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="公司名称：">{{employeeInfo.companyName}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="终止日期：">{{employeeInfo.endDate}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="退保日期：">{{employeeInfo.endConfirmDate}}</Form-item>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card class="mt15">
      <p slot="title">受理单信息</p>
      <Form ref="acceptanceData" :model="acceptanceData" :label-width="140">
        <Row justify="start" class="m15">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="案卷号：">{{acceptanceData.dossierNumber}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="发票合计：">{{acceptanceData.invoiceNumber}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="导入日期：">{{this.$utils.formatDate(acceptanceData.inputDate, 'YYYY-MM-DD HH:mm:ss')}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理编号：">{{acceptanceData.acceptanceId}}</Form-item>
          </Col>
          <!--TODO: 累计免赔额字段确定-->
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="累计免赔额："></Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="申请金额：">{{acceptanceData.totalApplicationAmount}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="核准金额：">{{acceptanceData.totalApprovedAmount}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="索赔金额：">{{acceptanceData.totalClaimAmount}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="类别：">{{typeToChina(acceptanceData.type)}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="保险理赔金额：">{{acceptanceData.totalInsuranceCompanyMoney}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="公司理赔金额：">{{acceptanceData.totalCompanyAmount}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="分类自付金额：">{{acceptanceData.totalCsPaymentAmount}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="连带被保险人：">{{acceptanceData.insuredName}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核人：">{{acceptanceData.auditor}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核日期：">{{dateToString(acceptanceData.auditTime)}}
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="付款日期：">{{this.$utils.formatDate(acceptanceData.paymentDate, 'YYYY-MM-DD')}}</Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="付款方式："></Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="银行："></Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="卡号："></Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员付款记录："></Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理单备注："></Form-item>
          </Col>
        </Row>
      </Form>
    </Card>

    <div class="tr m20">
      <Button type="success" @click="back">返回</Button>
      <Button type="info" @click="exportData()" icon="ios-download-outline">导出</Button>
    </div>

    <Table border :columns="invoiceColumns" :data="invoiceData" ref="table"></Table>
  </div>
</template>

<script>
  import invoiceExpend from './InvoiceExpend.vue';
  import apiAjax from "../../../data/health_medical/supplementary_medica.js";
  import supplementaryMedica from '../../../store/modules/health_medical/data_sources/supplementary_medica.js'
  import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import qs from "qs"

  export default {
    components: {invoiceExpend},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        value1: '1',
        employeeInfo: {},
        acceptanceData: {},
        userInfo: {},
        invoiceColumns: [
          {
            type: 'expand', width: 50,
            render: (h, params) => {
              return h(invoiceExpend, {
                props: {
                  row: params.row,
                  status: this.acceptanceData.status
                }
              })
            }
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId',
            render: (h, params) => {
              return h('div',params.row.employeeId = this.employeeInfo.employeeId);
            }
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName',
            render: (h, params) => {
              return h('div',params.row.employeeName = this.employeeInfo.employeeName);
            }
          },
          {
            title: '连带被保险人', sortable: true, key: 'insuredName',
            render: (h, params) => {
              return h('div',params.row.insuredName = this.acceptanceData.insuredName);
            }
          },
          {
            title: '所属保单', sortable: true, key: 'column12'
          },
          {
            title: '申请金额', sortable: true, key: 'applicationAmount'
          },
          {
            title: '核准金额', sortable: true, key: 'approvedAmount'
          },
          {
            title: '疾病名称', sortable: true, key: 'diseaseName'
          },
          {
            title: '受理日期', sortable: true, key: 'auditTime',
            render: (h, params) => {
              params.row.auditTime = this.acceptanceData.auditTime;
              if (params.row.auditTime !== null) {
                return h('div', this.$utils.formatDate(params.row.auditTime, 'YYYY-MM-DD HH:mm:ss'));
              }
            }
          },
        ],
        invoiceData: [],
      };
    },
    created() {
      let acceptanceId = JSON.parse(sessionStorage.getItem('acceptanceId'));
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.queryDetailInfo(acceptanceId)
    },
    methods: {
      queryDetailInfo(val) {
        apiAjax.queryMedicalInvoiceDetail(val).then(response => {
          this.employeeInfo = response.data.object.supplyMedicalAcceptance;
          this.acceptanceData = response.data.object.supplyMedicalAcceptance;
          this.invoiceData = response.data.object.supplyMedicalInvoices;
        });
      },
      typeToChina(val) {
        return supplementaryMedica.typeToChina(val);
      },
      dateToString(val) {
        if (val !== null) {
          return this.$utils.formatDate(val, 'YYYY-MM-DD HH:mm:ss');
        }
        return val;
      },
      back() {
        this.$local.back();
      },
      exportData() {
        let acceptanceId = JSON.parse(sessionStorage.getItem('acceptanceId'));
        window.location = apiAjax.basePaths + '/supplyMedicalService/export?acceptanceId=' + acceptanceId + '&token=' + encodeURIComponent(this.userInfo.token);
      }
    },
  }
</script>
