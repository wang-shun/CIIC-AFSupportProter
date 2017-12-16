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
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="保单名称">
                <Select placeholder="选择保单">
                  <Option value="0">全部</Option>
                  <Option value="1">补充医疗大保单</Option>
                  <Option value="2">补充医疗弹性福利保单</Option>
                  <Option value="3">补充医疗50%保单</Option>
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
      <router-link to="/addPolicyNum">
        <Button type="primary">新增保单号</Button>
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
        },
        columns7: [
          {
            title: '保单号名称', sortable: true, key: 'column1', align: "center",
          },
          {
            title: '保单号', sortable: true, key: 'column12', align: "center",
          },
          {
            title: '保单名称', sortable: true, key: 'column11', align: "center",
          },
          {
            title: '保单起始日期', sortable: true, key: 'column2', align: "center",
          },
          {
            title: '保单结束日期', sortable: true, key: 'column3', align: "center",
          },
          {
            title: '付费周期', sortable: true, key: 'column4', align: "center",
          },
          {
            title: '付费计算规则', sortable: true, key: 'column5', align: "center",
          },
          {
            title: '创建者', sortable: true, key: 'column6', align: "center",
          },
          {
            title: '创建时间', sortable: true, key: 'column7', align: "center",
          },
          {
            title: '操作', key: 'action', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {marginRight: "10px"},
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'addPolicyNum',
                        params: {data: params.row}
                      });
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'addPolicyNum',
                        params: {data: params.row}
                      });
                    }
                  }
                }, '编辑')
              ]);
            }
          }
        ],
        data6: [
          {
            column11: '补充医疗大保单',
            column12: '补充医疗大保单201721321',
            column1: '补充医疗大保单2017',
            column2: '2017-01-01',
            column3: '2017-12-31',
            column4: '月缴',
            column5: '固定保费',
            column6: '杨琴华',
            column7: '2016-12-20 15：30'
          },
          {
            column11: '补充医疗大保单',
            column12: '补充医疗大保单201721323',
            column1: '补充医疗大保单2016',
            column2: '2016-01-01',
            column3: '2016-12-31',
            column4: '月缴',
            column5: '固定保费',
            column6: '杨琴华',
            column7: '2015-12-20 15：30'
          },
          {
            column11: '补充医疗大保单',
            column12: '补充医疗大保单2017213218',
            column1: '补充医疗大保单2015',
            column2: '2015-01-01',
            column3: '2015-12-31',
            column4: '月缴',
            column5: '固定保费',
            column6: '杨琴华',
            column7: '2014-12-20 15：30'
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
