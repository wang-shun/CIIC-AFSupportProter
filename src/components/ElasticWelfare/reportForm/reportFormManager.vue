<template>
  <div class="smList">
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        查询报表
        <div slot="content">
          <Form :model="formItem" :label-width="120">
            <Row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                <Form-item label="内容：">
                  <Select v-model="formItem.status" placeholder="请选择">
                    <Option v-for="item in statusTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="公司名称：">
                <Input v-model="formItem.activitytitle" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="公司编号：">
                <Input v-model="formItem.activitytitle" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="客户经理：">
                <Input v-model="formItem.activitytitle" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="雇员出生日期：" :label-width="140">
                <Input v-model="formItem.activitytitle" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{ span: 3, offset: 12 }" :lg="{ span: 3, offset: 12 }">
                <Button type="primary" @click="query()" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="create">
      <Row :gutter="16">
        <Col span="2">
          <Button type="info">报表导出</Button>
        </Col>
      </Row>
    </div>
    <Table border :columns="marketListColumns" :data="marketListData" ref="table"></Table>
    <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>
<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/EventTypes"

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        formItem: {
          activitytitle: '',
          status: '',
        },
        marketListColumns: [{
          title: '公司编号', sortable: true, key: 'activitytitle'
        }, {
          title: '公司名称', sortable: true, key: 'publisher'
        }, {
          title: '地址', sortable: true, key: 'begintime'
        }, {
          title: '联系电话', sortable: true, key: 'endtime'
        }, {
          title: '邮编', sortable: true, key: 'status'
        }, {
          title: '客户经理', sortable: true, key: 'content'
        }],
        peopleTypes: [{
          value: '0', label: '全部'
        }, {
          value: '1', label: '雇员'
        }, {
          value: '2', label: '子女'
        }, {
          value: '3', label: '配偶'
        }],
        statusTypes: [{
          value: '4', label: '全部'
        }, {
          value: '0', label: '待审核'
        }, {
          value: '1', label: '进行中'
        }, {
          value: '2', label: '已结束'
        }],
      }
    },
    computed: {
      ...mapState("MARKET", {
        marketListData: state => state.data.marketListData,
      }),
    },
    created() {
      this[EventTypes.MARKETAPPLICATIONTYPE](this.formItem)
    },
    methods: {
      ...mapActions("MARKET", [EventTypes.MARKETAPPLICATIONTYPE]),
      query() {
        this[EventTypes.MARKETAPPLICATIONTYPE](this.formItem);
      },
      show(index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        })
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      // 导出csv
      exportData(type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.columns7.filter((col, index) => index < 4),
            data: this.data6.filter((data, index) => index < 4)
          });
        }
      }
    }
  }
</script>

<style>

</style>
