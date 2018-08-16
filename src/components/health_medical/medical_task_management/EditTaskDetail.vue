<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Form>
      <Row>
        <Col span="8">
          <FormItem label="服务中心11：">
            <span class="expand-value">仲晨光   西区2</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="公司编号：">
            <span class="expand-value">29198</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="公司名称：">
            <span class="expand-value">东莞瑞德丽邦基数咨询服务有限公司</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="投保对象：">
            <span class="expand-value">张丽玲</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="投保险种：">
            <Select placeholder="请选择" width="30" style="width: 300px;" v-model="selected">
              <Option v-for="item in tasktype" :value="item.value" :key="item.value">{{item.label}}</Option>

            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="投保公司：">
            <Select placeholder="请选择" width="30" style="width: 300px;" v-model="selecteds">
              <Option v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="投保日期：">
            <DatePicker type="date" placeholder="选择日期">2017-08-10</DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="退保日期：">
            <DatePicker type="date" placeholder="选择日期"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="标的：">
            <Input type="text" style="width: 190px" value="2.5万"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="保险起始日期：">
            <DatePicker type="date" placeholder="选择日期"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="保险结束日期：">
            <DatePicker type="date" placeholder="选择日期"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="说明：">
            <Input type="text" style="width: 190px" value="一次性补贴"></Input>
            <Button type="primary" style="margin-left:35px;">提交变更</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    },
    data() {
      return {
        selecteds: 'status3',
        taskStatus: [
          {
            value: 'status1',
            label: '中国人民财产保险股份有限公司'
          },
          {
            value: 'status2',
            label: '上海人寿保险股份有限公司 '
          },
          {
            value: 'status3',
            label: '天安人寿保险股份有限公司上海分公司'
          },
          {
            value: 'status4',
            label: '中国人民人寿保险股份有限公司上海市分公司'
          }
        ],
        selected: 'status41',
        tasktype: [
          {
            value: 'status11',
            label: '特需医疗保险'
          },
          {
            value: 'status21',
            label: '补充医疗保险 '
          },
          {
            value: 'status31',
            label: '大中华医疗保险'
          },
          {
            value: 'status41',
            label: '中国人民人寿保险股份有限公司上海市分公司'
          }
        ]
      }
    },
  }

</script>
