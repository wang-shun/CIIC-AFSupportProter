<template>
  <div>
    <div class="smList">
      <Tabs value="PersonalSearch">
        <TabPane label="个人查询" name="PersonalSearch">
          <personal-search></personal-search>
        </TabPane>
        <TabPane label="客户查询" name="customerSearch">
          <customer-search></customer-search>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import personalSearch from "./fund_report_tab/personal_search.vue"
  import customerSearch from "./fund_report_tab/customer_search.vue"

  export default {
    components: {personalSearch, customerSearch},
    data() {
      return {

      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
  }
</script>
