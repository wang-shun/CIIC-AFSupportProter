<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" :label-width="100">
            <Row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="保险公司">
                <Select placeholder="选择保险公司">
                  <Option value="0">全部</Option>
                  <Option value="1">中智</Option>
                  <Option value="2">中国平安</Option>
                  <Option value="3">天安人寿保险股份有限公司上海分公司</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="保单名称">
                <Select placeholder="选择保单">
                  <Option value="0">全部</Option>
                  <Option value="1">补充医疗大保单</Option>
                  <Option value="2">补充医疗弹性福利保单</Option>
                  <Option value="3">补充医疗50%保单</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="保单号">
                <Select placeholder="选择保单号">
                  <Option value="0">全部</Option>
                  <Option value="1">补充医疗大保单2017</Option>
                  <Option value="2">补充医疗大保单2016</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>

            <row>
              <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
              <Button type="primary" @click="queryTransfer" size="large">查询</Button>
              </Col>
            </Row>
          </Form>

        </div>
      </Panel>
    </Collapse>

    <div class="floatRightBtns">
      <router-link to="/addPolicy">
        <Button type="primary">新增保单缴费批次</Button>
      </router-link>
    </div>

    <Table border :columns="columns7" :data="data6"></Table>
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
            title: '保单名称',
            sortable: true,
            key: 'acceptanceId'
          },
          {
            title: '保单号',
            sortable: true,
            key: 'employeeId'
          },
          {
            title: '保单开始日期',
            sortable: true,
            key: 'employeeName'
          },
          {
            title: '保单结束日期',
            sortable: true,
            key: 'companyId'
          },
          {
            title: '付费年月',
            sortable: true,
            key: 'companyName'
          },
          {
            title: '总人数',
            sortable: true,
            key: 'Type'
          },
          {
            title: '保费',
            sortable: true,
            key: 'MoneyType'
          },
          {
            title: '操作人',
            sortable: true,
            key: 'acceptancePeople'
          },
          {
            title: '操作时间',
            sortable: true,
            key: 'jointandseveralPeople'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'addPolicyConfirm',
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        data6: [
          {
            acceptanceId: '补充医疗大保单',
            employeeId: '补充医疗大保单2017',
            employeeName: '2016-01-01',
            companyId: '2016-12-31',
            companyName: '201708',
            Type: '70000',
            MoneyType: '1，400，000',
            acceptancePeople: '杨琴华',
            jointandseveralPeople: '2017-9-20 15：30'
          },
          {
            acceptanceId: '补充医疗大保单',
            employeeId: '补充医疗大保单2017',
            employeeName: '2016-01-01',
            companyId: '2016-12-31',
            companyName: '201707',
            Type: '60000',
            MoneyType: '1，200，000',
            acceptancePeople: '杨琴华',
            jointandseveralPeople: '2017-8-20 15：30'
          },
          {
            acceptanceId: '补充医疗大保单',
            employeeId: '补充医疗大保单2017',
            employeeName: '2016-01-01',
            companyId: '2016-12-31',
            companyName: '201706',
            Type: '50000',
            MoneyType: '1，000，000',
            acceptancePeople: '杨琴华',
            jointandseveralPeople: '2017-7-20 15：30'
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

</style>
