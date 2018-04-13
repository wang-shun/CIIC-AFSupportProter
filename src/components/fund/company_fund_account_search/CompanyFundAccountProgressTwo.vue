<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账号信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：">
                  <Select v-model="companyFundAccount.paymentBank" style="width: 100%;" transfer :disabled="isCanEdit">
                    <Option v-for="(value,key) in this.baseDic.hfPaymentBank" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款方式：">
                  <Select v-model="companyFundAccount.paymentWay" style="width: 100%;" transfer :disabled="isCanEdit">
                    <Option v-for="(value,key) in this.baseDic.hfPaymentWay" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业基本公积金账户：">
                  <Input v-model="companyFundAccount.basicComAccount" placeholder="" :disabled="isCanEditBase"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业补充公积金账户：">
                  <Input v-model="companyFundAccount.compensativeComAccount" placeholder="" :disabled="isCanEditBuchong"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="U盾代管情况：">
                  <Select v-model="companyFundAccount.ukeyStore" style="width: 100%;" transfer :disabled="isCanEdit">
                    <Option v-for="(value,key) in this.baseDic.hfUkeyStore" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="每月关账日：">
                  <Input v-model="companyFundAccount.closeDay" placeholder="请输入..." :disabled="isCanEdit"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费起始年月：">
                  <DatePicker v-model="companyFundAccount.comStartMonth" type="month"  placement="bottom" placeholder="选择日期" style="width: 100%;" transfer :disabled="isCanEdit"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="备注：">
                  <Input v-model="companyFundAccount.remark" placeholder="请输入..." :disabled="isCanEdit"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="">
                  <CheckboxGroup v-model="companyFundAccount.tmpStore" :disabled="isCanEdit">
                    <Checkbox label="基本暂保管" :disabled="isCanEditBase"></Checkbox>
                    <Checkbox label="补充暂保管" :disabled="isCanEditBuchong"></Checkbox>
                  </CheckboxGroup>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        企业公积金账号绑定公司列表
        <div slot="content">
          <company-fund-account-bind-list :accountBindCompanyData="accountBindCompanyData"></company-fund-account-bind-list>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Button type="info" @click="submitForm" :disabled="isCanEdit">保存</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import api from '../../../api/house_fund/company_fund_account_search/company_fund_account_search'
  import companyFundAccountInfoAndOperate from "../common/CompanyFundAccountInfoAndOperate.vue"
  import companyFundAccountBindList from "../common/CompanyFundAccountBindList.vue"
  import Tools from '../../../lib/tools'  
  export default {
    components: {companyFundAccountInfoAndOperate, companyFundAccountBindList},
    data() {
      return {
        collapseInfo: [1, 2],
        fundAccountInfo: {},
        isCanEdit: true,
        isCanEditBuchong:true,
        isCanEditBase:true,
        companyFundAccount:{},
        accountBindCompanyData: []
      }
    },
    mounted() {
      this.fundAccountInfo = JSON.parse(window.sessionStorage.getItem('fundAccountInfo'));
      console.log(this.fundAccountInfo);
      this.isCanEdit = this.fundAccountInfo.isCanUpdate;
      if(this.isCanEdit==false){
         this.isCanEditBase=this.fundAccountInfo.hfType==1?false:true;
         this.isCanEditBuchong=this.fundAccountInfo.hfType==2?false:true;
      }else{
         this.isCanEditBase=false;
         this.isCanEditBuchong=false;
      }
      
      this.getDetail();
      this.getList();
    },
    methods: {
      getDetail() {
        let params = {};
        params['comAccountId'] = this.fundAccountInfo.comAccountId;
        params['hfType'] = this.fundAccountInfo.hfType;
        api.conFundAccountDetail({
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.companyFundAccount = data.data;
            this.companyFundAccount.hfType=this.fundAccountInfo.hfType;
            this.companyFundAccount.comAccountId=this.fundAccountInfo.comAccountId;
            this.companyFundAccount.comAccountClassId=this.fundAccountInfo.comAccountClassId;
            
            let tmpStore = [];
            if (parseInt(this.companyFundAccount.basicAccountTempStore)) {
              tmpStore.push('基本暂保管');
            }
            if (parseInt(this.companyFundAccount.compensativeAccountTempStore)) {
              tmpStore.push('补充暂保管');
            }
            this.companyFundAccount['tmpStore'] = tmpStore;
          }
        })
      },
      getList() {
        let params = {};
        params['comAccountId'] = this.fundAccountInfo.comAccountId;
        params['hfType'] = this.fundAccountInfo.hfType;
        api.companyFundAccount({
          params: params,
        }).then(data => {
          if (data.code == 200) {
            console.log(data.data)
            this.accountBindCompanyData = data.data;
          }
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      submitForm(){
        let params = {};
        params=this.companyFundAccount;
         if(params.comStartMonth!=''){
           params.comStartMonthValue= Tools.formatDate(params.comStartMonth, "YYYYMM");
         }
        api.companyFundAccountSubmit(params).then(
          data=>{
            if(data.code == 200){
              this.$Message.success(data.message);
            }else{
              this.$Message.error(data.message);
            }
          }
        )
      },
    }
  }
</script>
