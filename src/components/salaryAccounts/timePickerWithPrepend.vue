<template>
	<Time-picker
        :open="open"
        :value="time"
        format="HH:mm"
        confirm
        @on-clear="handleClear"
        @on-ok="handleOk"
        @on-change="handleChange">
        <Input :value="time" @on-focus="handleFocus" icon="ios-clock-outline" readonly>
	        <span slot="prepend">{{ prepend }}</span>
	      </Input>
    </Time-picker>
</template>

<script>
export default {

  name: 'timePickerWithPrepend',

  props: {
    prepend:{
      default: ''
    }
  },

  data () {
    return {
    	open: false,
    	time: '', 
    };
  },
  methods: {
  	handleFocus () {
        this.open = !this.open;
    },
    handleChange (time) {
      	this.time = time;
      	this.$emit('timeChanged', this.time);
    },
    handleClear () {
        this.open = false;
    },
    handleOk () {
        this.open = false;
    }
  }
};
</script>

<style lang="css" scoped>
</style>