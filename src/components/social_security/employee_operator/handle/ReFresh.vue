<template>
</template>
<script>
  
  export default {
  
    data() {
      return {

      }
    },
    created(){      
                                                          
      this.$router.push({name:this.$route.query.name,query:{operatorType:this.$route.query.operatorType,empTaskId:this.$route.query.empTaskId,isNextMonth:this.$route.query.isNextMonth}})
    },
    mounted() {
      
    },
    computed: {
     
    },
    methods: {
    }
  }
</script>