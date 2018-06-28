<template>
  <div>
    <Poptip :trigger="contentSetup.trigger" :width="contentSetup.width" :placement="contentSetup.placement">
      <Button :type="btnSet.type" :size="btnSet.size" :long="btnSet.long" :disabled="btnSet.disabled" :icon="btnSet.icon">{{btnSet.value}}</Button>
      <div slot="content">
        <Table :columns="tableSet.columns" :data="tableSet.data" v-if="(JSON.stringify(tableSet) !== '{}') && tableSet !== undefined"></Table>
        <div v-html="contentSet.content" v-else></div>
      </div>
    </Poptip>
  </div>
</template>
<script>
  export default {
    props: {
      btnSetup: {
        type: Object,
        required: true
      },
      contentSetup: {
        type: Object,
        required: true
      },
      tableSetup: {
        type: Object
      }
    },
    data() {
      return {

      }
    },
    computed: {
      btnSet() {
        return this.btnSetup;
      },
      contentSet() {
        return this.contentSetup;
      },
      tableSet() {
        return this.tableSetup
      }
    }
  }
</script>