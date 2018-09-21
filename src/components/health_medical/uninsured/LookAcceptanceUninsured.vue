<!--受理单、未投保查看页面-->
<template>
  <div>
    <Card>
      <p slot="title">
        雇员信息
      </p>
      <Form :model="detail" :label-width="105">
        <Row>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="雇员编号">
              <span>{{ detail.employeeId }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="公司编号">
              <span>{{ detail.companyId }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="雇员姓名">
              <span>{{ detail.employeeName }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
            <Form-item label="公司名称">
              <span>{{ detail.companyName }}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card class="mt10">
      <p slot="title">
        受理单信息
      </p>
      <Form :model="detail" :label-width="105">
        <Row>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理单编号">
              <span>{{ detail.acceptanceId }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理人">
              <span>{{ detail.handler }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理类型">
              <span>{{ this.getCaseType(detail.caseType) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理单状态">
              <span>{{ this.getAcceptanceStatus(detail.status) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="连带人">
              <span>{{ detail.jointPersonName }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="款项类型">
              <span>{{ this.getMoneyType(detail.moneyType) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理日期">
              <span>{{ detail.handlerDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理金额">
              <span>{{ detail.caseMoney }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="处理备注">
              <span>{{ detail.remark }}</span>
            </Form-item>
          </Col>

        </Row>
      </Form>
    </Card>
    <Card v-if="detail.status > 2" class="mt10">
      <p slot="title">
        未投保审核信息
      </p>
      <Form :model="detail" :label-width="105">
        <Row>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="就诊医院">
              <span>{{ detail.clinicHospital }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理金额">
              <span>{{ detail.acceptAmount }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="付款方式">
              <span>{{ this.getPayType(detail.payType) }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="诊断">
              <span>{{ detail.diagnose }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核金额">
              <span>{{ detail.auditAmount }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="就诊日期">
              <span>{{ detail.diagnoseDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院天数">
              <span>{{ detail.hospitalizationDays }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院开始日期">
              <span>{{ detail.hospitalizationStartDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院结束日期">
              <span>{{ detail.hospitalizationEndDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核人">
              <span>{{ detail.auditor }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核日期">
              <span>{{ detail.auditDate }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="备注">
              <span>{{ detail.remark }}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="付款日期">
              <span>{{ detail.paymentDate }}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </Card>
    <Row class="mt10">
      <Col :sm="{span: 24}" class="tr">
        <Button v-if="printFlag" type="primary" @click="printUninsuredReview()">打印</Button>
        <Button type="warning" @click="back()">返回</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import apiAjax from "../../../data/health_medical/uninsured_application.js";
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'

  export default {
    data() {
      return {
        umAcceptanceId: '',
        printFlag: false,
        detail: {},
        userInfo: {}
      }
    },
    created() {
      this.umAcceptanceId = JSON.parse(sessionStorage.getItem('umAcceptanceId'));
      this.queryAcceptanceUninsured();
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.printFlag = sessionStorage.getItem('printFlag');
      sessionStorage.removeItem('printFlag')
    },
    methods: {
      queryAcceptanceUninsured() {
        apiAjax.acceptanceDetail(this.umAcceptanceId).then(response => {
          let data = response.data;
          if (data.code === 200) {
            this.detail = data.object
          } else {
            this.$Message.error("请重试");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      printUninsuredReview() {
        this.detail.username = this.userInfo.displayName;
        let html = admissibility.getUninsuredObj(this.detail);
        let print = window.open("", "print");
        print.document.write(html);
        print.document.close();
        print.print();
      },
      back() {
        this.$local.back()
      },
      getCaseType(type) {
        return admissibility.caseTypeToChina(type);
      },
      getMoneyType(type) {
        return admissibility.moneyTypeToChina(type);
      },
      getAcceptanceStatus(status) {
        return admissibility.statusToChina(status);
      },
      getPayType(type) {
        return admissibility.payTypeToChina(type);
      }
    },
  }
</script>
