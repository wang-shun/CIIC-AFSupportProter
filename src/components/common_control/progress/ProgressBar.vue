<template>
  <ul>
    <li v-for="(step, index) in steps" :key="index" :style="{width: 100 / steps.length + '%'}">
      <div class="progressPointBig" v-if="step.isOver === 0"></div>
      <div class="progressPointSmall" v-else-if="step.isOver === 1"></div>
      <div class="progressPointSmallGray" v-else></div>
      <div class="progressBar" v-if="step.isOver === 1"></div>
      <div class="progressBarGray" v-else></div>

      <div class="progressPointSmallEnd" v-if="(index === steps.length - 1) && (step.isOver === 1 || step.isOver === 0)"></div>
      <div class="progressPointSmallGrayEnd" v-else-if="(index === steps.length - 1) && (step.isOver === -1)"></div>

      <p>
        <span v-show="step.title !== ''">{{step.title}}</span>
        <span v-show="step.author !== ''">{{step.author}}</span>
        <span v-show="step.date !== ''">{{step.date}}</span>
        <a :href="step.action.href !== '' ? step.action.href : 'javascript:;'" v-show="step.name !== ''" @click="handleClick(step, steps, index)">{{step.action.name}}</a>
      </p>
    </li>
  </ul>
</template>
<script>
  const status = {
    crossed: 1,
    crossing: 0,
    notCross: -1
  }; // status: 1-已经过 0-正在经过 -1-未经过

  export default {
    props: {
      stepsInfo: {
        type: Array
      }
    },
    data() {
      return{

      }
    },
    computed: {
      steps() {
        return this.stepsInfo;
      }
    },
    methods: {
      handleClick(step, steps, index) {
        this.$emit("on-step-click", {step: step, steps: steps, index: index})
      }
    }
  }
</script>
<style scoped>
  ul, li {list-style: none;}
  ul {width: 100%; overflow: auto;}
  li {height: 80px; float: left; position: relative;}
  li p {width: 100%; position: absolute; left: 0; top: 24px;}
  li p span, li p a{line-height: 20px; display: block; width: 100%; height: 20px;}

  .progressPointBig, .progressPointSmall, .progressPointSmallGray, .progressPointSmallEnd, .progressPointSmallGrayEnd {position: absolute;}
  .progressPointBig {width: 16px; height: 16px; top: 0; border-radius: 8px; background-color: #2d8cf0; z-index: 3;}
  .progressPointSmall, .progressPointSmallGray, .progressPointSmallEnd, .progressPointSmallGrayEnd {width: 12px; height: 12px; top: 2px; border-radius: 6px;}
  .progressPointSmall {background-color: #2d8cf0; z-index: 3;}
  .progressPointSmallGray {background-color: #ccc; z-index: 3;}
  .progressPointSmallEnd {right: 0;background-color: #2d8cf0; z-index: 4;}
  .progressPointSmallGrayEnd {right: 0;background-color: #ccc; z-index: 4;}

  .progressBar, .progressBarGray {width: 100%; height: 4px; position: absolute; top: 6px; left: 0;}
  .progressBar {background-color: #2d8cf0;}
  .progressBarGray {background-color: #ccc;}
</style>
