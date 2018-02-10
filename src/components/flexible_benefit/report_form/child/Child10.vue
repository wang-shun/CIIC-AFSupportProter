<template>
  <div>
     <Row style="margin: 10px; 0px; 5px; 0px;">
      <i-col style="text-align: right">
        <Button type="primary" @click="imp">导出报表</Button>
      </i-col>
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
    data () {
      return {
        pageNum: 1,
        pageSize: 5,
        total: null,
        colums1: [
          {title: '雇员姓名', key: ''},
          {title: '出生日期',key: ''},
          {title: '性别',key: ''},
          {title: '婚姻状况',key: ''},
          {title: '身份证号码',key: ''},
          {title: '学历',key: ''},
          {title: '手机号码',key: ''},
          {title: '电子邮件',key: ''},
          {title: '家庭邮编',key: ''},
          {title: '家庭地址',key: ''},
          {title: '政治面貌',key: ''},
          {title: '户口地址',key: ''},
          {title: '公司工号',key: ''},
          {title: '所在城市',key: ''},
          {title: 'TEAM',key: ''},
          {title: '服务中心',key: ''},
          {title: '中止',key: ''},
          {title: '民族',key: ''},
          {title: '合同起始日期',key: ''},
          {title: '中止日期',key: ''},
          {title: '合同结束日期',key: ''},
          {title: '输入日期',key: ''},
          {title: '首次进入中智日期',key: ''},
          {title: '职务职位',key: ''},
          {title: '备注',key: ''},
          {title: '所属部门',key: ''},
          {title: '国籍',key: ''},
          {title: '集团编号',key: ''},
          {title: '集团名称',key: ''},
          {title: '户口状况',key: ''},
          {title: '客户属性',key: ''}
        ],
        data1: []
      }
    },
    created () {
      this.find()
    },
    methods: {
      find () {

      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.find()
      },
      imp () {

      }
    }
  }
</script>
<style scoped>

</style>
