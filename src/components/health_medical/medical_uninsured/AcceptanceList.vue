<template>
  <div class="acceptanceList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="款项类型">
                <Select placeholder="请选择">
                  <Option v-for="item in dataTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理类型">
                <Select placeholder="请选择">
                  <Option v-for="item in peopleTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方名称">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="状态">
                <Select placeholder="请选择">
                  <Option>已受理</Option>
                  <Option>拒赔</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="处理日期">
                <DatePicker type="date" style="width: 130px;" placeholder="选择日期"></DatePicker>
                <span style="width: 5px;">-</span>
                <DatePicker type="date" style="width: 135px;" placeholder="选择日期"></DatePicker>
              </Form-item>
              </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" size="large">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="tr m20">
      <router-link to="/addAcceptanceEmployeeList">
        <Button type="info">新建受理单</Button>
      </router-link>
      <Button type="info" ref="rmb" @click="modal11 = true">受理</Button>
      <Modal v-model="modal11" title="受理对话框" @on-ok="ok" ok-text="受理">
        <Input v-model="formItem.code" placeholder="请输入操作说明："></Input>
      </Modal>
      <Button type="info" ref="rmb1" @click="modal1 = true">拒赔</Button>
      <Modal v-model="modal1" title="拒赔对话框" @on-ok="ok" ok-text="拒赔">
        <Input v-model="formItem.code" placeholder="请输入操作说明："></Input>
      </Modal>
      <Button type="info" icon="ios-download-outline" @click="exportData(1)">导出数据</Button>
    </div>

    <Table border :columns="columns7" :data="data6" ref="table"></Table>
    <Page :total="100" show-sizer show-elevator></Page>

    <Modal v-model="modal1" title="拒赔操作对话框" @on-ok="ok" @on-cancel="cancel">
      <Input v-model="formItem.code" placeholder="请输入拒赔原因：" class="mt15"></Input>
      <Select class="mt15">
        <Option value="1">退员工</Option>
        <Option value="1">退客户</Option>
        <Option value="1">作废</Option>
        <Option value="1">其他</Option>
      </Select>
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modal1: false,
        modal11: false,
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
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            title: '受理编号', sortable: true, key: 'acceptanceId'
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName'
          },
          {
            title: '公司编号', sortable: true, key: 'companyId'
          },
          {
            title: '公司名称', sortable: true, key: 'companyname'
          },
          {
            title: '类型', sortable: true, key: 'Type'
          },
          {
            title: '款项', sortable: true, key: 'MoneyType'
          },
          {
            title: '连带人', sortable: true, key: 'jointandseveralPeople'
          },
          {
            title: '受理人', sortable: true, key: 'acceptancePeople'
          },
          {
            title: '状态', sortable: true, key: 'status'
          },
          {
            title: '处理日期', sortable: true, key: 'acceptanceDate'
          },
          {
            title: '受理金额', sortable: true, key: 'acceptanceMoney'
          },
          {
            title: '操作', key: 'action', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'auditNurseryFee', params: {data: params.row}});
                    }
                  }
                }, '受理'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'auditNurseryFee', params: {data: params.row}});
                    }
                  }
                }, '拒赔')
              ]);
            }
          }
        ],
        data6: [
          {
            acceptanceId: '20160215072',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            companyname: '苹果科技公司',
            Type: '子女',
            MoneyType: '托费',
            jointandseveralPeople: '段嘉晨',
            acceptancePeople: '胡艳',
            status: '拒赔',
            acceptanceDate: '2016-02-16',
            acceptanceMoney: '150'
          },
          {
            acceptanceId: '20160215071',
            employeeId: '11L2674',
            employeeName: '戴敏',
            companyId: '13684',
            companyname: '苹果科技公司',
            Type: '子女',
            MoneyType: '托费',
            jointandseveralPeople: '段嘉晨',
            acceptancePeople: '胡艳',
            status: '已受理',
            acceptanceDate: '2016-02-16',
            acceptanceMoney: '100'
          }
        ],
        peopleTypes: [
          {
            value: '0', label: '全部'
          },
          {
            value: '1', label: '雇员'
          },
          {
            value: '2', label: '子女'
          },
          {
            value: '3', label: '配偶'
          }
        ],
        dataTypes: [
          {
            value: '0', label: '全部'
          },
          {
            value: '1num', label: '医疗费'
          },
          {
            value: '2', label: '体检费用'
          },
          {
            value: '3', label: '住院补贴'
          },
          {
            value: '4', label: '托费'
          },
          {
            value: '5', label: '大额理赔款'
          },
          {
            value: '6', label: '其他'
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
      },
      showModel() {
        this.modal1 = true;
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
