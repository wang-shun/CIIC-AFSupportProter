<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          档案配对
          <div slot="content">
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}">
                <Button type="primary">生成档案编号</Button>
                <Button type="info">导出XLS</Button>
                <Button type="warning" @click="goBack">返回</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Table border :columns="matchImportColumns" :data="matchImportData" class="mt20"></Table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        collapseInfo: [1],
        matchImportColumns: [
          {title: '用工序号', key: 'employmentIndex', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employmentIndex),
              ]);
            }
          },
          {title: '档案类别', key: 'fileType', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fileType),
              ]);
            }
          },
          {title: '档案编号', key: 'fileIndex', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fileIndex),
              ]);
            }
          },
          {title: '档案来源', key: 'fileOrigin', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fileOrigin),
              ]);
            }
          },
          {title: '用工反馈', key: 'employmentFeedback', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employmentFeedback),
              ]);
            }
          },
          {title: '存档地', key: 'storeFilePlace', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.storeFilePlace),
              ]);
            }
          },
          {title: '入库日期', key: 'inStockDate', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.inStockDate),
              ]);
            }
          },
          {title: '录用处理结束', key: 'employHandleEnd', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employHandleEnd),
              ]);
            }
          },
          {title: '配对结果', key: 'matchResult', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.matchResult),
              ]);
            }
          },
        ],
        matchImportData: []
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
