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
          {title: '服务产品', key: ''},
          {title: '收费', key: ''},
          {title: '人数', key: ''},
          {title: '公司数', key: ''}
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
