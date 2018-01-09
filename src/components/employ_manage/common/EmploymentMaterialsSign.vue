<template>
  <div>
    <Form :label-width="150">
      <Row justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="材料提交人：">
            {{materials.materialCommiter}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="分机号：">
            {{materials.extNumber}}
          </Form-item>
        </Col>
      </Row>
      <Table border :columns="materialsColumns" :data="materials.materialsData" class="mt20"></Table>
      <Row justify="start" class="mt20">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="材料批退原因：">
            <Select v-model="materials.reasonValue" transfer>
              <Option v-for="(reason, index) in materials.reasonList" :value="value" :key="index">{{key}}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <Row justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary">材料全部签收</Button>
          <Button type="error" @click="refuseAll">材料全部批退</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      materialsInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        materialsColumns: [
          {title: '材料名称', key: 'materialName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.materialName),
              ]);
            }
          },
          {title: '前道提交时间', key: 'beforeCommitDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.beforeCommitDate),
              ]);
            }
          },
          {title: '前道提交时间', key: 'afterSignDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.afterSignDate),
              ]);
            }
          },
        ]
      }
    },
    methods: {
      refuseAll() {
        this.$emit("on-back");
      }
    },
    computed: {
      materials() {
        return this.materialsInfo;
      }
    }
  }
</script>
