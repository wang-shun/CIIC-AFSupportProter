
<template>
    <div class="supplementaryMedicalBatchList">
        <Collapse v-model="value1" accordion>
            <Panel name="1">
                <div slot="content">
                   <row>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                            <Form :label-width="100">
                              <Form-item label="理赔案卷状态：">
                                <Select placeholder="请选择">
                                  <Option value="1" v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                              </Form-item>
                            </Form>
                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :label-width="100">
                                    <Form-item label="案卷号">
                                    <Input placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :label-width="100">
                                    <Form-item label="受理编号">
                                    <Input placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>
                  </row>
                  <row>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :label-width="100">
                                    <Form-item label="雇员姓名">
                                    <Input placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :label-width="100">
                                    <Form-item label="雇员编号">
                                    <Input placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :label-width="100">
                                    <Form-item label="索赔金额">
                                    <Input placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>

                    </row>
                  <row>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="">
                      </Form-item>
                    </Form>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                          <Form-item label="">
                          </Form-item>
                    </Form>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="">
                          <Button type="primary" size="large">查询</Button>
                      </Form-item>
                    </Form>
                    </Col>
                  </Row>
                </div>
            </Panel>
        </Collapse>
        <br>
             <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
      <Button type="primary" size="large" ref="rmb" @click="modal1 = true">审核</Button>
      <Modal
        v-model="modal1"
        title="审核通过对话框"
        @on-ok="ok"
        ok-text="确定">
      </Modal>
        <br><br>
        <Table border :columns="columns7" :data="data6" ref="table"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
  </div>

</template>

<script>
    import expandRow from './expand_row.vue';
    export default {
      data() {
        return {
          modal1: false,
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
            textarea: ''
          },
          columns7: [
//            {
//              type: 'expand',
//              width: 50,
//              render: (h, params) => {
//                return h(expandRow, {
//                  props: {
//                    row: params.row
//                  }
//                })
//              }
//            },
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '案卷号',
              sortable: true,
              key: 'column1'
            },
            {
              title: '起始受理编号',
              sortable: true,
              key: 'column2'
            },
            {
              title: '受理单数',
              sortable: true,
              key: 'column3'
            },
            {
              title: '发票总数',
              sortable: true,
              key: 'column4'
            },
            {
              title: '索赔总金额',
              sortable: true,
              key: 'column5'
            },
            {
              title: '公司理赔总金额',
              sortable: true,
              key: 'column6'
            },
            {
              title: '审核人',
              sortable: true,
              key: 'column7'
            },
            {
              title: '审核日期',
              sortable: true,
              key: 'column8'
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
//                  h('Button', {
//                    props: {
//                      type: 'primary',
//                      size: 'small'
//                    },
//                    style: {
//                      marginRight: '5px'
//                    },
//                    on: {
//                      click: () => {
//                        this.$Modal.info({
//                          title: '补充医疗理赔受理',
//                          content: `审核通过`
//                        });
//                      }
//                    }
//                  }, '审核通过'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$router.push('supplementaryMedicalList');
                      }
                    }
                  }, '明细')

                ]);
              }
            }
          ],
          data6: [
            {
              column1: 'CIICYBQ20160126002',
              column2: '20151218583',
              column3: '30',
              column4: '46',
              column5: '1300',
              column6: '600',
              column7: '王正微',
              column8: '2016-01-06'
            },
            {
              column1: 'CIICYBQ20160126002',
              column2: '20151218583',
              column3: '30',
              column4: '36',
              column5: '32432.79',
              column6: '30600',
              column7: '王正微',
              column8: '2016-01-06'
            }
          ],

          taskStatus: [
            {
              value: 'status1',
              label: '未审核'
            },
            {
              value: 'status2',
              label: '已审核未付款'
            },
            {
              value: 'status3',
              label: '已完成'
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
        ok () {
          this.$Message.info('已审核通过');
        },
        remove(index) {
          this.data6.splice(index, 1);
        },
        // 导出csv
        exportData (type) {
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
              columns: this.columns8.filter((col, index) => index < 4),
              data: this.data7.filter((data, index) => index < 4)
            });
          }
        }
      }
    }

</script>
