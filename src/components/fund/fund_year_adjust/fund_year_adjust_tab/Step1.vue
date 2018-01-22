<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        前道下载与导入调整名单
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="调整年份：" prop="adjustYear">
                  <DatePicker v-model="operatorSearchData.adjustYear" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="companySSCategoryValue">
                  <Select v-model="operatorSearchData.companySSCategoryValue" style="width: 100%;" transfer>
                    <Option v-for="item in companySSCategoryList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Dropdown @on-click="dataStatus">
          <Button type="primary">
            数据收集状态
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="0">收集中</DropdownItem>
            <DropdownItem name="1">确认数据无误</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="step1Columns" :data="data.step1Data"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <Modal
      v-model="isShowUpload"
      title="下载"
    >
      <Form :label-width=180>
        <Row>
          <Col :sm="{span:20, offset: 4}">
            <Form-item label="公积金年度基数调整名单：">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
          </Col>
          <Col :sm="{span:20, offset: 4}">
            <Form-item label="所属调整年份：">
              2017年
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="isShowUpload = false;">导入数据</Button>
        <Button type="warning" @click="isShowUpload = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'

  export default {
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          adjustYear: "",
          companySSCategoryValue: "",
          serviceCenterValue: "",
        },
        companySSCategoryList: [
          {label: "中智大库", value: 0},
          {label: "中智外包", value: 1},
          {label: "独立户客户1", value: 2},
          {label: "独立户客户2", value: 3},
        ],
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ], //客服中心
        isShowUpload: false,
        step1Columns: [
          {title: '', type: 'selection', width: 60},
          {title: '下载申报表', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', '下载'),
              ]);
            }
          },
          {title: '导入HR反馈', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.isShowUpload = true;
                    }
                  }
                }, '上传并导入'),
              ]);
            }
          },
          {title: '导入结果', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({name: 'fundYearAdjustMaintain'});
                    }
                  }
                }, '维护'),
              ]);
            }
          },
          {title: '数据收集状态', key: 'dataCollectStatus', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.dataCollectStatus),
              ]);
            }
          },
          {title: '调整年份', key: 'adjustYear', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.adjustYear),
              ]);
            }
          },
          {title: '客户名称', key: 'customerName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerName),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.STEP1]()
    },
    computed: {
      ...mapState('step1',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('step1',[EventType.STEP1]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      dataStatus(name) {
        switch(parseInt(name)) {
          case 0:
            this.$router.push({name: "fundYearAdjustStatus"});
            break;
          case 1:
            this.$router.push({name: "fundYearAdjustStatus"});
            break;
          default:
            break;
        }
      }
    }
  }
</script>
