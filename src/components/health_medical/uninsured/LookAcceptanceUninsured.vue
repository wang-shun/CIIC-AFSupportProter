<!--受理单、未投保查看页面-->
<template>
  <div>
    <Card>
      <p slot="title">
        雇员信息
      </p>
      <Row class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员编号:</span>
        <span>{{this.employeeData.employeeId}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员姓名:</span>
        <span>{{this.employeeData.employeeName}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司编号:</span>
        <span>{{this.employeeData.companyId}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司名称:</span>
        <span>{{this.employeeData.companyName}}</span>
        </Col>
      </Row>
    </Card>

    <Card>
      <p slot="title">
        受理单信息
      </p>
      <Row class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员编号:</span>
        <span>{{this.employeeData.employeeId}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员姓名:</span>
        <span>{{this.employeeData.employeeName}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司编号:</span>
        <span>{{this.employeeData.companyId}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司名称:</span>
        <span>{{this.employeeData.companyName}}</span>
        </Col>
      </Row>
    </Card>
    <Card v-if="uninsuredData.length !==0">
      <p slot="title">
        未投保审核信息
      </p>
      <Row class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员编号:</span>
        <span>{{this.employeeData.employeeId}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>雇员姓名:</span>
        <span>{{this.employeeData.employeeName}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司编号:</span>
        <span>{{this.employeeData.companyId}}</span>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <span>公司名称:</span>
        <span>{{this.employeeData.companyName}}</span>
        </Col>
      </Row>
    </Card>
    <Row type="flex" justify="start">
      <Col :sm="{span: 24}" class="tr">
      <Button type="warning" @click="back()">返回</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        umAcceptanceId: null,
        employeeData: {
          employeeId: '11L2674',
          employeeName: '戴敏',
          companyId: '13684',
          companyName: '苹果科技公司',
        },
        acceptanceData: {
          acceptanceId: '20160215072',
          caseType: 1,
          moneyType: 1,
          jointPersonName: '段嘉晨',
          handler: '胡艳',
          status: 1,
          handlerDate: '2016-02-16',
          caseMoney: '150'
        },
        uninsuredData: {
          umAcceptanceId: '20160215072',
          caseType: 1,
          moneyType: 2,
          reimbursementYearMonth: '2016-02',
          reimbursementMoney: '1500',
          auditor: '王正微',
          auditDate: '2016-02-15',
          status: 1,
          payID: '1983865'
        },
      }
    },
    created() {
      this.umAcceptanceId = JSON.parse(sessionStorage.getItem('umAcceptanceId'));
      this.queryAcceptanceUninsured();
    },
    methods: {
      queryAcceptanceUninsured() {
        let sdd = [];
        console.info(sdd.length);
      },
      back() {
        this.$local.back();
      },
    },
  }
</script>
