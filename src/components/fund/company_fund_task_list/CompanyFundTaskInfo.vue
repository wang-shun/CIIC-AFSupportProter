<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        客户信息
        <div slot="content">
          <company-info ref="company" :customerInfo="this.$route.params.companyInfo" :isShowComplete="true"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        企业任务单信息
        <div slot="content">
          <company-task-info ref="task" :companyTaskInfo="$route.params.companyTaskInfo"></company-task-info>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>

  import customerInfo from "../common/CustomerInfo.vue"
  import companyTaskInfo from "../common/CompanyTaskInfo"

  export default {
    components: {companyInfo:customerInfo, companyTaskInfo},
    data() {
      return {
        collapseInfo: [1, 2]
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.push({name: "companyFundTaskList"});
      }
    }
  }
</script>
