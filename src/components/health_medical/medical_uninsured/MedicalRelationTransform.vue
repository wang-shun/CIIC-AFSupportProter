<template>
  <div class="smList">
    <Tabs :animated="false">
      <TabPane label="医疗关系转移">
        <Collapse v-model="collapseInfo" accordion>
          <Panel name="1">
            <div slot="content">
              <Form :label-width="100">
                <row>
                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                  <Form-item label="雇员编号">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>

                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form :label-width="100">
                    <Form-item label="雇员姓名">
                      <Input placeholder="请输入"></Input>
                    </Form-item>
                  </Form>
                  </Col>

                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="证件号码">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>
                </row>
                <row>
                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="公司编号">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>

                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="公司名称">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>
                </row>

                <row>
                  <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }" class="checkBtn">
                  <Button type="primary" size="large">查询</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Panel>
        </Collapse>
        <div class="tr" style="margin: 20px auto;">
          <router-link to="/addMedicalTransform">
            <Button type="primary">新增医疗关系转移</Button>
          </router-link>
          <Button icon="ios-download-outline" type="primary" @click="exportData(1)">导出数据</Button>
        </div>
        <Table border :columns="columns7" :data="data6" ref="table1"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
      </TabPane>

      <TabPane label="零星报销">
        <Collapse v-model="collapseInfo" accordion>
          <Panel name="1">
            <div slot="content">
              <Form :label-width="100">
                <row>
                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                  <Form-item label="雇员编号">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>

                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="雇员姓名">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>

                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="证件号码">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>
                </row>

                <row>
                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="公司编号">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>
                  <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form-item label="公司名称">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  </Col>
                </row>
                <row>
                  <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }" class="checkBtn">
                  <Button type="primary" size="large">查询</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Panel>
        </Collapse>

        <div class="tr" style="margin: 20px auto;">
          <router-link to="/addFragmentaryReimbursement">
            <Button type="primary">新增零星报销</Button>
          </router-link>
          <Button icon="ios-download-outline" type="primary" @click="exportData(2)">导出数据</Button>
        </div>
        <Table border :columns="columns8" :data="data8" ref="table2"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import expandRow from './ExpandRow.vue';

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
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
            title: '雇员编号',
            sortable: true,
            key: 'column1'
          },
          {
            title: '雇员姓名',
            sortable: true,
            key: 'column2'
          },
          {
            title: '中止日期',
            sortable: true,
            key: 'column3'
          },
          {
            title: '证件号码',
            sortable: true,
            key: 'column4'
          },
          {
            title: '公司编号',
            sortable: true,
            key: 'column5'
          },
          {
            title: '公司名称',
            sortable: true,
            key: 'column6'
          },
          {
            title: '客户经理',
            sortable: true,
            key: 'column7'
          },
          {
            title: '转出日期',
            sortable: true,
            key: 'column8'
          },
          {
            title: '转出地点',
            sortable: true,
            key: 'column9'
          },
          {
            title: '转回日期',
            sortable: true,
            key: 'column10'
          },
          {
            title: '备注',
            sortable: true,
            key: 'column11'
          }
        ],
        data6: [
          {
            column1: '11T0015',
            column2: '戴丽',
            column3: '',
            column4: '310001198801010001',
            column5: '1358',
            column6: '苹果公司',
            column7: '王正微',
            column8: '2016-01-06',
            column9: '苏州',
            column10: '2016-06-06',
            column11: '政策调整原因，所以转出'
          },
          {
            column1: '11T0015',
            column2: '戴丽',
            column3: '',
            column4: '310001198801010001',
            column5: '1358',
            column6: '苹果公司',
            column7: '王正微',
            column8: '2016-01-06',
            column9: '苏州',
            column10: '2016-06-06',
            column11: '政策调整原因，所以转出'
          }
        ],
        columns8: [
          {
            title: '雇员编号',
            sortable: true,
            key: 'column1'
          },
          {
            title: '雇员姓名',
            sortable: true,
            key: 'column2'
          },
          {
            title: '中止日期',
            sortable: true,
            key: 'column3'
          },
          {
            title: '证件号码',
            sortable: true,
            key: 'column4'
          },
          {
            title: '公司编号',
            sortable: true,
            key: 'column5'
          },
          {
            title: '公司名称',
            sortable: true,
            key: 'column6'
          },
          {
            title: '客户经理',
            sortable: true,
            key: 'column7'
          },
          {
            title: '受理金额',
            sortable: true,
            key: 'column8'
          },
          {
            title: '发票数',
            sortable: true,
            key: 'column9'
          },
          {
            title: '医疗备注',
            sortable: true,
            key: 'column10'
          },
          {
            title: '医保结算金额',
            sortable: true,
            key: 'column11'
          },
          {
            title: '医疗结算反馈',
            sortable: true,
            key: 'column12'
          },
          {
            title: '转出地点',
            sortable: true,
            key: 'column13'
          },
          {
            title: '转出时间',
            sortable: true,
            key: 'column14'
          }
        ],
        data8: [
          {
            column1: '11T0015',
            column2: '戴丽',
            column3: '',
            column4: '310001198801010001',
            column5: '1358',
            column6: '苹果公司',
            column7: '王正微',
            column8: '200',
            column9: '3',
            column10: '毛病不重',
            column11: '190',
            column12: '政策调整原因',
            column13: '苏州',
            column14: '2015-06-09'
          },
          {
            column1: '11T0015',
            column2: '戴丽',
            column3: '',
            column4: '310001198801010001',
            column5: '1358',
            column6: '苹果公司',
            column7: '王正微',
            column8: '200',
            column9: '3',
            column10: '毛病不重',
            column11: '190',
            column12: '政策调整原因',
            column13: '广州',
            column14: '2015-06-09'
          }
        ],
        taskStatus: [
          {
            value: 'status1',
            label: '全部'
          },
          {
            value: 'status2',
            label: '医疗关系转移'
          },
          {
            value: 'status3',
            label: '零星报销'
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
      ok() {
        this.$Message.info('已审核通过');
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      // 导出csv
      exportData(type) {
        if (type === 1) {
          this.$refs.table1.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 2) {
          this.$refs.table2.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.columns8.filter((col, index) => index < 4),
            data: this.data7.filter((data, index) => index < 4)
          });
        }
      }
    }
  }

</script>
