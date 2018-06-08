<template>
  <Modal v-model="showOriginal" :width="900" :mask-closable="false" :closable="false">
    <div style="margin-bottom: 20px">
      <span style="font-weight: bold">原任务单信息</span>
    </div>
    <div style="margin-bottom: 25px">
      <Form :label-width=150 >
        <Row class="mt20" type="flex" justify="start">
          <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Table border width="850" :columns="originEmpTaskColumns"
                 :data="originEmpTask"></Table>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="close"><span>关闭</span></button>
    </div>
  </Modal>
</template>
<script>
  export default {
    props: {
      paramObj: {
        require: true,
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        originEmpTaskColumns: [
          {
            title: '任务单类型', key: 'taskCategory', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.taskCategory(params.row.taskCategory)),
              ]);
            }
          },
          {
            title: '起始月份',
            key: 'startMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.startMonth);
            }
          },
          {
            title: '截止月份',
            key: 'endMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.endMonth)
            }
          },
          {
            title: '基数',
            key: 'empBase',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span',params.row.empBase)
            }
          },
          {
            title: '发起时间',
            key: 'createdTime',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('span',params.row.createdTime)
            }
          },
          {
            title: '发起人',
            key: 'createdDisplayName',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span',params.row.createdDisplayName)
            }
          },
        ],
        originEmpTask: [],
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      showOriginal: {
        get: function() {
          return this.paramObj.showOrigin;
        },
        set: function() {
        }
      }
    },
    methods: {
      close() {
        this.paramObj.showOrigin = false
      }
    }
  }
</script>
