<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更内容：">
          <Select v-model="specialOperate.changeContentValue" style="width: 100%;" transfer>
            <Option v-for="item in changeContentList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="受理日期：">
          <DatePicker v-model="specialOperate.acceptedDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="送审日期：">
          <DatePicker v-model="specialOperate.deliveredDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="完成日期：">
          <DatePicker v-model="specialOperate.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border class="mt20" :columns="specialOperateColumns" :data="specialOperate.specialOperateData"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      specialOperateInfo: Object
    },
    data() {
      return {
        changeContentList: [
          {label: '个人信息修改', value: '0'}
        ],
        specialOperateColumns: [
          {title: '打印报表', key: 'printReport', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.printReport),
              ]);
            }
          },
          {title: '操作', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {

                    }
                  }
                }, '打印'),
              ]);
            }
          }
        ]
      }
    },
    computed: {
      specialOperate() {
        return this.specialOperateInfo;
      }
    }
  }
</script>
