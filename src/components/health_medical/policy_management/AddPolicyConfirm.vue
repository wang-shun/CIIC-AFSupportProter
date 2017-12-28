<template>
  <div class="InsurancePolicyNumCostConfirmList">
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
              <Form-item label="缴费年月：">
                <span class="expand-value">2017-08</span>
              </Form-item>
            </Form>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>

    <div class="floatRightBtns">
      <router-link to="/AddPolicy">
        <Button type="primary" size="large">上一步</Button>
      </router-link>
      <Button type="primary" size="large" @click="exportData(1)" icon="ios-download-outline">导出数据</Button>
      <Button type="primary" size="large" @click="exportData(1)">导入数据</Button>
    </div>

    <Table border :columns="columns7" :data="data6"></Table>

    <div>
      <Form :model="formItem" :label-width="100">
        <Row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="总人数：">
            <span class="expand-value">70000</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="保费总额：">
            <span class="expand-value">1，400，000</span>
          </Form-item>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="代理费总人数：">
            <span class="expand-value">5，000</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="代理费总额：">
            <span class="expand-value">10，000</span>
          </Form-item>
          </Col>
        </row>
      </Form>
    </div>
    <div class="tc">
      <router-link to="/policyManagement">
        <Button type="primary">确认</Button>
      </router-link>
    </div>
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
          },
          {
            title: '保费',
            sortable: true,
            key: 'fee'
          },
          {
            title: '代理费',
            sortable: true,
            key: 'fee2'
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
            jointandseveralPeople: '2016-02-16',
            fee: '30',
            fee2: '5'
          },
          {
            acceptanceId: '11L2675',
            employeeId: '张敏',
            employeeName: '13684',
            companyId: '苹果公司',
            companyName: '子女',
            Type: '70000',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            jointandseveralPeople: '2016-02-16',
            fee: '30',
            fee2: '0'
          },
          {
            acceptanceId: '11L2676',
            employeeId: '李敏',
            employeeName: '13684',
            companyId: '苹果公司',
            companyName: '子女',
            Type: '70000',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            jointandseveralPeople: '2016-02-16',
            fee: '30',
            fee2: '2'
          }
        ],
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
