<template>
  <div>
    <Input
      v-model="currentValue"
      :size="size"
      :id="elementId"
      :disabled="disabled"
      :name="name"
      :icon="icon"
      placeholder="请点击右侧搜索按钮..."
      @on-click="handleClick"
    >
    </Input>
    <Modal
      v-model="visible"
      :width="width"
      :closable="closable"
      :mask-closable="maskClosable"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <!-- 客户名称 模态框内容 -->
      <Form :label-width="20" ref="queryForm" v-model="queryForm">
        <Row type="flex" justify="start">
          <Col :sm="{span: 10}">
            <Form-item prop="hfComAccount">
              <Input v-model="queryForm.hfComAccount" placeholder="请输入企业账号..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 10}">
            <Form-item prop="comAccountName">
              <Input v-model="queryForm.comAccountName" placeholder="请输入名称..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 4}" class="tr">
            <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
          </Col>
        </Row>
        <Row>
          <Table :columns="columns" :data="data" class="mt20"></Table>
          <Page
            class="pageSize"
            @on-change="handlePageNum"
            @on-page-size-change="handlePageSite"
            :total="page.total"
            :page-size="page.pageSize"
            :page-size-opts="page.pageSizeOpts"
            :current="page.pageNum"
            show-sizer show-total></Page>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import api from '../../../../api/house_fund/common/common'

  export default {
    name: 'input-account',
    props: {
      // Input
      value: String,
      name: String,
      title: String,
      elementId: String,
      size: String,
      disabled: {
        type: Boolean,
        default: false
      },
      // Modal
      width: {
        type: [Number, String],
        default: 600
      },
      icon: {
        type: String,
        default: 'ios-search'
      },

      closable: {
        type: Boolean,
        default: false
      },
      maskClosable: {
        type: Boolean,
        default: false
      },

      renderFormat: {
        type: Function,
        default (item) {
          return item.hfComAccount;
        }
      }
    },
    data() {
      return {
        visible: false,
        currentValue: this.value,

        page: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },

        currentIndex: -1,
        queryForm: {
          hfComAccount: '',
          comAccountName: '',
        },
        columns: [
          {
            title: '', key: '', align: 'center',
            render: (h, params) => {
              return h('Radio', {
                props: {
                  value: this.currentIndex == params.index,
                },
                on: {
                  'on-change': (val) => {
                    this.currentIndex = params.index
                  }
                }
              }, '');
            }
          },
          {
            title: '企业公积金账号', key: 'hfComAccount', align: 'center'
          },
          {
            title: '企业公积金账户名称', key: 'comAccountName', align: 'center'
          }
        ],
        data: []
      }
    },
    mounted() {
      this.query()
    },
    methods: {
      ok() {
        var row = {};
        if (this.currentIndex >= 0) {
          row = this.data[this.currentIndex];
          this.currentValue = this.renderFormat(row);
        }
        this.$emit('on-ok', row);
      },
      cancel() {
        this.$emit('on-cancel');
      },
      handleClick() {
        this.visible = true;
        if (this.data.length == 0) {
          this.query();
        }
      },
      query() {
        // 重置当前下标
        this.currentIndex = -1;
        // 处理参数
        var params = this.queryForm;
        api.getComFundAccountClassNameList({
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum,
          orderBy: '',
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.data = data.data;
            this.page.total = data.total;
          }
        })
      },
      handlePageNum(val) {
        this.page.pageNum = val;
        this.query();
      },
      handlePageSite(val) {
        this.page.pageSize = val;
        this.query();
      },
    },
    watch: {
      currentValue(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.currentValue = val
      },
    }
  };
</script>
