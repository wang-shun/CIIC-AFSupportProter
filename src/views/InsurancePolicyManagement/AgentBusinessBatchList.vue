<template>
  <div class="InsurancePolicyNumEmpList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Row>
            <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保险公司">
                <span class="expand-value">中国人民财产保险股份有限公司苏州市分公司</span>
              </Form-item>
            </Form>
            </i-col>
            <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保单名称">
                <span class="expand-value">惠氏公司商业保险保费</span>
              </Form-item>
            </Form>
            </i-col>
            <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form :model="formItem" :label-width="100">
                <Form-item label="缴费年月：">
                  <Select placeholder="选择年月">
                    <Option value="0">全部</Option>
                    <Option value="1">201708</Option>
                    <Option value="2">201709</Option>
                    <Option value="3">201710</Option>
                  </Select>
                </Form-item>
              </Form>
            </i-col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <br>
    <Table border :columns="columns7" :data="data6"></Table>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1:'1',
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
        columns7: [
          {
            title: '公司编号',
            sortable: true,
            key: 'colunm1'
          },
          {
            title: '公司名称',
            sortable: true,
            key: 'colunm2'
          },
          {
            title: '保费',
            sortable: true,
            key: 'colunm3'
          },
          {
            title: '人数',
            sortable: true,
            key: 'colunm4'
          },
          {
            title: '操作人',
            sortable: true,
            key: 'colunm5'
          },
          {
            title: '操作时间',
            sortable: true,
            key: 'colunm6'
          }
        ],
        data6: [
          {
            colunm1: '13684',
            colunm2: '苹果公司',
            colunm3: '10,000',
            colunm4:'50',
            colunm5:'杨琴华',
            colunm6: '2017-08-10 09:30'
          },
          {
            colunm1: '13684',
            colunm2: '苹果公司',
            colunm3: '19,000',
            colunm4:'100',
            colunm5:'杨琴华',
            colunm6: '2017-07-10 09:30'
          }
        ],
        columns1: [
          {
            title: '雇员编号',
            sortable: true,
            key: 'acceptanceId'
          },
          {
            title: '雇员姓名',
            sortable: true,
            key: 'employeeId'
          },
          {
            title: '公司编号',
            sortable: true,
            key: 'employeeName'
          },
          {
            title: '公司名称',
            sortable: true,
            key: 'companyId'
          },
          {
            title: '类型',
            sortable: true,
            key: 'companyName'
          },
          {
            title: '连带人',
            sortable: true,
            key: 'Type'
          },
          {
            title: '受理人',
            sortable: true,
            key: 'MoneyType'
          },
          {
            title: '投保日期',
            sortable: true,
            key: 'acceptancePeople'
          },
          {
            title: '退保日期',
            sortable: true,
            key: 'acceptancePeople1'
          }
        ],
        data1: [
          {
            acceptanceId: '11L2674',
            employeeId: '戴敏',
            employeeName: '13684',
            companyId:'苹果公司',
            companyName:'子女',
            Type: '戴敏丽',
            MoneyType: '段嘉晨',
            acceptancePeople: '胡艳',
            acceptancePeople:'2016-02-16',
            acceptancePeople1:'2016-12-16'
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
  .checkBtn .ivu-btn{
    float: right;
  }
</style>
