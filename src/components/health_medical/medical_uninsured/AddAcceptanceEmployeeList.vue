<template>
  <div>
    <Collapse v-model="value1">
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="连带人">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search">查询</Button>
              <Button type="warning">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr m20">
      <router-link to="/acceptanceList">
        <Button type="warning">返回受理单列表</Button>
      </router-link>
    </div>
    <Table stripe border :columns="addAcceptanceColumns" :data="addAcceptanceData"></Table>
    <Page :total="100" show-sizer show-elevator l></Page>
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
        addAcceptanceColumns: [
          {
            title: '雇员编号', sortable: true, key: 'employeeId'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName'
          },
          {
            title: '公司编号', sortable: true, key: 'companyId'
          },
          {
            title: '公司名称', sortable: true, key: 'companyName'
          },
          {
            title: '是否中止', sortable: true, key: 'IsLeave'
          },
          {
            title: '操作', key: 'action', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'addAcceptance', params: {data: params.row}
                      });
                    }
                  }
                }, '新增受理单')
              ]);
            }
          }
        ],
        addAcceptanceData: [
          {
            IsLeave: '是',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            companyName: '苹果公司'

          },
          {
            IsLeave: '是',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            companyName: '苹果公司'
          }
        ],
      }
    },
    methods: {
      remove(index) {
        this.data6.splice(index, 1);
      }
    }
  }

</script>
<style>

</style>
