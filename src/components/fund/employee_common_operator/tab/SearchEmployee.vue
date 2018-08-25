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
            <Input v-model="searchForm.searchContent" placeholder="请输入" :maxlength=128 :disabled="searchForm.contentDisabled" v-if="searchForm.isDate == 0 || searchForm.isDate == 70" />

            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 1">
                  <Option v-for="item in processStatusList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 2">
                  <Option v-for="item in taskTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContentArr" multiple style="width: 100%;" :label-in-value="true" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 20">
              <Option v-for="item in taskTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 3">
                    <Option v-for="item in payBankList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContentArr" multiple style="width: 100%;" :label-in-value="true" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 30">
              <Option v-for="item in payBankList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 4">
                    <Option v-for="item in fundTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>

            <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true" @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 5">
                    <Option v-for="item in accountTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <Select v-model="searchForm.searchContentArr" multiple style="width: 100%;" :label-in-value="true" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 50">
              <Option v-for="item in accountTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
            <DatePicker v-model="searchForm.searchContent" type="date" placement="bottom" placeholder="选择日期" style="width: 100%;" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 6"></DatePicker>

            <input-company v-model="searchForm.searchContent" :alDisabled="searchForm.contentDisabled" v-if="searchForm.isDate == 7"></input-company>

             <Select v-model="searchForm.searchContent" style="width: 100%;" :label-in-value="true"  @on-change="categroryChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 8">
                    <Option value="0" label="否"></Option>
                    <Option value="1" label="是"></Option>
             </Select>
          </Form-item>
        </Col>
      </Row>
      </Col>
      <Col :sm="{span: 1, offset: 1}">
        <Button :id="sessionKey" type="primary" @click="addCondition" >新增</Button>
        <Button type="error" @click="delCondition" class="mt20" >删除</Button>
        <!--<Row>-->
          <!--<Col><Form-item>&nbsp;</Form-item></Col>-->
          <!--<Col>-->
            <!--<Button :id="sessionKey" type="primary" @click="addCondition"><Icon type="ios-arrow-forward"></Icon></Button>-->
          <!--</Col>-->
          <!--<Col><Form-item>&nbsp;</Form-item></Col>-->
        <!--</Row>-->
      </Col>
      <Col :sm="{span: 12, offset: 1}">
        <div class="showCondition">
          <!--<a href="javascript:;" :class="{'selected': index === currentSelectIndex}" @click="currentSelectIndex = index" v-for="(condition, index) in searchConditions">{{condition.desc}}</a>-->
          <!--<a href="javascript:;" :class="{'selected': index === currentSelectIndex}" @click="currentSelectIndex = index"-->
             <!--v-for="(condition, index) in searchConditions">{{condition.desc}}<Icon style="float:right;margin-top: 10px;" type="close" @click="delCondition(index)"/></a>-->
          <div :class="{'selected': index === currentSelectIndex}" v-for="(condition, index) in searchConditions" @click="currentSelectIndex = index">
            {{condition.desc}}
            <div style="position: absolute;bottom:-2.5px;right:-5px">
              <Button type="text" size="small" icon="close" @click="delCondition(index)"/>
            </div>
          </div>
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
  import {em_chooseField, em_relationship} from "../../../../assets/js/fund_manage/common_filed"
  import COMMON_METHODS from "../../../../assets/js/common_methods"
  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import dict from '../../../../api/dict_access/house_fund_dict'
  const chooseType = {
    field: 1001,
    relationship: 1002
  };

  export default {
    components: {InputAccount,InputCompany,InputCompanyName},
    props: {
      isLoading: {
        type: Boolean
      },
      showHandle: {
        type: Object
      },
      sessionKey: {
        type: String,
        required: true
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
          searchContentArr: [],
          isDate:0,
          searchContentDesc: "",
          disabled: false,
          contentDisabled: false
        },
        processStatusList: [],
        taskTypeList: [],
        payBankList: [],
        fundTypeList: [],
        accountTypeList: [],
        searchConditions: [],
        currentField: {},
        currentShip: {},
        currentSelectIndex: -1,
      }
    },
    async mounted() {

       var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

      var fu = sessionStorage.getItem(this.sessionKey + userInfo.userId);

      if(fu!=null)
      {
        this.searchConditions = JSON.parse(fu);
        if(this.showHandle.name!='noprogress')
        {
            for(var i=0;i<this.searchConditions.length;i++)
            {
               if(this.searchConditions[i].exec.indexOf('processStatus')!=-1)
               {
                    this.searchConditions.splice(i,1);
               }
            }
        }
      }

      this.loadDict();

      document.onkeyup = function(e) {
        var key = window.event.keyCode;
        if (key === 13) {
          if (sessionStorage.fundEmployeeOperatorTab === "noprocess") {
            document.getElementById("fundDaily").click()
          } else if (sessionStorage.fundEmployeeOperatorTab === "progressing") {
            document.getElementById("fundDailyP").click()
          } else if (sessionStorage.fundEmployeeOperatorTab === "finished") {
            document.getElementById("fundDailyF").click()
          } else if (sessionStorage.fundEmployeeOperatorTab === "refused") {
            document.getElementById("fundDailyR").click()
          } else {
            document.getElementById("fundDaily").click()
          }
        }
      }
    },
    methods: {
      // 选择字段或关系
      setOption(content, type){
        this.searchForm.contentDisabled = false;
        if (!content) return;

        if(type === chooseType.field) {
          this.searchForm.disabled = false;
          this.searchForm.relationshipValue = "";
          delete this.searchForm.relationship["包含"];

          if(content.value==='processStatus'){
            this.searchForm.isDate=1;
            this.searchForm.disabled = true;
            this.searchForm.relationshipValue = "=";
          }else if(content.value==='het.task_category'){
            this.searchForm.isDate=2;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='hcas.payment_bank'){
            this.searchForm.isDate=3;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='het.hf_type'){
            this.searchForm.isDate=4;
          }else if(content.value==='hcas.hf_account_type'){
            this.searchForm.isDate=5;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='het.submit_time'){
            this.searchForm.isDate=6;
          }else if(content.value==='sc.company_id'){
            this.searchForm.isDate=7;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='het.is_change' || content.value==='preInput'){
            this.searchForm.isDate=8;
            this.searchForm.disabled = true;
            this.searchForm.relationshipValue = "=";
          }else if(content.value === 'ee.employee_id') {
            this.searchForm.isDate=0;
            this.searchForm.relationship["包含"] = "in";
          }else{
            this.searchForm.isDate=0;
          }
          this.searchForm.searchContent="";
          this.searchForm.searchContentArr.length=0;
          this.currentField = content;
        } else {
          this.currentShip = content;

          if (this.currentShip && this.currentShip.value === "is null") {
            this.searchForm.contentDisabled = true;
          }

          if (this.currentShip && this.currentShip.value === "in") {
            if (this.searchForm.isDate===2 ||
              this.searchForm.isDate===3 ||
              this.searchForm.isDate===5
            ) {
              this.searchForm.isDate=this.searchForm.isDate * 10;
            }
          } else if (this.searchForm.isDate===20 ||
            this.searchForm.isDate===30 ||
            this.searchForm.isDate===50
          ) {
            this.searchForm.isDate=this.searchForm.isDate / 10;
          }
        }
      },
      addCondition() {
        if(COMMON_METHODS.IS_EMPTY(this.currentField) || COMMON_METHODS.IS_EMPTY(this.currentShip) ||
          (!this.searchForm.contentDisabled && COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent) && COMMON_METHODS.IS_EMPTY(this.searchForm.searchContentArr))) {
          this.$Message.error("请选择字段、关系并输入查询内容");
          return;
        } else {
          if(this.searchForm.isDate===6 && !COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent)){
            var d = new Date(this.searchForm.searchContent);
            var seperator1 = "-";
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var strDate = d.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            this.searchForm.searchContent=currentdate;
          }

          let searchConditionExec = '';
          let temp_searchContent = '';

          if (COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent)) {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value}`;
          } else {
            temp_searchContent = this.searchForm.searchContent.trim();
          }

          let searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${temp_searchContent}`;

          if(this.currentShip.value==='like'){
              temp_searchContent = '%' + temp_searchContent + '%';
          }

