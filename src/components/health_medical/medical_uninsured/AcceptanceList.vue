<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        受理单查询
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="款项类型" prop="moneyType">
                <Select v-model="formItem.moneyType" placeholder="请选择" :clearable="true">
                  <Option v-for="item in moneyTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理类型" prop="caseType">
                <Select v-model="formItem.caseType" placeholder="请选择" :clearable="true">
                  <Option v-for="item in caseTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理状态" prop="status">
                <Select v-model="formItem.status" placeholder="请选择" :clearable="true">
                  <Option v-for="item in statusProperties" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="受理日期" prop="handlerDateRange">
                <DatePicker v-model="formItem.handlerDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方编号" prop="managementId">
                <Input v-model="formItem.managementId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方名称" prop="managementName">
                <Input v-model="formItem.managementName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司编号" prop="companyId">
                <Input v-model="formItem.companyId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称" prop="companyName">
                <Input v-model="formItem.companyName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号" prop="employeeId">
                <Input v-model="formItem.employeeId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名" prop="employeeName">
                <Input v-model="formItem.employeeName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码" prop="idNum">
                <Input v-model="formItem.idNum" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="getByPage(1)">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
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
      <Button type="info" ref="rmb" @click="modalButton(true)">受理</Button>
      <Button type="info" ref="rmb1" @click="modalButton(false)">拒赔</Button>
      <Button type="info" @click="exportData()" icon="ios-download-outline">导出数据</Button>
    </div>

    <Table border
           stripe
           ref="acceptanceData"
           :columns="acceptanceColumns"
           :data="acceptanceData"
           @on-selection-change="selectTableData"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>

    <Modal v-model="modalAccept"
           title="受理对话框"
           ok-text="受理"
           @on-ok="updateAcceptanceList(1)"
           :mask-closable="true">
      <Input v-model="dealMeg.remark" placeholder="请输入操作说明："/>
    </Modal>

    <Modal v-model="modalRefuse"
           title="拒赔操作对话框"
           ok-text="拒赔"
           @on-ok="updateAcceptanceList(2)"
           :mask-closable="true">
      <Input v-model="dealMeg.remark" placeholder="请输入拒赔原因：" class="mt15"/>
      <Select v-model="dealMeg.rejectType" :clearable="true" placeholder="请选择拒赔类型：" class="mt15">
        <Option v-for="item in rejectTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Modal>

  </div>
</template>
<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'
  import apiAjax from "../../../data/health_medical/uninsured_application.js";
  import qs from "qs"

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        modalAccept: false,
        modalRefuse: false,
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          moneyType: null,
          caseType: null,
          status: null,
          managementId: null,
          managementName: null,
          companyId: null,
          companyName: null,
          employeeId: null,
          employeeName: null,
          idNum: null,
          handlerDateRange: [],
        },
        dealMeg: {
          handler: "username",
          handlerDate: new Date(),
          status: null,
          rejectType: null,
          remark: null,
        },
        selectData: [],
        moneyTypes: admissibility.moneyTypes,
        caseTypes: admissibility.caseTypes,
        rejectTypes: admissibility.rejectTypes,
        statusProperties: admissibility.statusProperties,
        acceptanceColumns: [
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            title: '受理编号', sortable: true, key: 'umAcceptanceId', align: 'center'
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: 'center'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName', align: 'center'
          },
          {
            title: '公司编号', sortable: true, key: 'companyId', align: 'center'
          },
          {
            title: '公司名称', sortable: true, key: 'companyName', align: 'center'
          },
          {
            title: '受理类型', sortable: true, key: 'caseType', align: 'center',
            render: (h, params) => {
              return admissibility.caseTypeToChina(params.row.caseType)
            }
          },
          {
            title: '款项类型', sortable: true, key: 'moneyType', align: 'center',
            render: (h, params) => {
              return admissibility.moneyTypeToChina(params.row.moneyType)
            }
          },
          {
            title: '状态', sortable: true, key: 'status', align: 'center',
            render: (h, params) => {
              return admissibility.statusToChina(params.row.status)
            }
          },
          {
            title: '受理日期', sortable: true, key: 'handlerDate', align: 'center',
            render: (h, params) => {
              if (params.row.handlerDate !== null) {
                return this.$utils.formatDate(params.row.handlerDate, 'YYYY-MM-DD HH:mm:ss');
              }
            }
          },
          {
            title: '受理金额', sortable: true, key: 'caseMoney', align: 'center'
          },
          {
            title: '连带人', sortable: true, key: 'jointPersonName', align: 'center'
          },
          {
            title: '受理人', sortable: true, key: 'handler', align: 'center'
          },
          {
            title: '操作', key: 'action', width: 120, align: 'center',
            render: (h, params) => {
              if (params.row.status === 0) {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        /**清除选中数据，同时清除selectData数据*/
                        this.$refs.acceptanceData.selectAll(false);
                        this.selectData.push(params.row);
                        this.modalButton(true);
                      }
                    }
                  }, '受理'),
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        //auditNurseryFee
                        this.$refs.acceptanceData.selectAll(false);
                        this.selectData.push(params.row);
                        this.modalRefuse = true;
                      }
                    }
                  }, '拒赔')
                ]);
              } else {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        sessionStorage.setItem('umAcceptanceId', JSON.stringify(params.row.umAcceptanceId));
                        this.$router.push({name: 'LookAcceptanceUninsured'});
                      }
                    }
                  }, '查看')
                ]);
              }
            }
          }
        ],
        acceptanceData: []

      }
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      queryAcceptanceList() {
        apiAjax.queryAcceptanceList(this.formItem).then(response => {
          this.acceptanceData = response.data.object.records;
          this.acceptanceData.forEach(item => {
            if (item.status !== 0) {
              item._disabled = true;
            }
          });
          this.formItem.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      modalButton(val) {
        if (this.selectData.length === 0) {
          this.$Message.error("请选择受理单");
          return;
        }
        if (val) {
          this.modalAccept = true;
        } else {
          this.modalRefuse = true;
        }
      },
      updateAcceptanceList(val) {
        this.selectData.forEach(item => {
          item.status = val;
          item.remark = this.dealMeg.remark;
          item.rejectType = this.dealMeg.rejectType;
          item.handler = this.dealMeg.handler;
          item.handlerDate = this.dealMeg.handlerDate;
        });
        apiAjax.updateAcceptanceList(this.selectData).then(response => {
          if (response.data.code === 200) {
            this.getByPage(1);
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
        // modal数据重置
        this.dealMeg.remark = null;
        this.dealMeg.rejectType = null;
      },
      selectTableData(rows) {
        this.selectData = rows;
      },
      getByPage(val) {
        this.formItem.current = val;
        this.queryAcceptanceList()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.queryAcceptanceList()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      // 导出csv
      exportData() {
        window.location = process.env.HOST_SUPPLEMENTMEDICAL + '/uninsuredService/export?' + qs.stringify(this.formItem)
      }
    }
  }
</script>
