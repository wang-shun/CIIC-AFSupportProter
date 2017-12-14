<template>
  <div class="smList">
    <Tabs :animated="false">
      <TabPane label="医疗关系转移">
        <medicalRelationshipTab></medicalRelationshipTab>
      </TabPane>
      <TabPane label="零星报销">
        <sporadicReimbursementTab></sporadicReimbursementTab>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import medicalRelationshipTab from './MedicalRelationshipTab';
  import sporadicReimbursementTab from './SporadicReimbursementTab';

  export default {
    components: {
      medicalRelationshipTab,
      sporadicReimbursementTab
    }
  }
</script>
