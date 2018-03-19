<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" :label-width="100">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="保险公司">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in insurecompany" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="项目">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in insureproject" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="状态">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in insureStatus" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="雇员编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="雇员姓名">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="证件号码">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="公司编号">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="公司名称">
                <Input v-model="formItem.code" placeholder="请输入"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="标的">
                <Select placeholder="请选择" style="width: 80px;">
                  <Option value="1" v-for="item in insureStatus1" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
                <span class="expand-value">-</span>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="投保日期">
                <DatePicker v-model="formItem.inputDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <FormItem label="退保日期">
                <DatePicker v-model="formItem.inputDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </FormItem>
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
      <Button type="info" @click="modalInput = true" icon="ios-upload-outline">导入数据</Button>
    </div>
    <Table border
           stripe
           :columns="warrantyColumns"
           :data="warrantyData"
           @on-selection-change="selectTableData"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import expandRow from './ExpandRow.vue';
  import ajax from "../../../data/health_medical/warranty.js";
  import warranty from '../../../store/modules/health_medical/data_sources/warranty.js'

  export default {
    data() {
      return {
        modal1: false,
        value1: '1',
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          inputDateRange: [],
          auditTimeRange: [],
          status: null,
          dossierNumber: null,
          acceptanceId: null,
          employeeId: null,
          employeeName: null,
          companyId: null,
          companyName: null,
          managementId: null,
          managementName: null,
          insuredName: null,
        },
        warrantyColumns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  Row: params.Row
                }
              })
            }
          },
          {
            title: '险种名称', sortable: true, key: 'productName', align: 'center'
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: 'center'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName', align: 'center'
          },
          {
            title: '是否在保', sortable: true, key: 'insured', align: 'center',
            render: (h, params) => {
              return warranty.insuredToChina(params.row.insured);
            }
          }
        ],
        warrantyData: [
          {
            column1: '家庭财产险',
            column2: '11L2674',
            column3: '戴敏',
            column4: '在保'
          },
          {
            column1: '二十种重大疾病保险',
            column2: '11L2674',
            column3: '戴敏',
            column4: '在保'
          }
        ],
        insureproject: [
          {
            label: '全部', value: 'p0'
          },
          {
            label: '家庭财产险', value: 'p1'
          },
          {
            label: '二十种重大疾病险', value: 'p2'
          },
          {
            label: '补充医疗险', value: 'p3'
          },
        ],
        insureStatus: [
          {
            label: '全部', value: 'p1'
          },
          {
            label: '在保', value: 'p2'
          },
          {
            label: '退保', value: 'p2'
          }
        ],
        insureStatus1: [
          {
            label: '区间', value: 'p1'
          },
          {
            label: '比例', value: 'p2'
          }
        ],
        insurecompany: [
          {
            label: '全部', value: 'p0'
          },
          {
            label: '中智', value: 'p1'
          },
          {
            label: '中国平安保险', value: 'p2'
          },
          {
            label: '中国大地保险', value: 'p3'
          }
        ]
      }
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      queryWarrantyPage() {
        ajax.queryWarrantyPage(this.formItem).then(response => {
          this.warrantyData = response.data.object.records;
          this.formItem.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      getByPage(val) {
        this.formItem.current = val;
        this.queryWarrantyPage()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.queryWarrantyPage()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
    }
  }

</script>
