<!--活动发放Tab-->
<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        礼品管理查询
        <div slot="content">
          <Form ref="searchCondition" :model="searchCondition" :label-width=120>
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="审批状态：">
                <Select v-model="searchCondition.customerNumber" :clearable="true">
                  <Option v-for="item in examineList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{span:6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="发放状态：">
                <Select v-model="searchCondition.customerNumber" :clearable="true">
                  <Option v-for="item in grantStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item :label-width="160" label="申请人所属部门:" :clearable="true">
                <Select v-model="searchCondition.customerNumber">
                  <Option v-for="item in deptList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
          </Form>
          <div class="tc">
            <Button type="primary" @click="getByPage(1)" icon="ios-search">查询</Button>
            <Button type="warning" @click="resetSearchCondition('searchCondition')">重置</Button>
          </div>
        </div>
      </Panel>
    </Collapse>
    <Table stripe border :columns="grantManagerColumns" :data="grantManagerData" ref="grantManagerTable"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="searchCondition.total"
          :current="searchCondition.current"
          :page-size="searchCondition.size"></Page>
  </div>
</template>

<script>
  import apiAjax from "../../../data/flexible_benefit/grant/grant_manager.js";

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        searchCondition: {
          approvalStatus: "",
          sendStatus: '',
          applyType: 2,//申请类型：1-活动
          current: 1,
          size: 10,
          total: 0,
        },
        grantManagerColumns: [
          {
            title: '编号', key: 'applyRecordId', align: 'center',
          },
          {
            title: '申请人', key: 'applicant', align: 'center',
          },
          {
            title: '项目主题', key: 'projectTopics', align: 'center',
          },
          {
            title: '申请时间', key: 'applyTime', align: 'center',
            render: (h, params) => {
              return this.$utils.formatDate(params.row.applyTime, 'YYYY-MM-DD HH:mm:ss');
            }
          },
          {
            title: '申请时间', key: 'applyTime', align: 'center',
            render: (h, params) => {
              return this.$utils.formatDate(params.row.applyTime, 'YYYY-MM-DD HH:mm:ss');
            }
          },
          {
            title: '审批状态', key: 'approvalStatus', align: 'center',
            render: (h, params) => {
              switch (params.row.approvalStatus) {
                case 0:
                  return "审批中";
                  break;
                case 1:
                  return "同意";
                  break;
                case 2:
                  return "不同意";
                  break;
              }
            }
          },
          {
            title: '操作', key: 'action', align: 'center', width: 200,
            render: (h, params) => {
              if (params.row.approvalStatus == '1') {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        //将数据暂存在sessionStorage
                        sessionStorage.setItem('marketGrantFormItem', JSON.stringify(params.row));
                        this.$router.push({name: 'marketGrant'});
                      }
                    }
                  }, '发放')
                ]);
              }
            }
          }
        ],
        grantManagerData: [],

        examineList: [
          {
            value: '2', label: '同意'
          },
          {
            value: '3', label: '不同意'
          },
          {
            value: '4', label: '部分同意'
          }
        ],

        grantStateList: [
          {
            value: '1', label: '未发放'
          },
          {
            value: '2', label: '已发放'
          },
          {
            value: '3', label: '已批退'
          }
        ],

        deptList: [
          {
            value: '0', label: '中智'
          },
          {
            value: '1', label: '外企部门组织结构树'
          }
        ],
      }
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      queryMarketApplyList() {
        apiAjax.grantList(this.searchCondition).then(response => {
          this.grantManagerData = response.data.object.records;
          this.searchCondition.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      getByPage(val) {
        this.searchCondition.current = val;
        this.queryMarketApplyList()
      },
      pageSizeChange(size) {
        this.searchCondition.size = size;
        this.queryMarketApplyList()
      },
    }
  }
</script>
