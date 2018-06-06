<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="acceptanceRules" :label-width="140">
        <Row class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="业务顾问：">
              <span class="expand-value">{{this.employeeInfo.employeeName}}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员编号：">
              <span class="expand-value">{{this.employeeInfo.employeeId}}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员姓名：">
              <span class="expand-value">{{this.employeeInfo.employeeName}}</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="证件号码：">
              <span class="expand-value">310105198505305026</span>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="退保日期：" prop="surrenderDate">
              <DatePicker type="date" v-model="formItem.surrenderDate" placeholder="请输入"
                          style="width: 100%"></DatePicker>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="中止日期：" prop="dimissionDate">
              <DatePicker type="date" v-model="formItem.dimissionDate" placeholder="请输入"
                          style="width: 100%"></DatePicker>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="款项类型：" prop="moneyType">
              <Select v-model="formItem.moneyType" placeholder="请选择" :clearable="true">
                <Option v-for="item in moneyTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理类型：" prop="caseType">
              <Select v-model="formItem.caseType" placeholder="请选择" :clearable="true">
                <Option v-for="item in caseTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="连带人：" prop="jointPersonName">
              <Select v-model="formItem.jointPersonName" placeholder="请输入" :clearable="true">
                <Option v-for="item in jointPersonNameList" :value="item.name" :key="item.empMemberId">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="连带人出生日期：" prop="jointPersonBirthDate">
              <DatePicker v-model="formItem.jointPersonBirthDate" type="date" placeholder="请输入"
                          style="width: 100%"></DatePicker>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理金额：" prop="caseMoney">
              <InputNumber :min="1" v-model="formItem.caseMoney" style="width: 100%"></InputNumber>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="发票张数：" prop="invoiceNumber">
              <InputNumber :min="1" v-model="formItem.invoiceNumber" style="width: 100%"></InputNumber>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="医疗备注：" prop="medicalRemark">
              <Input type="textarea" v-model="formItem.medicalRemark" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入..."/>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="back">返回</Button>
          <Button type="primary" @click="addAcceptance" :loading="loading">提交</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'
  import apiAjax from "../../../data/health_medical/uninsured_application.js";

  export default {
    data() {
      return {
        loading: false,
        formItem: {
          surrenderDate: null,
          dimissionDate: null,
          moneyType: null,
          caseType: '1',
          jointPersonName: null,
          jointPersonBirthDate: null,
          caseMoney: null,
          invoiceNumber: null,
          medicalRemark: null,
        },
        employeeInfo: {
          employeeId: null,
          employeeName: null,
          companyId: null,
          companyName: null,
        },
        moneyTypes: admissibility.moneyTypes,
        caseTypes: admissibility.caseTypes,
        /** 连带人后台加载*/
        jointPersonNameList: [],
        acceptanceRules: admissibility.addAcceptanceRules,
      };
    },
    created() {
      //雇员数据
      this.employeeInfo = JSON.parse(sessionStorage.getItem('acceptanceEmployee'));
      this.queryEmpMember();
    },
    methods: {
      queryEmpMember() {
        apiAjax.queryEmpMember(this.employeeInfo).then(response => {
          this.jointPersonNameList = response.data.object;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      addAcceptance() {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            let addData = this.formItem;
            addData.employeeId = this.employeeInfo.employeeId;
            addData.employeeName = this.employeeInfo.employeeName;
            addData.companyId = this.employeeInfo.companyId;
            addData.companyName = this.employeeInfo.companyName;
            this.loading = true;
            apiAjax.addAcceptance(addData).then(response => {
              this.loading = false;
              if (response.data.code === 200) {
                this.$router.push({name: "addAcceptanceEmployeeList"})
              } else {
                this.$Message.error("服务器异常，请稍后再试:");
              }
            }).catch(e => {
              console.info(e.message);
              this.$Message.error("服务器异常，请稍后再试");
            });
          }
        });
      },
      back() {
        this.$local.back();
      },
    },
  }
</script>
