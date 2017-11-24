<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        申请信息
        <div slot="content">
          <Form :label-width="120" ref="searchCondition" :model="searchCondition">
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请单号：">
                <Input v-model="searchCondition.test1" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请类别：">
                <Input v-model="searchCondition.test2" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="填报人：">
                <Input v-model="searchCondition.test3" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请人/部门/职位：" :label-width="180">
                <Input v-model="searchCondition.test4" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="审批状态：">
                <Input v-model="searchCondition.test5" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请时间：">
                <Input v-model="searchCondition.test6" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="主题：">
                <Input v-model="searchCondition.test7" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="分机：">
                <Input v-model="searchCondition.test8" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="公司编号：">
                <Input v-model="searchCondition.test9" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="公司名称：">
                <Input v-model="searchCondition.test10" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="姓名：">
                <Input v-model="searchCondition.test11" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="职位：">
                <Input v-model="searchCondition.test12" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="手机：">
                <Input v-model="searchCondition.test13" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="公司电话：">
                <Input v-model="searchCondition.test14" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="身份证：">
                <Input v-model="searchCondition.test15" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="内容：">
                <Input v-model="searchCondition.test16" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="礼品介绍不超过200个字"/>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="create">
      申请明细:
      <Table border :columns="applyDetailedColumns" :data="grantManagerData" ref="table"></Table>
    </div>

    <Collapse v-model="collapseInfo">
      <Panel name="2">
        审批列表
        <div slot="content">
          <Form :label-width=120 ref="searchCondition" :model="searchCondition">
            <Row>
              <Col :xs="{span: 12, offset: 1}" :lg="{ span: 12, offset: 1}">
              <Table border :columns="examineColumns" :data="examineData" ref="table"></Table>
              </Col>
              <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form-item label="审批意见：">
                <Input v-model="searchCondition.customerName" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder=""/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 3, offset: 16}" :lg="{ span: 3, offset: 16}">
              <router-link to="/grantManager">
                <Button type="primary" @click="" >同意已审核</Button>
              </router-link>
              <router-link to="/grantManager">
                <Button type="warning" @click="resetSearchCondition('searchCondition')">不同意并退回</Button>
              </router-link>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../store/EventTypes/index'
  import ProgressBar from "../commoncontrol/progress/progressbar.vue";

  export default {
    components: {ProgressBar},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        searchCondition: {
          test1:"29053",
          test2:"常规礼品",
          test3:"何晓东",
          test4:"",
          test5:"未审批",
          test6:"2017-11-15 13:37:15",
          test7:"批量礼品",
          test8:"4",
          test9:"",
          test10:"",
          test11:"",
          test12:"",
          test13:"",
          test14:"",
          test15:"",
          test16:"435",
          serviceCenterValue: "",
          customerNumber: '',
          customerName: '',
          sdsda:"何晓东",
          companyAccountType: '',
          region: '',
          accountTypeValue: '',
          employeeNumber: '',
          employeeName: '',
          idNumber: '',
          sSecurityState: '',
          personTypeValue: ''
        },
        applyDetailedColumns: [{
          title: '礼品名称',
          key: 'date1',
          align: 'center',
        }, {
          title: '单价',
          key: 'date2',
          align: 'center',
        }, {
          title: '数量',
          key: 'date3',
          align: 'center',
        }, {
          title: '需求时间',
          key: 'date4',
          align: 'center',
        }],
        grantManagerData: [{
          date1: '中智活页笔记本',
          date2: '80',
          date3: '5',
          date4: '',
        },{
          date1: '中智礼品丝巾',
          date2: '300',
          date3: '8',
          date4: '',
        }],
        examineColumns: [{
          title: '审批人',
          key: 'date1',
          align: 'center',
        }, {
          title: '审批时间',
          key: 'date2',
          align: 'center',
        }, {
          title: '审批意见',
          key: 'date3',
          align: 'center',
        }, {
          title: '审批标志',
          key: 'date4',
          align: 'center',
        }],
        examineData: [{
          date1: '何晓东',
          date2: '2017-11-15 10:56:02',
          date3: '同意申请',
          date4: '已审批'
        }, {
          date1: '赫鲁晓夫',
          date2: '2017-11-15 10:56:06',
          date3: '',
          date4: '未审批'
        }],
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .mt20 {
    margin-top: 20px;
  }
</style>
