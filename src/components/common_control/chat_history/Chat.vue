<template>
  <ul>
    <chat-item v-for="item in chat" :chatItem="item" :key="item.date"></chat-item>
  </ul>
</template>
<script>
  import chatItem from './ChatItem.vue'
  export default {
    name:"chat",
    components: {chatItem},
    props: {
      chatList: {
        type: Array
      }
    },
    computed: {
      chat() {
        return this.chatList;
      }
    }
  }
</script>
<style scoped>
  ul {list-style: none; width: 430px; height: 116px; overflow-y: auto;}
</style>
