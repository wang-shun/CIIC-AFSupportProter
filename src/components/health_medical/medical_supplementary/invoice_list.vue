
<template>
    <div class="invoiceList">

      <Collapse v-model="value2" accordion>
        <Panel name="2">
          <div slot="content">
            <Form>
              <Row>
                <Col span="8">
                <FormItem label="医疗报销汇总信息：">
                  <span class="expand-value">医疗报销汇总详情</span>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="疾病名称：">
                  <span class="expand-value">急性扁桃体炎</span>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="就诊日期：">
                  <span class="expand-value">2015-12-13</span>
                </FormItem>
                </Col>
              </Row>

            </Form>
          </div>
        </Panel>
      </Collapse>

        <br>
        <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出</Button>
        <Modal
        v-model="modal1"
        title="审核通过对话框"
        @on-ok="ok"
        ok-text="确定">
        </Modal>
        <br><br>
        <Table border :columns="columns7" :data="data6" ref="table"></Table>
        <br>
        <Collapse v-model="value1" accordion>
           <Panel name="1">
             <div slot="content">
              <Form>

              <Row>
                <Col span="8">
                <FormItem label="就诊机构：">
                  <span class="expand-value">浦东新区公利医院</span>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="疾病名称：">
                  <span class="expand-value">急性扁桃体炎</span>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="就诊日期：">
                  <span class="expand-value">2015-12-13</span>
                </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="8">
                <FormItem label="自付金额：">
                  <span class="expand-value">50.00</span>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="统筹金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="附加金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="6">
                <FormItem label="自费金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="账户金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="申请金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="赔付金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
              </Row>

              <Row >
                <Col span="6">
                <FormItem label="核准金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="分类自付金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="公司理赔金额：">
                  <Input type="text" style="width: 190px" value="0.00"></Input>
                </FormItem>
                </Col>
                <Col span="6">
                <FormItem label="保险理赔金额：">
                  <span class="expand-value">0.00</span>
                </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="9">
                <FormItem label="结案状态：">
                  <span class="expand-value">已结</span>
                </FormItem>
                </Col>
                <Col span="9">
                <FormItem label="结案备注：">
                  <span class="expand-value"></span>
                </FormItem>
                </Col>
                <Col span="2">
                <FormItem label="   ">
                  <br>
                  <Button type="primary" style="margin-left:35px;">保存修改</Button>
                </FormItem>
                </Col>
              </Row>
            </Form>
             </div>
           </Panel>
        </Collapse>
  </div>

</template>

<script>
    import expandRow from './expand_row.vue';
    export default {
      data() {
        return {
          modal1: false,
          value1: '1',
          value2: '2',
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
              title: '连带被保险人',
              sortable: true,
              key: 'column3'
            },
            {
              title: '所属保单',
              sortable: true,
              key: 'column12'
            },
            {
              title: '申请金额',
              sortable: true,
              key: 'column4'
            },
            {
              title: '核准金额',
              sortable: true,
              key: 'column5'
            },
            {
              title: '疾病名称',
              sortable: true,
              key: 'column6'
            },
            {
              title: '投保日期',
              sortable: true,
              key: 'column7'
            },
            {
              title: '退保日期',
              sortable: true,
              key: 'column8'
            },
            {
              title: '受理日期',
              sortable: true,
              key: 'column9'
            },
            {
              title: '发票类型',
              sortable: true,
              key: 'column10'
            }
          ],
          data6: [
            {
              column1: '10E2143',
              column2: '张若',
              column3: '张维',
              column4: '59',
              column5: '59',
              column6: '急性扁桃体',
              column7: '2016-01-06',
              column8: '',
              column9: '2017-08-06',
              column10: '无医保',
              column12: '意外伤害2017'
            },
            {
              column1: '10E2143',
              column2: '张若',
              column3: '张维',
              column4: '59',
              column5: '59',
              column6: '急性扁桃体',
              column7: '2016-01-06',
              column8: '',
              column9: '2017-08-06',
              column10: '无医保',
              column12: '意外伤害2017'
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
