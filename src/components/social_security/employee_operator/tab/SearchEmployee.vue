<template>
  <Form :model="searchForm" ref="searchForm" :label-width="100" @submit.native.prevent>
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
            <Select v-model="searchForm.relationshipValue" :label-in-value="true" @on-change="v=>{setOption(v, 1002)}" :disabled="searchForm.disabled" transfer>
              <Option v-for="(value, key, index) in searchForm.relationship" :value="value" :key="index">{{key}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 24}">
          <Form-item label="查询内容" prop="searchContent">

            <Input v-model="searchForm.searchContent" placeholder="请输入" :disabled="searchForm.contentDisabled" v-if="searchForm.isDate == 0" />
            <Date-picker  v-model="searchForm.searchContent"  type="month"  placement="right"
                             placeholder="选择年月份" style="width: 100%;" :disabled="searchForm.contentDisabled" v-if="searchForm.isDate == 1"></Date-picker>
            <Select v-model="searchForm.searchContent" style="width: 100%;"  :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 2">
                  <!--<Option value="[全部]" label="全部"></Option>-->
                  <Option v-for="item in ssAccountTypedict" :value="item.key" :key="item.key" :label="item.value"></Option>
            </Select>
            <input-account v-model="searchForm.searchContent" :alDisabled="searchForm.contentDisabled" v-if="searchForm.isDate == 3" ></input-account>
            <input-company v-model="searchForm.searchContent" :alDisabled="searchForm.contentDisabled" v-if="searchForm.isDate == 4"></input-company>
            <input-company-name v-model="searchForm.searchContent" :alDisabled="searchForm.contentDisabled" v-if="searchForm.isDate == 6"></input-company-name>
            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer  v-if="searchForm.isDate == 5">
              <!--<Option value="" label="全部"></Option>-->
              <Option v-for="item in taskCategorydict" :value="item.key" :key="item.key" :label="item.value"></Option>
            </Select>
            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 7">
                <!--<Option value="" label="全部"></Option>-->
                <Option v-for="(value,key) in this.baseDic.dic_settle_area" :value="value" :key="key">{{value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" transfer v-if="searchForm.isDate == 8">
                <!--<Option value="0" label="全部"></Option>-->
                <Option value="-1" label="本月未处理"></Option>
                <Option value="-2" label="下月未处理"></Option>
            </Select>

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
        <Button type="primary" icon="ios-search" :loading="isLoading"  @click="searchEmploiees">查询</Button>

        <Button type="warning" @click="resetForm('searchForm')">重置</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {em_chooseField, em_relationship} from "../../../../assets/js/social_manage/common_filed"
  import COMMON_METHODS from "../../../../assets/js/common_methods"
  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import dict from '../../../../api/dict_access/social_security_dict'
  const chooseType = {
    field: 1001,
    relationship: 1002
  };

  export default {
    components: {InputAccount,InputCompany,InputCompanyName},
    props: {
      isLoading: {
        type: Boolean
      }, showHandle: {
        type: Object
      }
    },
    data() {
      return {
         finishStatus: [
          {value:0,label:'未处理'},
          {value:1,label:'已处理'},
          {value:2,label:'全部'}
        ],
        searchForm: {
          chooseFieldValue: "",
          chooseField: em_chooseField,
          relationshipValue: "",
          relationship: em_relationship,
          searchContent: "",
          isDate:0,
          searchContentDesc: "",
          disabled: false,
          contentDisabled: false
        },
        searchConditions: [],
        currentField: {},
        currentShip: {},
        currentSelectIndex: -1
      }
    },
    async mounted() {

      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

      var fu = sessionStorage.getItem('socialDaily'+userInfo.userId);

      if(fu!=null)
      {
        this.searchConditions = JSON.parse(fu);
        if(this.showHandle.name!='noprogress')
        {
            for(var i=0;i<this.searchConditions.length;i++)
            {
               if(this.searchConditions[i].exec.indexOf('taskStatus')!=-1)
               {
                    this.searchConditions.splice(i,1);
               }
            }
        }
      }

      this.loadDict();
    },
    methods: {
      // 选择字段或关系
      setOption(content, type){
        this.searchForm.contentDisabled = false;

        if(type === chooseType.field) {

          this.searchForm.disabled = false;
          this.searchForm.relationshipValue = "";

          if(content.value.indexOf("month")>0){
            this.searchForm.isDate=1;
          }else if(content.value=='ca.ss_account_type'){
            this.searchForm.isDate=2;
          }else if(content.value=='ca.ss_account'){
            this.searchForm.isDate=3;
          }else if(content.value=='c.company_id'){
            this.searchForm.isDate=4;
          }else if(content.value=='et.task_category'){
            this.searchForm.isDate=5;
          }else if(content.value=='c.title'){
            this.searchForm.isDate=6;
          }else if(content.value=='ca.settlement_area'){
            this.searchForm.isDate=7;
          }else if(content.value == 'taskStatus'){
             this.searchForm.isDate=8;
            this.searchForm.disabled = true;
            this.searchForm.relationshipValue = "=";
          }else{
            this.searchForm.isDate=0;
          }
          this.searchForm.searchContent ="";
          this.currentField = content;
        } else {
          this.currentShip = content;

          if (this.currentShip && this.currentShip.value === "is null") {
            this.searchForm.contentDisabled = true;
          }
        }
      },
      addCondition() {
        if(COMMON_METHODS.IS_EMPTY(this.currentField) || COMMON_METHODS.IS_EMPTY(this.currentShip) || (!this.searchForm.contentDisabled && COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent))) {
          this.$Message.error("请选择字段、关系并输入查询内容");
          return;
        } else {
          if(this.searchForm.isDate==1){
             var d = new Date(this.searchForm.searchContent);
              var year = d.getFullYear();
              var month = d.getMonth() + 1;
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              this.searchForm.searchContent= year + month;
          }

          var temp_searchContent = this.searchForm.searchContent;
          if(this.currentShip.value=='like'){
              temp_searchContent = '%'+this.searchForm.searchContent+'%';
          }

          if(this.searchForm.isDate == 5||this.searchForm.isDate == 2||this.searchForm.isDate == 7||this.searchForm.isDate == 8)
          {
             this.searchForm.searchContent = this.searchForm.searchContentDesc;
          }

          const searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${this.searchForm.searchContent}`;
          var searchConditionExec = `${this.currentField.value} ${this.currentShip.value} '${temp_searchContent}'`;

          if (COMMON_METHODS.IS_EMPTY(temp_searchContent)) {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value}`;
          }

          const searchCondition = {
            desc: searchConditionDesc,
            exec: searchConditionExec
          };
          // const searchCondition = searchConditionExec;
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
        this.searchConditions=[];
      },
      searchEmploiees() {
         var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
         window.sessionStorage.setItem('socialDaily'+userInfo.userId, JSON.stringify(this.searchConditions));
         this.$emit("on-search", this.searchConditions);
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.taskCategorydict = data.data.SOCLocalTaskCategory;
            this.ssAccountTypedict = data.data.SocialSecurityAccountType;
          }
        });
      },categroryChange(option) {
         this.searchForm.searchContentDesc = option.label;
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
