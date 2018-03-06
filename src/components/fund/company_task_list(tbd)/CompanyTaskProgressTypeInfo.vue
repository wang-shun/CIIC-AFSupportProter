<template>
  <approval-step-type-info :prevPage="'companyTaskList'"></approval-step-type-info>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import approvalStepTypeInfo from '../../common_control/ApprovalStepTypeInfo.vue'
  import EventType from '../../../store/event_types'

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
