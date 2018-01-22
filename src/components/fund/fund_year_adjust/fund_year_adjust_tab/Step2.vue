<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        后道下载年调申报表
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="调整年份：" prop="adjustYear">
                  <DatePicker v-model="operatorSearchData.adjustYear" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="fundTypeValue">
                  <Select v-model="operatorSearchData.fundTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in fundTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
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
                <Form-item label="前道收集状态：" prop="beforeCollectStatusValue">
                  <Select v-model="operatorSearchData.beforeCollectStatusValue" style="width: 100%;" transfer>
                    <Option v-for="item in beforeCollectStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="调整状态：" prop="changeValue">
                  <Select v-model="operatorSearchData.changeValue" style="width: 100%;" transfer>
                    <Option v-for="item in changeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
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
        <Button type="primary" @click="isShowBaseChange = true;">基数调整</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="step2Columns" :data="data.step2Data"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <Modal
      v-model="isShowBaseChange"
      title="基数调整"
    >
      <Row v-for="Progress in Progresses">
        <Col :sm="{span: 20, offset: 2}">
          <span>{{Progress.label}}</span>
          <Progress :percent="Progress.value" :status="Progress.status"></Progress>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="warning" @click="isShowBaseChange = false;">关闭</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowFirstYearAdjustApplyFile"
      title="第1次上传年调申报文件"
    >
      <Form :label-width=180>
        <Row>
          <Col :sm="{span:20, offset: 4}">
            <Form-item label="公积金月份：">
              {{firstYearAdjustApplyFile.fundMonth}}
            </Form-item>
          </Col>
          <Col :sm="{span:20, offset: 4}">
            <Form-item label="企业账户名称：">
              {{firstYearAdjustApplyFile.companyAccountName}}
            </Form-item>
          </Col>
          <Col :sm="{span:20, offset: 4}">
            <Form-item label="公积金年度基数调整名单：">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="isShowFirstYearAdjustApplyFile = false;">导入数据</Button>
        <Button type="warning" @click="isShowFirstYearAdjustApplyFile = false;">关闭</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowSecondYearAdjustApplyFile"
      title="第2次上传年调申报文件"
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
              {{secondYearAdjustApplyFile.belongChangeYear}}
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="isShowSecondYearAdjustApplyFile = false;">导入数据</Button>
        <Button type="warning" @click="isShowSecondYearAdjustApplyFile = false;">关闭</Button>
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
          fundTypeValue: 0,
          companySSCategoryValue: 0,
          beforeCollectStatusValue: 0,
          changeValue: 0
        },
        isShowBaseChange: false,
        isShowFirstYearAdjustApplyFile: false,
        isShowSecondYearAdjustApplyFile: false,

        Progresses: [
          {label: "中智大库", value: 1, status: ""},
          {label: "独立户XX有限公司1", value: 60, status: ""},
          {label: "独立户XX有限公司2", value: 100, status: ""},
          {label: "独立户XX有限公司3", value: 70, status: "wrong"}
        ],
        firstYearAdjustApplyFile: {
          fundMonth: "201709",
          companyAccountName: "XXXX有限公司"
        },
        secondYearAdjustApplyFile: {
          belongChangeYear: "2017年"
        },
        fundTypeList: [
          {label: "基本公积金", value: 0},
          {label: "补充公积金", value: 1}
        ],
        companySSCategoryList: [
          {label: "中智大库", value: 0},
          {label: "中智外包", value: 1},
          {label: "独立户客户1", value: 2},
          {label: "独立户客户2", value: 3},
        ],
        beforeCollectStatusList: [
          {label: "全部", value: 0},
          {label: "收集中", value: 1},
          {label: "确认收集完毕", value: 2},
          {label: "未收集", value: 3}
        ],
        changeList: [
          {label: "调整成功", value: 0},
          {label: "未调整", value: 1},
          {label: "调整失败", value: 2}
        ],
        step2Columns: [
          {title: '', type: 'selection', width: 60},
          {title: '公积金类型', key: 'fundType', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '调整年份', key: 'changeYear', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.changeYear),
              ]);
            }
          },
          {title: '企业账户分类', key: 'companyAccountCategory', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyAccountCategory),
              ]);
            }
          },
          {title: '前道收集状态', key: 'beforeCollectStatus', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.beforeCollectStatus),
              ]);
            }
          },
          {title: '调整状态', key: 'changeStatus', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.changeStatus),
              ]);
            }
          },
          {title: '差异对比', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.isShowFirstYearAdjustApplyFile = true;
                    }
                  }
                }, '上传对比'),
              ]);
            }
          },
          {title: '查看对比结果', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({name: 'fundYearAdjustViewDifference'});
                    }
                  }
                }, '查看差异'),
              ]);
            }
          },
          {title: '前道导入雇员总数', key: 'beforeImportEmployees', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.beforeImportEmployees),
              ]);
            }
          },
          {title: '后道上传总人数', key: 'afterUploadPeoples', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.afterUploadPeoples),
              ]);
            }
          },
          {title: '匹配成功总数', key: 'matchSuccess', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.matchSuccess),
              ]);
            }
          },
          {title: '匹配失败总数', key: 'matchFailed', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.matchFailed),
              ]);
            }
          },
          {title: '下载申报表', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', '下载'),
              ]);
            }
          },
          {title: '申报反馈导入', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.isShowSecondYearAdjustApplyFile = true;
                    }
                  }
                }, '上传'),
              ]);
            }
          },
        ],
      }
    },
    mounted() {
      this[EventType.STEP2]()
    },
    computed: {
      ...mapState('step2',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('step2',[EventType.STEP2]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>
