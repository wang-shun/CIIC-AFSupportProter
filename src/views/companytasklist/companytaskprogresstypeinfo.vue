<template>
  <approval-step-type-info :prevPage="'companytasklist'"></approval-step-type-info>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import approvalStepTypeInfo from '../commoncontrol/approvalsteptypeinfo.vue'
  import EventType from '../../store/EventTypes'

  export default {
    components: {approvalStepTypeInfo},
    data() {
      return {}
    },
    mounted() {
      this[EventType.COMPANYTASKPROGRESSTYPEINFOTYPE]()
    },
    computed: {
      ...mapState('companyTaskProgressTypeInfo', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('companyTaskProgressTypeInfo', [EventType.COMPANYTASKPROGRESSTYPEINFOTYPE]),
    }
  }
</script>
