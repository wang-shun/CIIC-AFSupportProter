<template>
  <div class="smList">
    <Tabs @on-click="changeTab" v-model="currentTab">
      <TabPane label="医疗关系转移">

      </TabPane>
      <TabPane label="零星报销">

      </TabPane>
    </Tabs>
    <medicalRelationshipTab v-if="currentTab === 0"></medicalRelationshipTab>
    <sporadicReimbursementTab v-else></sporadicReimbursementTab>
  </div>
</template>

<script>
  import medicalRelationshipTab from './MedicalRelationshipTab';
  import sporadicReimbursementTab from './SporadicReimbursementTab';

  export default {
    components: {
      medicalRelationshipTab,
      sporadicReimbursementTab
    },
    data() {
      return {
        currentTab: 0
      }
    },
    created() {
      let ts = this.$route.params.data;
      console.info(ts)
      if(ts) {
        this.changeTab(ts);
      }
    },
    methods: {
      changeTab(i) {
        console.info(i);
        this.currentTab = i;
      }
    }
  }
</script>
