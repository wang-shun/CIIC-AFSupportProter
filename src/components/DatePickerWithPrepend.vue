<template>
	<Date-picker
        :open="open"
        :value="date"
        :type="type"
        @on-change="handleChange">
        <Input :value="date" @on-focus="handleFocus" icon="ios-calendar-outline" @on-blur="handleBlur" readonly>
	        <span slot="prepend">{{ prepend }}</span>
	    </Input>
    </Date-picker>
</template>

<script>
export default {

  name: 'datePickerWithPrepend',

  props: {
	prepend:'',
	type: {
		default: 'date'
	}
  },

  data () {
    return {
    	open: false,
    	date: '', 
    };
  },
  methods: {
  	handleFocus () {
        this.open = !this.open;
    },
    handleBlur () {
        this.open = false;
    },
    handleChange (date) {
    	this.date = date;
    	this.open = false;
    	this.$emit('timeChanged', this.date);
    }
  }
};
</script>

<style lang="css" scoped>
</style>