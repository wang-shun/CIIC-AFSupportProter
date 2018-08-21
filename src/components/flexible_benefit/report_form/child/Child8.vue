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
          {title: '公司编号', key: '', width: 100, fixed: 'left'},
          {title: '公司名称', key: '', width: 100, fixed: 'left'},
          {title: '联系地址', key: '', width: 100},
          {title: '联系电话', key: '', width: 100},
          {title: '联系邮编', key: '', width: 100},
          {title: '传真', key: '', width: 100},
          {title: '雇员编号', key: '', width: 100},
          {title: '雇员姓名', key: '', width: 100},
          {title: '输入日期', key: '', width: 100},
          {title: '首次进入中智时间', key: '', width: 100},
          {title: '证件号码', key: '', width: 100},
          {title: '中止', key: '', width: 100},
          {title: '职务职位', key: '', width: 100},
          {title: '服务中心', key: '', width: 100},
          {title: 'TEAM', key: '', width: 100},
          {title: '出生日期', key: '', width: 100},
          {title: '手机号', key: '', width: 100},
          {title: '雇员卡已办日期', key: '', width: 100},
          {title: '雇员卡已发日期', key: '', width: 100},
          {title: '户口状况', key: '', width: 100},
          {title: '服装费月份', key: '', width: 100}
        ],
        data1: [{}]
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
