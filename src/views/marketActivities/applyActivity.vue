<template>
  <div class="smList">
    <Collapse v-model="value">
      <Panel name="1">
        <div slot="content">
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="160">
                <Form-item label="当前申请总人数：" prop="name">
                  <span class="expand-value">3</span>
                </Form-item>
              </Form>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form :model="formItem" :label-width="180">
                <FormItem label="当前申请礼品总数：">
                  <span class="expand-value">3</span>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <div>
      <Button type="warning" @click="back">上一步</Button>
      <Button type="primary" @click="confirm()">确认申请</Button>
    </div>
    <div class="create">
      <Row>
        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
        <Form :model="formItem" :label-width="120">
          <Form-item label="数量：" prop="name">
            <Input v-model="formItem.code" placeholder="请输入"/>
          </Form-item>
        </Form>
        </Col>
        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
        <Form :model="formItem" :label-width="120">
          <Form-item label="礼品形式：" prop="name">
            <Select  placeholder="请选择">
              <Option value="1">电子票券</Option>
              <Option value="2">纸质票券</Option>
              <Option value="3">实物</Option>
            </Select>
          </Form-item>
        </Form>
        </Col>
        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
        <Form :model="formItem" :label-width="120">
          <Form-item label="派送方式：" prop="name">
            <Select  placeholder="请选择">
              <Option value="1">送至中心</Option>
              <Option value="2">委托快递</Option>
            </Select>
          </Form-item>
        </Form>
        </Col>
        <Col span="1">
        <Button type="primary">批量修改</Button>
        </Col>
      </Row>
    </div>
    <can-edit-table refs="table3" :editIncell="true" :columns-list="columns7" :table-data="data6" :saveEdit="saveEditInlineIncell" :deleteRow="deleteRowInlineIncell"></can-edit-table>
    <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>

<script>
import canEditTable from './tables/canEditTable.vue';

export default {
  components: {
    canEditTable
  },
  data() {
    return {
      modal1: false,
      modal11: false,
      value: "1",
      formItem: {
        input: "",
        select: "",
        select1: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: "",
        textarea: ""
      },
      columns7: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
        {
          title: "类型",
          sortable: true,
          key: "acceptanceId"
        },
        {
          title: "公司编号",
          sortable: true,
          key: "employeeId"
        },
        {
          title: "公司名称",
          sortable: true,
          key: "employeeName"
        },
        {
          title: "联系人",
          sortable: true,
          key: "companyId"
        },
        {
          title: "部门",
          sortable: true,
          key: "companyname"
        },
        {
          title: "职位",
          sortable: true,
          key: "state"
        },
        {
          title: "数量",
          sortable: true,
          editable: true,
          key: "pm1"
        },
        {
          title: "礼品形式",
          sortable: true,
          key: "pm2",
          render: (h, params) => {
            return h('div', [
                h('Select', {props: {value: ''}},
                  [
                    h('Option', {props: {value: '1'}}, '电子票券'),
                    h('Option', {props: {value: '2'}}, '纸质票券'),
                    h('Option', {props: {value: '2'}}, '实物')
                  ]
                )
              ]
            );
          }
        },
        {
          title: "派送方式",
          sortable: true,
          key: "pm3",
          render: (h, params) => {
            return h('div', [
                h('Select', {props: {value: ''}},
                  [
                    h('Option', {props: {value: '1'}}, '送至中心'),
                    h('Option', {props: {value: '2'}}, '委托快递')
                  ]
                )
              ]
            );
          }
        },
        {
          title: "派送地址",
          sortable: true,
          editable: true,
          key: "pm4"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "",
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data6: [
        {
          acceptanceId: "公共关系",
          employeeId: "0",
          employeeName: "朱家角阿婆茶馆",
          companyId: "钟夏琪",
          companyname: "市场部",
          state: "采购专员",
          pm1: "1",
          pm2: "电子票券",
          pm3: "送至中心",
          pm4: "中智"
        },
        {
          acceptanceId: "公共关系",
          employeeId: "0",
          employeeName: "富士通（中国）",
          companyId: "朱艺华",
          companyname: "营销策划部",
          state: "高级经理",
          pm1: "1",
          pm2: "实物",
          pm3: "委托快递",
          pm4: "上海"
        }
      ],
      peopleTypes: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "雇员"
        },
        {
          value: "2",
          label: "子女"
        },
        {
          value: "3",
          label: "配偶"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$local.back();
    },
    confirm(){
      this.$router.push({path:"/marketActivitiesManager"});
    },
    saveEditInlineIncell (index, success, fail) {
      let delay = 0;
      if (this.lowNetSpeed) {
        delay = 1000;
      }
      setTimeout(() => {
        if (this.breakConnect) {
          fail(() => {
            this.$Message.error('服务器嫌弃你的网络，所以保存失败');
          });
        } else {
          success(() => {
            this.$Message.success('保存成功');
          });
        }
      }, delay);
    },
    deleteRowInlineIncell (index, success, fail) {
      let delay = 0;
      if (this.lowNetSpeed) {
        delay = 1000;
      }
      setTimeout(() => {
        if (this.breakConnect) {
          fail(() => {
            this.$Message.error('服务器嫌弃你的网络，所以删除失败');
          });
        } else {
          success(() => {
            this.$Message.success('删除数据成功~');
          });
        }
      }, delay);
    }
  }
};

function createLookMap(key, value, jsonArr) {
  let map = {};
  for (let i = 0; i < jsonArr.length; i++) {
    let item = jsonArr[i];
    let mapKey = item[key];
    let mapValue = item[value];
    map[mapKey] = mapValue;
  }
  return map;
}
</script>

<style>

</style>
