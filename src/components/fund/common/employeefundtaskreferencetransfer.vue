<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <chat :chatList="chatList" class="mt20"></chat>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import chat from '../../commoncontrol/chathistory/chat.vue'

  export default {
    components: {chat},
    props: {
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      chat: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    },
    computed: {
      reference() {
        return this.referenceInfo
      },
      chatList() {
        return this.chat
      }
    }
  }
</script>
