<template>
  <div class="InsurancePolicyNumEmpList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保险公司">
                <span class="expand-value">上海人寿保险股份有限公司</span>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保单名称">
                <span class="expand-value">补充医疗大保单</span>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保单号">
                <span class="expand-value">补充医疗大保单2017</span>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="缴费年月">
                <Select placeholder="选择缴费年月">
                  <Option value="0">全部</Option>
                  <Option value="1">2017-11</Option>
                  <Option value="1">2017-10</Option>
                  <Option value="1">2017-09</Option>
                  <Option value="2">2017-08</Option>
                </Select>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 20, offset: 0 }" class="checkBtn">


            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <div class="floatRightBtns">
      <Button type="primary" size="large" @click="exportData(1)" icon="ios-download-outline">导出数据</Button>
      <router-link to="/policyManagement">
        <Button type="primary">上一步</Button>
      </router-link>
      <router-link to="/addPolicyConfirm">
        <Button type="primary">下一步</Button>
      </router-link>
    </div>
    <br>
    <Tabs :animated="false">
      <TabPane label="有效名单">
        <Table border :columns="columns7" :data="data6"></Table>
      </TabPane>
      <TabPane label="加保">
        <Table border :columns="columns17" :data="data16"></Table>
      </TabPane>
      <TabPane label="减保">
        <Table border :columns="columns1" :data="data1"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: '1',
        formItem: {
          input: '',
          select: '',
          select1: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        },
        columns7: [
          {
            title: '雇员编号',
            sortable: true,
            key: 'acceptanceId'
          },
          {
            title: '雇员姓名',
            sortable: true,
            key: 'employeeId'
          },
          {
            title: '公司编号',
            sortable: true,
            key: 'employeeName'
          },
          {
            title: '公司名称',
            sortable: true,
            key: 'companyId'
          },
          {
            title: '类型',
            sortable: true,
            key: 'companyName'
          },
          {
            title: '连带人',
            sortable: true,
            key: 'Type'
          },
          {
            title: '受理人',
            sortable: true,
            key: 'MoneyType'
          },
          {
            title: '投保日期',
            sortable: true,
            key: 'acceptancePeople'
          }
        ],
        data6: [
          {
            acceptanceId: '11L2674',
            employeeId: '戴敏',
            employeeName: '13684',
            companyId: '苹果公司',
            companyName: '子女',
            Type: '70000',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            jointandseveralPeople: '2016-02-16'
          },
          {
            acceptanceId: '11L2674',
            employeeId: '戴敏',
            employeeName: '13684',
            companyId: '苹果公司',
            companyName: '子女',
            Type: '70000',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            jointandseveralPeople: '2016-02-16'
          },
          {
            acceptanceId: '11L2674',
            employeeId: '戴敏',
            employeeName: '13684',
            companyId: '苹果公司',
            companyName: '子女',
            Type: '70000',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            jointandseveralPeople: '2016-02-16'
          }
        ],
        columns1: [
          {
            title: '雇员编号',
            sortable: true,
            key: 'acceptanceId'
          },
          {
            title: '雇员姓名',
            sortable: true,
            key: 'employeeId'
          },
          {
            title: '公司编号',
            sortable: true,
            key: 'employeeName'
          },
          {
            title: '公司名称',
            sortable: true,
            key: 'companyId'
          },
          {
            title: '类型',
            sortable: true,
            key: 'companyName'
          },
          {
            title: '连带人',
            sortable: true,
            key: 'Type'
          },
          {
            title: '受理人',
            sortable: true,
            key: 'MoneyType'
          },
          {
            title: '投保日期',
            sortable: true,
            key: 'acceptancePeople'
          },
          {
            title: '退保日期',
            sortable: true,
            key: 'acceptancePeople1'
          }
        ],
        data1: [
          {
            acceptanceId: '11L2674',
            employeeId: '戴敏',
            employeeName: '13684',
            companyId: '苹果公司',
            companyName: '子女',
            Type: '戴敏丽',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            acceptancePeople: '2016-02-16',
            acceptancePeople1: '2016-12-16'
          }
        ]
      }
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        })
      },
      remove(index) {
        this.data6.splice(index, 1);
      }
    }
  }

</script>
<style scoped>
  .ivu-card {
    background: rgba(246, 246, 246, 1);
  }

  .checkBtn .ivu-btn {
    float: right;
  }
</style>
