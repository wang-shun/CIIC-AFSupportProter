<template>
  <div>
    <Tabs @on-click="changeTab" v-model="currentTab">
      <TabPane label="礼品发放"></TabPane>
      <TabPane label="活动发放"></TabPane>
    </Tabs>

    <grantGiftTab v-if="currentTab === 0"></grantGiftTab>
    <grantMarketTab v-else></grantMarketTab>

  </div>
</template>

<script>
  import grantGiftTab from './GrantGiftTab.vue';
  import grantMarketTab from './GrantMarketTab.vue';

  export default {
    components: {
      grantGiftTab,
      grantMarketTab
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
