<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Form>
        <Row>
            <Col span="8">
                <FormItem label="服务中心：">
                    <span class="expand-value">仲晨光 1  西区2</span>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="公司编号：">
                    <span class="expand-value">29198</span>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="公司名称：">
                    <span class="expand-value">东莞瑞德丽邦基数咨询服务有限公司</span>
                </FormItem>
            </Col>
        </Row>
          <Row >
            <Col span="8">
            <FormItem label="投保对象：">
              <span class="expand-value">张丽玲</span>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="投保险种：">
              <span class="expand-value">中智公司-家庭财产险</span>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="投保公司：">
              <span class="expand-value">中智公司</span>
            </FormItem>
            </Col>
          </Row>
        <Row >
          <Col span="8">
                <FormItem label="投保日期：">
                   <DatePicker type="date" placeholder="选择日期" ></DatePicker>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="退保日期：">
                    <DatePicker type="date" placeholder="选择日期" ></DatePicker>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="标的：">
                     <Input type="text" style="width: 190px" value="2.5万"></Input>
                </FormItem>
            </Col>
        </Row>
          <Row >
            <Col span="8">
            <FormItem label="保险起始日期：">
              <DatePicker type="date" placeholder="选择日期" ></DatePicker>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="保险结束日期：">
              <DatePicker type="date" placeholder="选择日期" ></DatePicker>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="说明：">
              <Input type="text" style="width: 190px" value="一次性补贴"></Input>
              <Button type="primary" size="large" style="margin-left:35px;">提交变更</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>

    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
