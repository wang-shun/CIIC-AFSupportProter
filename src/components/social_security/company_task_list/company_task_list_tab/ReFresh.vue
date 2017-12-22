<template>
</template>
<script>
  
  export default {
  
    data() {
      return {

      }
    },
    created(){
      this.$router.push({name:this.$route.query.name,query:{operatorType:this.$route.query.operatorType,tid:this.$route.query.tid}})
    },
    mounted() {
      
    },
    computed: {
     
    },
    methods: {
    }
  }
</script>

