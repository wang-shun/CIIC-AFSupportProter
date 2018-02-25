<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更类型">
          <Select v-model="reference.taskCategory" style="width: 100%;" transfer :disabled="disabled">
            <Option v-for="item in reference.taskCategoryList" :value="item.key" :key="item.key">{{item.value}}</Option>
          </Select>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border :columns="taskReferenceInfoColumns" :data="reference.taskReferenceInfoData"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      referenceInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        changeTypeList: [],
        taskReferenceInfoColumns: [
          {title: '公积金基数', key: 'empBase', align: 'left'},
          {title: '企业比例', key: 'ratioCom', align: 'left'},
          {title: '个人比例', key: 'ratioEmp', align: 'left'},
          {title: '起缴月份', key: 'startMonth', align: 'left'},
          {title: '截至月份', key: 'endMonth', align: 'left'},
          {title: '金额', key: 'amount', align: 'left'}
        ],
      }
    },
    computed: {
      reference() {
        console.log(JSON.stringify(this.referenceInfo))
        return this.referenceInfo
      }
    }
  }
</script>
