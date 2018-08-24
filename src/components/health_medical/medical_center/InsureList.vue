<template>
  <div class="acceptanceList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" :label-width="100">
            <Row type="flex" justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <Form-item label="雇员姓名">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <Form-item label="公司编号">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <Form-item label="公司名称">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <Form-item label="证件号码">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <Form-item label="受理编号">
                  <Input v-model="formItem.code" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
                <Form :model="formItem" :label-width="100">
                  <Form-item label="受理日期">
                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                  </Form-item>
                </Form>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 5 }" class="checkBtn">
                <Button type="primary" size="large">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="create">
      <router-link to="/addAcceptanceEmployeeList">
        <Button type="primary">
          新建受理单
        </Button>
      </router-link>
    </div>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="100" show-sizer show-elevator></Page>
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
        },
        columns7: [
          {
            title: '受理编号', sortable: true, key: 'acceptanceId'
          },
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
            title: '类型', sortable: true, key: 'Type'
          },
          {
            title: '款项', sortable: true, key: 'MoneyType'
          },
          {
            title: '连带人', sortable: true, key: 'jointandseveralPeople'
          },
          {
            title: '受理人', sortable: true, key: 'acceptancePeople'
          },
          {
            title: '受理日期', sortable: true, key: 'acceptanceDate'
          },
          {
            title: '受理金额', sortable: true, key: 'acceptanceMoney'
          },
          {
            title: '操作', key: 'action', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'addAcceptance',     //需要修改为提示框
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '新增未投保')
              ]);
            }
          }
        ],
        data6: [
          {
            acceptanceId: '20160215072',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            Type: '子女',
            MoneyType: '托费',
            jointandseveralPeople: '段嘉晨',
            acceptancePeople: '胡艳',
            acceptanceDate: '2016-02-16',
            acceptanceMoney: '150'
          },
          {
            acceptanceId: '20160215071',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            Type: '子女',
            MoneyType: '托费',
            jointandseveralPeople: '段嘉晨',
            acceptancePeople: '胡艳',
            acceptanceDate: '2016-02-16',
            acceptanceMoney: '100'
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
  .ivu-card {
    background: rgba(246, 246, 246, 1);
  }

  .checkBtn .ivu-btn {
    float: right;
  }
</style>
