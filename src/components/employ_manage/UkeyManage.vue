<template>
<div class="smList">
<Collapse v-model="collapseInfo">
<Panel name="1">
  Ukey管理 新增
  <div slot="content">
  <Form :label-width=150 ref="uekyFile" :model="uekyFile">
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="Ukey类别：">
          <Select transfer v-model="uekyFile.keyType">
              <Option v-for="item in transferFeedbackList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="Ukey编号：">
        <Input  placeholder="请输入..." v-model="uekyFile.keyCode" :maxlength="9" ></Input>
      </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="档案部UKey密码：">
          <Input placeholder="请输入..." v-model="uekyFile.keyPwd"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="Ukey状态：">
          <Select transfer v-model="uekyFile.keyStatus" @on-change="changeStatus">
              <Option v-for="item in UkeyStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="Ukey序列号：">
          <Input placeholder="请输入..." v-model="uekyFile.keySeq" :maxlength="50"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="费用：">
          <Input placeholder="请输入..." v-model="uekyFile.keyFee" :maxlength="18"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="已绑定公司编号：">
          <input-company v-model="uekyFile.companyId"></input-company>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="已绑定公司：">
          <input-company-name v-model="uekyFile.companyName"></input-company-name>
        </Form-item>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="doSave">保存</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
  </div>
  </Panel>
</Collapse>
</div>
</template>
<script>

import Utils from '../../lib/utils'
import api from '../../api/employ_manage/hire_operator'
import customerModal from '../common_control/CustomerModal.vue'
import InputCompanyName from '../common_control/form/input_company/InputCompanyName.vue'
import InputCompany from '../common_control/form/input_company'
import Vue from 'vue'
  export default {
    components: {customerModal,InputCompanyName,InputCompany},
    data() {
      return {
        collapseInfo: [1], //展开栏
        docTypeList: [],
        isFast: true,
        oldCompanyId: '',
        OldCompanyName: '',
        uekyFile: {
          id: '',
          keyType: '',
          keyCode: '',
          keySeq: '',
          keyPwd: '',
          keyStatus: '',
          keyFee: '',
          companyId: '',
          companyName: ''
        },
        transferFeedbackList: [
          {value:'空',label:'空'},
          {value:'已告知本人转档',label:'已告知本人转档'},
          {value:'无档自查',label:'无档自查'},
          {value:'浦东职介代管',label:'浦东职介代管'},
          {value:'黄浦职介代管',label:'黄浦职介代管'},
          {value:'长宁职介代管',label:'长宁职介代管'},
          {value:'静安职介代管',label:'静安职介代管'},
          {value:'普陀职介代管',label:'普陀职介代管'},
          {value:'虹口职介代管',label:'虹口职介代管'},
          {value:'金桥职介代管',label:'金桥职介代管'},
          {value:'徐汇职介代管',label:'徐汇职介代管'},
          {value:'档在高招办',label:'档在高招办'}
        ],
        UkeyStatusList: [
          {value:'空',label:'空'},
          {value:'已绑定公司',label:'已绑定公司'},
          {value:'未绑定公司',label:'未绑定公司'}
        ],
      }
    },
    mounted() {

      this.uekyFile.id = this.$route.query.id;
      this.uekyFile.keyType = this.$route.query.keyType;
      this.uekyFile.keyCode = this.$route.query.keyCode;
      this.uekyFile.keySeq = this.$route.query.keySeq;
      this.uekyFile.keyPwd = this.$route.query.keyPwd;
      this.uekyFile.keyStatus = this.$route.query.keyStatus;
      this.uekyFile.keyFee = this.$route.query.keyFee;
      this.uekyFile.companyId = this.$route.query.companyId;
      this.uekyFile.companyName = this.$route.query.companyName;
      this.oldCompanyId = this.$route.query.companyId;
      this.OldCompanyName = this.$route.query.companyName;
    }
    ,
    methods: {
      changeStatus(val){
        if(this.isFast){
          this.isFast = false;
          return;
        }
        if(val == "空" || val == "未绑定公司"){
          Vue.set(this.uekyFile,'companyId','');
          Vue.set(this.uekyFile,'companyName','');
        }else if(val == "已绑定公司"){
          Vue.set(this.uekyFile,'companyId',this.oldCompanyId);
          Vue.set(this.uekyFile,'companyName',this.OldCompanyName);
        }
      },
      doSave(){

        // if(this.uekyFile.employeeIdcardNo == '' || this.uekyFile.employeeIdcardNo == undefined){
        //   this.$Message.error("身份证必须填写！");
        //   return;
        // }
        var fromData = this.$utils.clear(this.uekyFile,'');
        api.saveAmArchiveUkey(fromData).then(data => {
          if (data.code == 200) {
            this.$Message.success("保存成功");
          } else {
            this.$Message.error("保存失败！" + data.message);
          }
        })

        this.$router.go(-1);
      },
      goBack () {
        this.$router.go(-1);
      },

    }
  }
</script>