//          if(this.searchForm.isDate == 1||this.searchForm.isDate == 2||this.searchForm.isDate == 3||this.searchForm.isDate == 4||this.searchForm.isDate == 5||this.searchForm.isDate == 8)
//          {
//            searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${this.searchForm.searchContentDesc}`;
//          }

          if(
            this.searchForm.isDate === 1||
            this.searchForm.isDate === 2||
            this.searchForm.isDate === 3||
            this.searchForm.isDate === 4||
            this.searchForm.isDate === 5||
            this.searchForm.isDate === 8||
            this.searchForm.isDate === 20||
            this.searchForm.isDate === 30||
            this.searchForm.isDate === 50
          ) {
            searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${this.searchForm.searchContentDesc}`;
          }

//          var searchConditionExec = `${this.currentField.value} ${this.currentShip.value} '${temp_searchContent}'`;


          if (this.currentShip.value === "is null") {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value}`;
          } else if (this.currentShip.value === "in") {
            if (this.searchForm.isDate===20 ||
              this.searchForm.isDate===30 ||
              this.searchForm.isDate===50) {
              temp_searchContent = this.searchForm.searchContentArr.join();
              searchConditionExec = `${this.currentField.value} ${this.currentShip.value} (${temp_searchContent})`;
//            } else if (this.searchForm.isDate===70) {
//              temp_searchContent = this.searchForm.searchContentArr.join();
//              temp_searchContent = temp_searchContent.replace(/,/g, "','");
//              searchConditionExec = `${this.currentField.value} ${this.currentShip.value} ('${temp_searchContent}')`;
            } else {
              temp_searchContent = temp_searchContent.replace(/ *[,|\uff0c] */g, "','");
              searchConditionExec = `${this.currentField.value} ${this.currentShip.value} ('${temp_searchContent}')`;
            }
          } else if (
            this.searchForm.isDate === 1||
            this.searchForm.isDate === 2||
            this.searchForm.isDate === 3||
            this.searchForm.isDate === 4||
            this.searchForm.isDate === 5||
            this.searchForm.isDate === 8||
            this.searchForm.isDate === 20||
            this.searchForm.isDate === 30||
            this.searchForm.isDate === 50
          ) {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value} ${temp_searchContent}`;
          } else {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value} '${temp_searchContent}'`;
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
      delCondition(idx) {
        if(typeof idx === 'number' && idx !== -1) {
          this.searchConditions.splice(idx, 1);
        } else {
          if (this.currentSelectIndex === -1) {
            this.$Message.error("请先选中要删除的项");
          } else {
            this.searchConditions.splice(this.currentSelectIndex, 1);
          }
        }
      },
      resetForm(form) {
        this.$refs[form].resetFields();
        this.searchForm.searchContentArr=[];
        this.searchConditions = [];
      },
      searchEmploiees() {
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        window.sessionStorage.setItem(this.sessionKey + userInfo.userId, JSON.stringify(this.searchConditions));
        this.$emit("on-search", this.searchConditions);
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code === 200) {
            this.accountTypeList = data.data.SocialSecurityAccountType;
            this.processStatusList = data.data.ProcessPeriod;
            this.taskTypeList = data.data.HFLocalTaskCategory;
            this.taskTypeList.splice(7, 1); // 去除转移任务
            this.payBankList = data.data.PayBank;
            this.fundTypeList = data.data.FundType;
          }
        });
      },
      arrChange(option, selectedData) {
        this.searchForm.searchContentDesc = ''
        if (selectedData) {
          if (selectedData.length > 0) {
            let desc = '';
            selectedData.forEach((v, idx, arr) => {
              desc = desc.concat(v.label)
              desc = desc.concat(',')
            })
            this.searchForm.searchContentDesc = desc.substring(0, desc.length - 1);
          }
        } else if (option && option.length > 0) {
          let desc = '';
          option.forEach((v, idx, arr) => {
            desc = desc.concat(v.label)
            desc = desc.concat(',')
          })
          this.searchForm.searchContentDesc = desc.substring(0, desc.length - 1);
        }
      },
      categroryChange(option) {
        if (option) {
          this.searchForm.searchContentDesc = option.label;
        }
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
  /*.showCondition a {*/
    /*color: #2b85e4;*/
    /*line-height: 30px;*/
    /*display: block;*/
    /*height: 40px;*/
    /*padding: 5px;*/
    /*background: white;*/
  /*}*/
  /*.showCondition a:hover {*/
    /*color: white;*/
    /*background: #2b85e4;*/
  /*}*/
  /*.selected {*/
    /*color: white!important;*/
    /*background: #2b85e4!important;*/
  /*}*/
  .showCondition div {
    color: #2b85e4;
    position: relative;
    padding: 5px;
  }
  .showCondition div:hover {
    color: white;
    background: #5bc0de;
  }
  .showCondition div:hover div {
    background: transparent;
  }

  .showCondition i {
    color: red;
  }
  .showCondition i:hover {
    color: white;
  }
  .selected {
    color: white!important;
    background: #2b85e4!important;
  }
</style>
