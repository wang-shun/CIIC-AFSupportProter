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
                29035
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请类别：">

                <p>
                  市场活动
                </p>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请人/部门/职位：" :label-width="180">
                何晓东/HR法务/[区域总监]
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="审批状态：">
                未审批
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请时间：">
                2017-11-15 11:17:09
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="主题：">
                1321312
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="填报人：">
                何晓东
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 3, offset: 1}" :lg="{ span: 3, offset: 1}">
              已申请人数：2
              </Col>
              <Col :xs="{span: 3, offset: 1}" :lg="{ span: 3, offset: 1}">
              已申请礼品总数：2
              </Col>
              <Col :xs="{span: 3, offset: 1}" :lg="{ span: 3, offset: 1}">
              申请后礼品总数：0
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
              <Button type="warning" @click="">返回</Button>
              <router-link to="/grantManager">
                <Button type="primary" @click="">发放</Button>
              </router-link>
              <router-link to="/grantManager">
                <Button type="error" @click="">批退</Button>
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
  import EventTypes from '../../store/EventTypes'
  import ProgressBar from "../commoncontrol/progress/progressbar.vue";

  export default {
    components: {ProgressBar},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        searchCondition: {
          serviceCenterValue: "",
          customerNumber: '',
          customerName: '',
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
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '类型',
          key: 'date1',
          align: 'center',
        }, {
          title: '公司编码',
          key: 'date2',
          align: 'center',
        }, {
          title: '公司名称',
          key: 'date3',
          align: 'center',
        }, {
          title: '联系人',
          key: 'date4',
          align: 'center',
        }, {
          title: '部门',
          key: 'date5',
          align: 'center',
        }, {
          title: '职位',
          key: 'date6',
          align: 'center',
        }, {
          title: '客户服务',
          key: 'date7',
          align: 'center',
        },{
          title: '数量',
          key: 'date8',
          align: 'center',
        }, {
          title: '审批后数量',
          key: 'date9',
          align: 'center',
        }, {
          title: '审批意见',
          key: 'date10',
          align: 'center',
        }, {
          title: '状态',
          key: 'date11',
          align: 'center',
        }],
        grantManagerData: [{
          date1: 'AF类型',
          date2: '2942',
          date3: '白金软件',
          date4: '程杰',
          date5: '人事部',
          date6: '专员',
          date7: '何晓东',
          date8: '1',
          date9: '5',
          date10: '同意',
          date11: '已审批',
        },{
          date1: 'AF类型',
          date2: '5106',
          date3: '先灵葆雅',
          date4: '唐继宏',
          date5: '人事部',
          date6: '总监',
          date7: '何晓东',
          date8: '1',
          date9: '1',
          date10: '同意',
          date11: '已审批',
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
          date4: '同意'
        }, {
          date1: '赫鲁晓夫',
          date2: '2017-11-15 10:56:06',
          date3: '222',
          date4: '同意'
        }],
      }
    },
    methods: {

    }
  }
</script>

<style>

</style>
