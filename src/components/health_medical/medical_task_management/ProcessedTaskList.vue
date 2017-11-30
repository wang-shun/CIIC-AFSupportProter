<template>
  <div class="processedTaskList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
            <Form :model="formItem" :label-width="100">
              <Form-item label="任务单状态">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="任务单类型">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in taskType" :value="item.value" :key="item.value" >{{item.label}}</Option>
                </Select>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="管理方编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>

            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="管理方名称">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>

            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="雇员编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>

            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="雇员姓名">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>

            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="证件号码">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>

            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="公司编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>

            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="公司名称">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
            </Form>
            </Col>
          </Row>

          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保险开始日期">
                <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                <span style="width: 5px;" >-</span>
                <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保险结束日期">
                <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                <span style="width: 5px;" >-</span>
                <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保险公司">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in insurecompany" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保险项目">
                <Select  v-model="model10" multiple placeholder="请选择">
                  <Option value="1" v-for="item in insureproject" :value="item.value" :key="item.value" >{{item.label}}</Option>
                </Select>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="标的">
                <Select placeholder="请选择" style="width: 80px;" >
                  <Option value="1" v-for="item in insureStatus1" :value="item.value" :key="item.value" >{{item.label}}</Option>
                </Select>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
                <span class="expand-value">-</span>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
              </Form-item>
            </Form>
            </Col>

            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="保单名称">
                <Input v-model="formItem.code"  placeholder="请输入"></Input>
              </Form-item>
            </Form>
            </Col>

          </row>
          <row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="操作">
                <Select  placeholder="请选择">
                  <Option>投保</Option>
                  <Option>退保</Option>
                </Select>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="投保/退保日期">
                <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                <span style="width: 5px;" >-</span>
                <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
              </Form-item>
            </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 5 }" class="checkBtn">
            <Button type="primary" size="large" @click="selectresult">查询</Button>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <div class="create">
      <Row :gutter="16">
        <i-col span="6">
          <Button type="primary"  size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
        </i-col >
      </Row>
    </div>
    <Row :gutter="16">
      <i-col span="25">
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
      </i-col >
    </Row>
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
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '状态',
            sortable: true,
            width: 100,
            key: 'column31'
          },
          {
            title: '投保项目',
            width: 100,
            sortable: true,
            key: 'column1'
          },
          {
            title: '雇员编号',
            sortable: true,
            width: 100,
            key: 'column4'
          },
          {
            title: '雇员姓名',
            sortable: true,
            width: 100,
            key: 'column5'
          },
          {
            title: '合同开始时间',
            sortable: true,
            width: 100,
            key: 'column30'
          },
          {
            title: '公司编号',
            sortable: true,
            width: 100,
            key: 'column6'
          },
          {
            title: '公司名称',
            sortable: true,
            width: 100,
            key: 'column21'
          },
          {
            title: '客户经理',
            sortable: true,
            width: 100,
            key: 'column7'
          },
          {
            title: '保险对象',
            sortable: true,
            width: 100,
            key: 'column8'
          },
          {
            title: '性别',
            sortable: true,
            width: 100,
            key: 'column8'
          },
          {
            title: '出生日期',
            sortable: true,
            width: 100,
            key: 'column8'
          },
          {
            title: '证件号码',
            sortable: true,
            width: 100,
            key: 'column9'
          },
          {
            title: '投保费用',
            sortable: true,
            width: 100,
            key: 'column10'
          },
          {
            title: '标的',
            sortable: true,
            width: 100,
            key: 'column11'
          },
          {
            title: '关系',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '中止日期',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '保险开始日期',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '保险结束日期',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '保单名称',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '投保日期',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '退保日期',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '批退原因',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '提交人',
            sortable: true,
            width: 100,
            key: 'column12'
          },
          {
            title: '提交时间',
            sortable: true,
            width: 100,
            key: 'column12'
          }
        ],
        data6: [
          {
            column31: '已完成',
            column1: '中智公司-意外伤害',
            column2: '否',
            column3: '投保',
            column4:'11L2674',
            column5: '戴敏',
            column6: '27376',
            column21: '瑞德丽邦基数咨询服务有限公司',
            column7: '段嘉晨',
            column8:'戴敏',
            column9: '150203199211161220',
            column10: '150',
            column11: '20万'
          },
          {
            column31: '已批退',
            column1: '中盈保险-补充医疗',
            column2: '否',
            column3: '投保',
            column4:'11L2674',
            column5: '戴敏',
            column6: '27376',
            column21: '瑞德丽邦基数咨询服务有限公司',
            column7: '段嘉晨',
            column8:'戴敏',
            column9: '150203199211161220',
            column10: '200',
            column11: '40万'
          }
        ],
        taskType: [
          {
            value: 'type0',
            label: '全部'
          },
          {
            value: 'type1',
            label: '投保任务单'
          },
          {
            value: 'type2',
            label: '退保任务单'
          },
          {
            value: 'type3',
            label: '变更任务单'
          }
        ],
        taskStatus: [
          {
            value: 'status0',
            label: '全部'
          },
          {
            value: 'status1',
            label: '已批退'
          },
          {
            value: 'status2',
            label: '已投保'
          },
          {
            value: 'status3',
            label: '已完成'
          }
        ],
        insureproject:[
          {
            label:'全部',
            value:'p0'
          },
          {
            label:'家庭财产险',
            value:'p1'
          },
          {
            label:'二十种重大疾病险',
            value:'p2'
          },
          {
            label:'补充医疗险',
            value:'p3'
          },

        ],
        insurecompany:[
          {
            label:'全部',
            value:'p0'
          },
          {
            label:'中智',
            value:'p1'
          },
          {
            label:'中国平安保险',
            value:'p2'
          },
          {
            label:'中国大地保险',
            value:'p3'
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
