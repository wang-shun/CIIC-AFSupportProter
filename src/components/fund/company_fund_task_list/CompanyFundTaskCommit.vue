<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        客户信息
        <div slot="content">
          <customer-info :customerInfo="data.customerInfo" :isShowComplete="true"></customer-info>
        </div>
      </Panel>
      <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <fund-open-account :openAccountInfo="data.openAccountInfo"></fund-open-account>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="">提交</Button>
        <Button type="error" @click="goBack">批退</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>

  import customerInfo from "../common/CustomerInfo.vue"
  import fundOpenAccount from "../common/FundOpenAccount.vue"

  export default {
    components: {customerInfo, fundOpenAccount},
    data() {
      return {
        collapseInfo: [1, 2],
        code:200,
        data: {
          customerInfo: {
            customerNumber: "KH0001",
            customerName: "上海XX信息技术有限公司",
            serviceManager: "王XX",
            customerFundEndDate: "本月15日",
            initiater: "金翔云",
            sponsorTime: "2017-03-02 14:14:32",
            initiaterNotes: "企业公积金账号是：xxxxx，企业补充公积金账号是xxxx"
          },
          openAccountInfo: {
            changeTypeValue: 0,
            paymentBankValue: 0,
            payMethodValue: 0,
            companyFundAccount: "",
            UKeyValue: 0,
            customerPayStartDate: "",
            closeAccountEveryMonth: "25",
            professionalOperateStartDate: "",
            accpetDate: "",
            deliveredDate: "",
            finishDate: "",
            notes: ""
          }
        }
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.push({name: "companyFundTaskList"});
      },
    }
  }
</script>
