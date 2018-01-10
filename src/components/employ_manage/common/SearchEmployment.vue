<template>
  <Form :model="searchForm" ref="searchForm" :label-width="100">
    <Row justify="start">
      <Col :sm="{span: 8}">
      <Row>
        <Col :sm="{span: 24}">
          <Form-item label="选择字段" prop="chooseFieldValue">
            <Select v-model="searchForm.chooseFieldValue" :label-in-value="true" @on-change="v=>{setOption(v, 1001)}" transfer>
              <Option v-for="(field, index) in searchForm.chooseField" :value="index" :key="index">{{field}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 24}">
          <Form-item label="关系" prop="relationshipValue">
            <Select v-model="searchForm.relationshipValue" :label-in-value="true" @on-change="v=>{setOption(v, 1002)}" transfer>
              <Option v-for="(value, key, index) in searchForm.relationship" :value="value" :key="index">{{key}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 24}">
          <Form-item label="查询内容" prop="searchContent">
            <Input v-model="searchForm.searchContent" placeholder="请输入"/>
          </Form-item>
        </Col>
      </Row>
      </Col>
      <Col :sm="{span: 2, offset: 1}">
        <Button type="primary" @click="addCondition" long>新增</Button>
        <Button type="error" @click="delCondition" class="mt20" long>删除</Button>
      </Col>
      <Col :sm="{span: 12, offset: 1}">
        <div class="showCondition">
          <a href="javascript:;" :class="{'selected': index === currentSelectIndex}" @click="currentSelectIndex = index" v-for="(condition, index) in searchConditions">{{condition.desc}}</a>
        </div>
      </Col>
    </Row>
    <Row justify="start">
      <Col :sm="{span: 24}" class="mt20 tr">
        <Button type="primary" icon="ios-search" :disabled="searchConditions.length === 0" @click="searchEmploiees">查询</Button>
        <Button type="warning" @click="resetForm('searchForm')">重置</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {em_chooseField, em_relationship} from "../../../assets/js/employ_manage/common_filed"
  import COMMON_METHODS from "../../../assets/js/common_methods"
  const chooseType = {
    field: 1001,
    relationship: 1002
  };

  export default {
    data() {
      return {
        // 上半部分
        searchForm: {
          chooseFieldValue: "",
          chooseField: em_chooseField,
          relationshipValue: "",
          relationship: em_relationship,
          searchContent: ""
        },
        searchConditions: [],
        currentField: {},
        currentShip: {},
        currentSelectIndex: -1,
      }
    },
    methods: {
      // 选择字段或关系
      setOption(content, type){
        if(type === chooseType.field) {
          this.currentField = content;
        } else {
          this.currentShip = content;
        }
      },
      addCondition() {
        if(COMMON_METHODS.IS_EMPTY(this.currentField) || COMMON_METHODS.IS_EMPTY(this.currentShip) || COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent)) {
          this.$Message.error("请选择字段、关系并输入查询内容");
          return;
        } else {
          const searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${this.searchForm.searchContent}`;
          const searchConditionExec = `${this.currentField.value} ${this.currentShip.value} ${this.searchForm.searchContent}`;
          const searchCondition = {
            desc: searchConditionDesc,
            exec: searchConditionExec
          };
          // 防止输入重复项
          let hasRepeatObj = -1;
          if(this.searchConditions.length > 0) {
            hasRepeatObj = _.findIndex(this.searchConditions, (o) => {
              return searchCondition.desc === o.desc && searchCondition.exec === o.exec;
            });
          }
          if(hasRepeatObj === -1) {
            this.searchConditions.push(searchCondition);
          } else {
            this.$Message.error("请不要重复添加");
          }
        }
      },
      delCondition() {
        if(this.currentSelectIndex !== -1) {
          this.searchConditions.splice(this.currentSelectIndex, 1);
        }
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      searchEmploiees() {
        this.$emit("on-search", this.searchConditions);
      }
    },
    computed: {

    }
  }
</script>
<style>
  .showCondition{
    width: 100%;
    min-height: 150px;
    max-height: 150px;
    overflow: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .showCondition a {
    color: #2b85e4;
    line-height: 30px;
    display: block;
    height: 40px;
    padding: 5px;
    background: white;
  }
  .showCondition a:hover {
    color: white;
    background: #2b85e4;
  }
  .selected {
    color: white!important;
    background: #2b85e4!important;
  }
</style>
