<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="collectionPaymentItem" :model="collectionPaymentItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险公司">
                <Select v-model="collectionPaymentItem.input" placeholder="选择保险公司">
                  <Option value="0">全部</Option>
                  <Option value="1">中国人民财产保险股份有限公司苏州市分公司</Option>
                  <Option value="2">平安养老保险股份有限公司上海分公司</Option>
                  <Option value="3">中国平安财产保险股份有限公司上海分公司</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保单名称">
                <Select v-model="collectionPaymentItem.select" placeholder="选择保单">
                  <Option value="0">全部</Option>
                  <Option value="1">惠氏公司商业保险保费</Option>
                  <Option value="2">爱茉莉公司-平安团体险保单</Option>
                  <Option value="3">伊顿公司实习生意外险保费</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" @click="query()" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('collectionPaymentItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="tr m10">
      <router-link to="/addCollectionPayment">
        <Button type="primary">新增代收代付</Button>
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
        collectionPaymentItem: {
          input: '',
          select: '',
        },
        columns7: [
          {
            title: '保险公司', sortable: true, key: 'column1', align: 'center',
          },
          {
            title: '保单名称', sortable: true, key: 'column2', align: 'center',
          },
          {
            title: '保单开始日期', sortable: true, key: 'column3', align: 'center',
          },
          {
            title: '保单结束日期', sortable: true, key: 'column4', align: 'center',
          },
          {
            title: '缴费周期', sortable: true, key: 'column6', align: 'center',
          },
          {
            title: '最新缴费年月', sortable: true, key: 'column5', align: 'center',
          },
          {
            title: '操作', key: 'action', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'addCollectionPayment', params: {data: params.row}});
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        data6: [
          {
            column1: '中国人民财产保险股份有限公司苏州市分公司',
            column2: '平安财产指定商业保险保费',
            column3: '2016-01-01',
            column4: '2016-12-31',
            column5: '201708',
            column6: '月缴'
          },
          {
            column1: '平安养老保险股份有限公司上海分公司',
            column2: '惠氏公司商业保险保费',
            column3: '2016-01-01',
            column4: '2016-12-31',
            column5: '201709',
            column6: '月缴'
          },
          {
            column1: '平安养老保险股份有限公司上海分公司',
            column2: '爱茉莉公司-平安团体险保单',
            column3: '2016-01-01',
            column4: '2016-12-31',
            column5: '201708',
            column6: '月缴'
          }
        ]
      }
    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      remove(index) {
        this.data6.splice(index, 1);
      }
    }
  }

</script>
<style scoped>
</style>
