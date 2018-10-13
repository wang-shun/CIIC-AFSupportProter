<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档日期：">
            <DatePicker v-model="refuse.returnDocDate"   type="date" placeholder=""  transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="操作员：">
            {{refuse.returnDocMan}}
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary"  :loading="isLoading"  @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from "../../../api/employ_manage/hire_operator";
export default {
  props: {
    refuseInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    refuse() {
      return this.refuseInfo;
    }
  },
  mounted() {},
  methods: {
    instance() {
      if (this.refuseInfo.resignId == undefined) {
        this.$Message.success("请先保存退工");
        return;
      }

      var fromData = {};
      if (this.refuseInfo.returnDocDate) {
        fromData.returnDocDate = this.$utils.formatDate(
          this.refuseInfo.returnDocDate,
          "YYYY-MM-DD"
        );
      }

      fromData.resignId = this.refuseInfo.resignId;
      fromData.isReturn = 0;
      let self = this;
      api.saveAmReturn(fromData).then(data => {
        if (data.code == 200) {
          this.$Message.success("保存成功");
          self.refuseInfo.returnDocMan = data.data.returnDocMan;
        } else {
          this.$Message.error("保存失败！" + data.message);
        }
      });
    }
  }
};
</script>
