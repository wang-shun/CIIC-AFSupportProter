<template>
  <div class="smList" style="height: 850px;margin-left: 1px">
    <Collapse value="1" v-model="collapseInfo">
      <Panel name="1">
        个人社保登记表查询条件
        <div slot="content">
          <Form :model="queryForm" :label-width=150>
            <Row justify="start">
              
              <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员社保序号起" prop="ssSerialStart">
                <Input placeholder="请输入" v-model.trim="queryForm.ssSerialStart" :maxlength="20"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员社保序号止" prop="ssSerialEnd">
                <Input placeholder="请输入" v-model.trim="queryForm.ssSerialEnd" :maxlength="20"></Input>
              </FormItem>
              </Col>-->

              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户编号" prop="companyId">
                 <input-company v-model="queryForm1.companyId"></input-company>
              </FormItem>
              </Col> 
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeId">
                <Input placeholder="请输入" v-model.trim="queryForm1.employeeId" :maxlength="20"></Input>
              </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保状态：" prop="archiveTaskStatus">
                 <Select v-model="queryForm.archiveTaskStatus" style="width: 100%;" transfer>
                    <Option v-for="item in sSecurityStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
              </Form-item>
              </Col> -->
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="操作员：" prop="operator">
                <Select filterable clearable v-model.trim="queryForm.operator">
                  <Option v-for="item in operatorList" :value="item" :key="item"
                          :label="item">
                  </Option>
                </Select>
              </Form-item>
              </Col> -->
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
              <Button type="primary" @click="exportRegisterForm">导出个人社会保险登记表</Button>
              <!-- <Button type="primary" @click="exportChangeDeclarationForm">导出社会保险业务变更项目申报表</Button> -->
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

      <Panel name="2">
        保险业务变更项目申报表查询条件
        <div slot="content">
          <Form :model="queryForm" :label-width=150>
            <Row justify="start">
            <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业社保登记码" prop="comAccount">
            
                <input-account v-model="queryForm2.ssAccount" @listenToChildEvent="listenToChild"></input-account>
              </FormItem>

              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员社保序号起" prop="ssSerialBegin">
                <Input placeholder="请输入" v-model.trim="queryForm2.ssSerialBegin" :maxlength="20"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员社保序号止" prop="ssSerialEnd">
                <Input placeholder="请输入" v-model.trim="queryForm2.ssSerialEnd" :maxlength="20"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户编号" prop="companyId">
                 <input-company v-model="queryForm2.companyId"></input-company>
              </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeId">
                <Input placeholder="请输入" v-model.trim="queryForm2.employeeId" :maxlength="20"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保状态：" prop="socialSecurityStatus">
                 <Select v-model="queryForm2.archiveTaskStatus" style="width: 100%;" transfer>
                    <Option v-for="item in sSecurityStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
              </Form-item>
              </Col>
               
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
              <!-- <Button type="primary" @click="exportRegisterForm">导出个人社会保险登记表</Button> -->
              <Button type="primary" @click="exportChangeDeclarationForm">导出社会保险业务变更项目申报表</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import api from '../../../../api/social_security/employee_operator'
  import dict from '../../../../api/dict_access/social_security_dict'
  import InputCompany from '../../../common_control/form/input_company'
  import InputAccount from '../../../common_control/form/input_account'

  export default {
    components: {InputAccount,InputCompany},
    data() {
      return {
        changeContentList: [],
        socialSecurityStatusList: [],
        operatorList: [],
        queryForm1: {},
        queryForm2: {},
        collapseInfo: [1, 2],
        sSecurityStateList: [ //1-已办  2-已做 3-转出
          {value: '', label: '全部'},
          {value: '1', label: '已办'},
          {value: '2', label: '已做'},
          {value: '3', label: '转出'},
        ], //社保状态
      }
    },
    mounted() {
      this.loadDict();
    },
    methods: {
      exportRegisterForm() {
        if(this.queryForm1.companyId==null || this.queryForm1.companyId==''){
            this.$Message.info('请选择客户编号');
            return false;
        }
        if(this.queryForm1.employeeId==null || this.queryForm1.employeeId==''){
            this.$Message.info('请输入雇员编号');
            return false;
        }
        api.exportRegisterForm(this.queryForm1)
      },
      exportChangeDeclarationForm() {
        if(this.queryForm2.ssAccount==null || this.queryForm2.ssAccount==''){
            this.$Message.info('请选择企业社保登记码');
            return false;
        }
        api.exportChangeDeclarationForm(this.queryForm2)
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
          }
        });
      },
    }
  }
</script>
