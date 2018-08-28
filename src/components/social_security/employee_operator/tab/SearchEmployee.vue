<template>
  <Form :model="searchForm" ref="searchForm" :label-width="60" :id="sessionKey" @submit.native.prevent>
    <Row justify="start">
      <Col :sm="{span: 9}">
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
          <Form-item label="查询内容" prop="searchContent" v-if="searchForm.isDate != 20 && searchForm.isDate != 50 && searchForm.isDate != 70 && searchForm.isDate != 9">
            <Input v-model="searchForm.searchContent" placeholder="请输入" :maxlength=128 :disabled="searchForm.contentDisabled" v-if="searchForm.isDate == 0 || searchForm.isDate == 30 || searchForm.isDate == 40" />
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
          <Form-item label="查询内容" prop="searchContentArr" v-if="searchForm.isDate == 20 || searchForm.isDate == 50 || searchForm.isDate == 70 || searchForm.isDate == 9">
            <Select v-model="searchForm.searchContentArr" multiple style="width: 100%;" :label-in-value="true" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 20">
              <Option v-for="item in ssAccountTypedict" :value="item.key" :key="item.key" :label="item.value"></Option>
            </Select>
            <Select v-model="searchForm.searchContentArr" multiple style="width: 100%;" :label-in-value="true" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer  v-if="searchForm.isDate == 50">
              <Option v-for="item in taskCategorydict" :value="item.key" :key="item.key" :label="item.value"></Option>
            </Select>
            <Select v-model="searchForm.searchContentArr" multiple style="width: 100%;" :label-in-value="true" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 70">
              <Option v-for="(value,key) in this.baseDic.dic_settle_area" :value="value" :key="key">{{value}}</Option>
            </Select>
            <Cascader :data="serviceCenterData" v-model="searchForm.searchContentArr" trigger="hover" @on-change="arrChange" :disabled="searchForm.contentDisabled" transfer v-if="searchForm.isDate == 9"></Cascader>

          </Form-item>
        </Col>


      </Row>
      </Col>
      <Col :sm="{span: 1, offset: 1}">
        <Button :id="sessionKeyAdd" type="primary" @click="addCondition" >新增</Button>
        <Button type="error" @click="delCondition" class="mt20" >删除</Button>
      </Col>
      <Col :sm="{span: 12, offset: 1}">
        <div class="showCondition">
          <div :class="{'selected': index === currentSelectIndex}" v-for="(condition, index) in searchConditions" @click="currentSelectIndex = index">
            <!--<a href="javascript:;">-->
              {{condition.desc}}
            <!--</a>-->
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
  import {em_chooseField, em_relationship} from "../../../../assets/js/social_manage/common_filed"
  import COMMON_METHODS from "../../../../assets/js/common_methods"
  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import dict from '../../../../api/dict_access/social_security_dict'
  import api from '../../../../api/social_security/employee_operator'
  import tableStyle from '../../../../api/table_style'

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
      },
      sessionKeyAdd: {
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
//        searchContentProp: "searchContent",
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
        searchConditions: [],
        currentField: {},
        currentShip: {},
        currentSelectIndex: -1,
        serviceCenterData: [],
        leaderShipData: []
      }
    },
    created() {
      this.initOptions();
    },
    async mounted() {
//      this.initOptions();
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

      let fu = sessionStorage.getItem(this.sessionKey + userInfo.userId);

      if(fu!=null)
      {
        this.searchConditions = JSON.parse(fu);
        if(sessionStorage.employeeOperatorTab !== "noprogress")
        {
            for(let i=0;i<this.searchConditions.length;i++)
            {
               if(this.searchConditions[i].exec.indexOf('taskStatus')!=-1)
               {
                    this.searchConditions.splice(i,1);
               }
            }
        }
      }

      this.loadDict();
      this.getServiceCenters();
//      this.getLeadserShips();

      document.onkeyup = function(e) {
        let key = window.event.keyCode;
        if (key === 13) {
          if (sessionStorage.employeeOperatorTab === "noprogress") {
            document.getElementById("socialDailyAdd").click()
          } else if (sessionStorage.employeeOperatorTab === "progressing") {
            document.getElementById("socialDailyPAdd").click()
          } else if (sessionStorage.employeeOperatorTab === "finished") {
            document.getElementById("socialDailyFAdd").click()
          } else if (sessionStorage.employeeOperatorTab === "refused") {
            document.getElementById("socialDailyRAdd").click()
          } else {
            document.getElementById("socialDailyAdd").click()
          }
        }
      }
    },
    methods: {
      initOptions() {
        if(sessionStorage.employeeOperatorTab && sessionStorage.employeeOperatorTab !== "noprogress")
        {
          delete this.searchForm.chooseField["taskStatus"];
        } else {
          this.searchForm.chooseField["taskStatus"] = "未处理";
        }
      },
      getServiceCenters(){
        let params = null;
        api.getCustomers({params:params}).then(data=>{
          this.serviceCenterData = data.data;
        })
      },
//      getLeadserShips(){
//        let params = null;
//        api.getTeams({params:params}).then(data=>{
//          this.leaderShipData = data.data;
//        })
//      },
      // 选择字段或关系
      setOption(content, type){
        this.searchForm.contentDisabled = false;
        this.searchForm.searchContentDesc='';
        this.searchForm.searchContent="";
        this.searchForm.searchContentArr.splice(0, this.searchForm.searchContentArr.length);
//        let divElements = tableStyle.getByClass(document, "ivu-tag-checked");
//        if (divElements && divElements.length > 0) {
//          let parentElement = divElements[0].parentNode;
//
//          for (let i = divElements.length - 1; i >= 0; i--) {
//            parentElement.removeChild(divElements[i]);
//          }
//        }
        if (!content) return;

        if(type === chooseType.field) {
          this.searchForm.disabled = false;
          this.searchForm.relationshipValue = "";
          this.currentShip = {};
          delete this.searchForm.relationship["包含"];

          if(content.value.indexOf("month")>0){
            this.searchForm.isDate=1;
          }else if(content.value==='ca.ss_account_type'){
            this.searchForm.isDate=2;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='ca.ss_account'){
            this.searchForm.isDate=3;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='c.company_id'){
            this.searchForm.isDate=4;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='et.task_category'){
            this.searchForm.isDate=5;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value==='c.title'){
            this.searchForm.isDate=6;
          }else if(content.value==='ca.settlement_area'){
            this.searchForm.isDate=7;
            this.searchForm.relationship["包含"] = "in";
          }else if(content.value === 'taskStatus') {
            this.searchForm.isDate = 8;
            this.searchForm.disabled = true;
            this.searchForm.relationshipValue = "=";
            this.currentShip.value = "=";
            this.currentShip.label = "等于";
          }else if(content.value === 'e.employee_id') {
            this.searchForm.isDate = 0;
            this.searchForm.relationship["包含"] = "in";
          }else if (content.value === 'et.service_center_id') {
            this.searchForm.isDate = 9;
          }else{
            this.searchForm.isDate=0;
          }

          this.currentField = content;
        } else {
          this.currentShip = content;

          if (this.currentShip && this.currentShip.value === "is null") {
            this.searchForm.contentDisabled = true;
          }

          if (this.currentShip && this.currentShip.value === "in") {
            if (this.searchForm.isDate===2 ||
              this.searchForm.isDate===3 ||
              this.searchForm.isDate===4 ||
              this.searchForm.isDate===5 ||
              this.searchForm.isDate===7
            ) {
              this.searchForm.isDate=this.searchForm.isDate * 10;
            }
          } else if (this.searchForm.isDate===20 ||
            this.searchForm.isDate===30 ||
            this.searchForm.isDate===40 ||
            this.searchForm.isDate===50 ||
            this.searchForm.isDate===70
          ) {
            this.searchForm.isDate=this.searchForm.isDate / 10;
          }
        }
      },
      addCondition() {
        if(COMMON_METHODS.IS_EMPTY(this.currentField) || COMMON_METHODS.IS_EMPTY(this.currentShip) ||
          (!this.searchForm.contentDisabled && COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent) && COMMON_METHODS.IS_EMPTY(this.searchForm.searchContentArr))) {
          this.$Message.error("请选择字段、关系并输入查询内容");
        } else {
          if(this.searchForm.isDate===1 && !COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent)){
            let d = new Date(this.searchForm.searchContent);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            this.searchForm.searchContent= year + month;
          }

          let searchConditionExec = '';
          let temp_searchContent = '';

          if (COMMON_METHODS.IS_EMPTY(this.searchForm.searchContent)) {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value}`;
          } else {
            temp_searchContent = this.searchForm.searchContent.trim();
          }

          if (this.searchForm.isDate === 9) {
            temp_searchContent = this.searchForm.searchContentArr[0];
          }

          let searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${temp_searchContent}`;

          if(this.currentShip.value==='like'){
            temp_searchContent = '%' + temp_searchContent + '%';
          }

          if(
            this.searchForm.isDate === 2||
            this.searchForm.isDate === 5||
            this.searchForm.isDate === 7||
            this.searchForm.isDate === 8||
            this.searchForm.isDate === 9||
            this.searchForm.isDate === 20||
            this.searchForm.isDate === 50||
            this.searchForm.isDate === 70)
          {
            searchConditionDesc = `${this.currentField.label} ${this.currentShip.label} ${this.searchForm.searchContentDesc}`;
          }

          if (this.currentShip.value === "is null") {
            searchConditionExec = `${this.currentField.value} ${this.currentShip.value}`;
          } else if (this.currentShip.value === "in") {
            if (this.searchForm.isDate===20 ||
              this.searchForm.isDate===50) {
              temp_searchContent = this.searchForm.searchContentArr.join();
              searchConditionExec = `${this.currentField.value} ${this.currentShip.value} (${temp_searchContent})`;
            } else if (this.searchForm.isDate===70) {
              temp_searchContent = this.searchForm.searchContentArr.join();
              temp_searchContent = temp_searchContent.replace(/,/g, "','");
              searchConditionExec = `${this.currentField.value} ${this.currentShip.value} ('${temp_searchContent}')`;
            } else {
              temp_searchContent = temp_searchContent.replace(/ *[,|\uff0c] */g, "','");
              searchConditionExec = `${this.currentField.value} ${this.currentShip.value} ('${temp_searchContent}')`;
            }
          } else if (
            this.searchForm.isDate === 2||
            this.searchForm.isDate === 5||
            this.searchForm.isDate === 8||
            this.searchForm.isDate === 9||
            this.searchForm.isDate === 20||
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
        this.searchConditions=[];
      },
      searchEmploiees() {
         let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
         window.sessionStorage.setItem(this.sessionKey + userInfo.userId, JSON.stringify(this.searchConditions));
         this.$emit("on-search", this.searchConditions);
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code === 200) {
            this.taskCategorydict = data.data.SOCLocalTaskCategory;
            this.ssAccountTypedict = data.data.SocialSecurityAccountType;
          }
        });
      },
      categroryChange(option) {
        if (option) {
          this.searchForm.searchContentDesc = option.label;
        }
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
  .showCondition div {
    color: #2b85e4;
    position: relative;
    /*line-height: 30px;*/
    /*display: block;*/
    /*height: 40px;*/
    padding: 5px;
    /*background: white;*/
  }
  /*.showCondition a {*/
    /*color: #2b85e4;*/
    /*!*background: white;*!*/
  /*}*/
  .showCondition div:hover {
    color: white;
    background: #5bc0de;
  }
  .showCondition div:hover div {
    background: transparent;
  }
  /*.showCondition div:hover a {*/
    /*color: white;*/
    /*!*background: #2b85e4;*!*/
  /*}*/

  .showCondition i {
    color: red;
    /*background: white;*/
  }
  .showCondition i:hover {
    color: white;
    /*background: red;*/
  }
  .selected {
    color: white!important;
    background: #2b85e4!important;
  }
  /*.selected a {*/
    /*color: white!important;*/
  /*}*/
</style>
