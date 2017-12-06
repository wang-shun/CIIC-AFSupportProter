<template>
  <div>
    {{data}}
  </div>
</template>
<script>
  import ajax from '../api/social_security/employee_operator'

  export default {
    data() {
      return {
        data: {}
      }
    },
    async mounted() {
      var response = await ajax.employeeOperatorQuery();
      this.data = response;
      // 或者
//      ajax.employeeOperatorQuery({}).then(response => {
//        this.data = response;
//      })
    }
  }

</script>
<style scoped>

</style>
