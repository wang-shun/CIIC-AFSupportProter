<template>
  <div>
    <Form :label-width="150">
      <Row justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="预留档案编号：">
            <Select v-model="file1.reservedFileNumberValue" transfer>
              <Option v-for="(reservedFileNumber, index) in reservedFileNumberList" :key="index">{{reservedFileNumber}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案编号：">
            <Select v-model="file1.fileNumberValue" transfer>
              <Option v-for="(fileNumber, index) in fileNumberList" :key="index">{{fileNumber}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地：">
            <Select v-model="file1.placeValue" transfer>
              <Option v-for="(place, index) in placeList" :key="index">{{place}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地补充：">
            <Select v-model="file1.placeAddValue" transfer>
              <Option v-for="(placeAdd, index) in placeAddList" :key="index">{{placeAdd}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地状态：">
            <Select v-model="file1.placeStateValue" transfer>
              <Option v-for="(placeState, index) in placeStateList" :key="index">{{placeState}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案号：">
            <Input v-model="file1.fileNumber" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案来源：">
            <Select v-model="file1.fileOriginValue" transfer>
              <Option v-for="(fileOrigin, index) in fileOriginList" :key="index">{{fileOrigin}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="户口号：">
            <Input v-model="file1.accountNumber" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工档案缴费至：">
            <Input v-model="file1.employFilePayTo" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="入库日期：">
            <DatePicker v-model="file1.inStockDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="进档日期：">
            <DatePicker v-model="file1.inFileDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="进档日期：">
            <Checkbox v-model="file1.isEmployHandleEnd">录用处理结束</Checkbox>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary">保存</Button>
        </Col>
      </Row>
    </Form>
    <Form :label-width="150" class="mt40">
      <Row justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="file2.isFileHalfwayOut">档案中途转出</Checkbox>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案中途转出时间：">
            <DatePicker v-model="file2.fileHalfwayOutDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案中途转出方向：">
            <Input v-model="file2.fileHalfwayOutDirection" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="手册入库日期：">
            <DatePicker v-model="file2.bookInStockDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="手册入库人：">
            <Input v-model="file2.bookInstocker" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工后收到手册入库人：">
            <Input v-model="file2.emploiedAccpetBookInStocker" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工后收到手册日期：">
            <Input v-model="file2.emploiedAccpetBookDate" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="恢复用工手册入库人：">
            <Input v-model="file2.recoveryEmployBookInStocker" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="恢复用工手册入库日期：">
            <DatePicker v-model="file2.recoveryEmployBookInStockDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="寄档案回执人：">
            <Input v-model="file2.sendFileFeedbacker" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="寄档案回执日期：">
            <DatePicker v-model="file2.sendFileFeedbackDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="开存档证明人：">
            <Input v-model="file2.stockProver" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="开存档证明日期：">
            <DatePicker v-model="file2.stockProveDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      fileInfo1: {
        type: Object
      },
      fileInfo2: {
        type: Object
      }
    },
    data() {
      return {
        reservedFileNumberList: [],
        fileNumberList: [],
        placeList: [],
        placeAddList: [],
        placeStateList: [],
        fileOriginList: [],
      }
    },
    computed: {
      file1() {
        return this.fileInfo1;
      },
      file2() {
        return this.fileInfo2;
      }
    }
  }
</script>
