<template>
  <div>
    <Row style="margin: 10px;">
      <Col style="text-align: right">
        <Button type="primary" @click="imp">导出报表</Button>
      </Col>
    </Row>

    <Table border :columns="colums1" :data="data1"></Table>
    <Page @on-change="handleCurrentChange"
          :current="pageNum"
          :page-size="pageSize"
          :total="total" show-elevator show-total></Page>
  </div>
</template>
<script>
  export default {
    props: {
      queryParam: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 5,
        total: null,
        colums1: [
          {title: '客服经理', key: ''},
          {title: '客户总监', key: ''},
          {title: '公司编号', key: ''},
          {title: '公司名称', key: ''},
          {title: '公司联系人', key: ''},
          {title: '电话', key: ''},
          {title: '地址', key: ''},
          {title: '邮编', key: ''},
          {title: '服务产品', key: ''},
          {title: '所在城市', key: ''},
          {title: '首次进入中智时间', key: ''},
          {title: '雇员姓名', key: ''},
          {title: '雇员编号', key: ''},
          {title: '性别', key: ''},
          {title: '手机号码', key: ''}
        ],
        data1: []
      }
    },
    created() {
      this.find()
    },
    methods: {
      find() {

      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.find()
      },
      imp() {

      }
    }
  }
</script>
<style scoped>

</style>
