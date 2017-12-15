<template>
  <div>
    <Tabs @on-click="changeTab">
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
    methods: {
      changeTab(i) {
        this.currentTab = i;
      }
    }
  }
</script>
