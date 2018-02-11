<template>
  <div class="processedTaskList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="140">
            <Row justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单状态">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="任务单类型">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in taskType" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险公司">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in insurecompany" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="保险项目">
                <Select v-model="model10" placeholder="请选择">
                  <Option value="1" v-for="item in insureproject" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="操作">
                <Select placeholder="请选择">
                  <Option value="1">投保</Option>
                  <Option value="2">退保</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="标的">
                <Select placeholder="请选择" style="width: 80px;">
                  <Option value="1" v-for="item in insureStatus1" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"/>
                <span class="expand-value">-</span>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="保险开始日期">
                <DatePicker v-model="formItem.handlerDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="保险结束日期">
                <DatePicker v-model="formItem.handlerDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="投保/退保日期">
                <DatePicker v-model="formItem.handlerDateRange" type="daterange" placement="bottom-end"
                            placeholder="选择日期" style="width: 100%"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="管理方编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="管理方名称">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="雇员编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="雇员姓名">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="证件号码">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="公司编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="公司名称">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" class="checkBtn">
              <Form-item label="保单名称">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
              <Button type="primary" icon="ios-search" @click="selectresult">查询</Button>
              <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr m20">
      <Button type="info" @click="exportData(1)" icon="ios-download-outline">导出数据</Button>
    </div>

    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        value1: '1',
        formItem: {
          input: '',
          select: '',
          select1: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
        },
        columns7: [
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            title: '状态', sortable: true, key: 'column31'
          },
          {
            title: '投保项目', sortable: true, key: 'column1'
          },
          {
            title: '雇员编号', sortable: true, key: 'column4'
          },
          {
            title: '雇员姓名', sortable: true, key: 'column5'
          },
          {
            title: '合同开始时间', sortable: true, key: 'column30'
          },
          {
            title: '公司编号', sortable: true, key: 'column6'
          },
          {
            title: '公司名称', sortable: true, key: 'column21'
          },
          {
            title: '客户经理', sortable: true, key: 'column7'
          },
          {
            title: '保险对象', sortable: true, key: 'column8'
          },
          {
            title: '性别', sortable: true, key: 'column8'
          },
          {
            title: '出生日期', sortable: true, key: 'column8'
          },
          {
            title: '证件号码', sortable: true, key: 'column9'
          },
          {
            title: '投保费用', sortable: true, key: 'column10'
          },
          {
            title: '标的', sortable: true, key: 'column11'
          },
          {
            title: '关系', sortable: true, key: 'column12'
          },
          {
            title: '中止日期', sortable: true, key: 'column12'
          },
          {
            title: '保险开始日期', sortable: true, key: 'column12'
          },
          {
            title: '保险结束日期', sortable: true, key: 'column12'
          },
          {
            title: '保单名称', sortable: true, key: 'column12'
          },
          {
            title: '投保日期', sortable: true, key: 'column12'
          },
          {
            title: '退保日期', sortable: true, key: 'column12'
          },
          {
            title: '批退原因', sortable: true, key: 'column12'
          },
          {
            title: '提交人', sortable: true, key: 'column12'
          },
          {
            title: '提交时间', sortable: true, key: 'column12'
          }
        ],
        data6: [
          {
            column31: '已完成',
            column1: '中智公司-意外伤害',
            column2: '否',
            column3: '投保',
            column4: '11L2674',
            column5: '戴敏',
            column6: '27376',
            column21: '瑞德丽邦基数咨询服务有限公司',
            column7: '段嘉晨',
            column8: '戴敏',
            column9: '150203199211161220',
            column10: '150',
            column11: '20万'
          },
          {
            column31: '已批退',
            column1: '中盈保险-补充医疗',
            column2: '否',
            column3: '投保',
            column4: '11L2674',
            column5: '戴敏',
            column6: '27376',
            column21: '瑞德丽邦基数咨询服务有限公司',
            column7: '段嘉晨',
            column8: '戴敏',
            column9: '150203199211161220',
            column10: '200',
            column11: '40万'
          }
        ],
        taskType: [
          {
            value: 'type1', label: '投保任务单'
          },
          {
            value: 'type2', label: '退保任务单'
          },
          {
            value: 'type3', label: '变更任务单'
          }
        ],
        taskStatus: [
          {
            value: 'status1', label: '已批退'
          },
          {
            value: 'status2', label: '已投保'
          },
          {
            value: 'status3', label: '已完成'
          }
        ],
        insureproject: [
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
        insurecompany: [
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
    methods: {
      remove(index) {
        this.data6.splice(index, 1);
      }
    }
  }

</script>
