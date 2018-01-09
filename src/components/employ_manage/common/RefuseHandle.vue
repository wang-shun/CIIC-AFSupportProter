<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工日期：">
            {{refuse.refuseDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="首次进入日期：">
            {{refuse.firstInDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="终止类型：">
            <Select v-model="refuse.endTypeValue" transfer>
              <Option v-for="(endType, index) in endTypeList" :key="index">{{endType}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="打印日期：">
            <DatePicker v-model="refuse.printDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="人员性质：">
            <Select v-model="refuse.personPropertyValue" transfer>
              <Option v-for="(personProperty, index) in personPropertyList" :key="index">{{personProperty}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档方向：">
            <Select v-model="refuse.refuseFileDirectionValue" transfer>
              <Option v-for="(refuseFileDirection, index) in refuseFileDirectionList" :key="index">{{refuseFileDirection}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档日期：">
            <DatePicker v-model="refuse.refuseFileDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移方式：">
            <Select v-model="refuse.transferMethodValue" transfer>
              <Option v-for="(transferMethod, index) in transferMethodList" :key="index">{{transferMethod}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移备注：">
            <Select v-model="refuse.transferNotesValue" transfer>
              <Option v-for="(transferNotes, index) in transferNotesList" :key="index">{{transferNotes}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移备注补充：">
            <Input v-model="refuse.transferNotesAdd" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="暂存日期：">
            <DatePicker v-model="refuse.templatorStoreDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工原因：">
            {{refuse.refuseReason}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案保管意向：">
            {{refuse.fileCustodyIntention}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工送办日期：">
            <DatePicker v-model="refuse.refuseHandleDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈：">
            <Select v-model="refuse.refuseFeedbackValue" transfer>
              <Option v-for="(refuseFeedback, index) in refuseFeedbackList" :key="index">{{refuseFeedback}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈日期：">
            <DatePicker v-model="refuse.refuseFeedbackDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈2：">
            <Select v-model="refuse.refuseFeedbackValue2" transfer>
              <Option v-for="(refuseFeedback, index) in refuseFeedbackList2" :key="index">{{refuseFeedback}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈2日期：">
            <DatePicker v-model="refuse.refuseFeedbackDate2" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工操作员：">
            <Input v-model="refuse.refuseOperator" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey外借日期：">
            <DatePicker v-model="refuse.UKeyBorrowDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey返回日期：">
            <DatePicker v-model="refuse.UKeyReturnDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案编号：">
            <Input v-model="refuse.fileIndex" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地：">
            <Input v-model="refuse.storeFilePlace" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="入库日期：">
            <DatePicker v-model="refuse.inStockDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案反馈：">
            <Input v-model="refuse.fileFeedback" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工成功：">
            <Input v-model="refuse.employSuccess" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="反馈备注：">
            <Input v-model="refuse.feedbackNotes" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司集体转出方向：">
            <Select v-model="refuse.companyGroupTransferDirectionValue" transfer>
              <Option v-for="(companyGroupTransferDirection, index) in companyGroupTransferDirectionList" :key="index">{{companyGroupTransferDirection}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="预留档案编号：">
            {{refuse.reservedFileNumber}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地补充：">
            {{refuse.storeFilePlaceAdd}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案号：">
            {{refuse.fileNumber}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档卡状态：">
            {{refuse.storeCardState}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="办理类型：">
            {{refuse.handleType}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="refuse.isNetworkHandle">是否网办</Checkbox>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="职介反馈日期：">
            <DatePicker v-model="refuse.intermediaryFeedbackDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工材料交付日期：">
            <DatePicker v-model="refuse.refuseMaterialsDeliverDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="劳动手册是否交被退人员：">
            <Select v-model="refuse.LaborManualIsDeliverRefuserValue" transfer>
              <Option v-for="(LaborManualIsDeliverRefuser, index) in LaborManualIsDeliverRefuserList" :value="LaborManualIsDeliverRefuser.value" :key="index">{{LaborManualIsDeliverRefuser.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="对应用工序号：">
            <Input v-model="refuse.matchEmployIndex" placeholder="请输入"/>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary">保存</Button>
          <Button type="primary">绑定</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      refuseInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        endTypeList: [],
        personPropertyList: [],
        refuseFileDirectionList: [],
        transferMethodList: [],
        transferNotesList: [],
        refuseFeedbackList: [],
        refuseFeedbackList2: [],
        companyGroupTransferDirectionList: [],
        LaborManualIsDeliverRefuserList: [
          {label: "已交", value: 0},
          {label: "未交", value: 1}
        ]
      }
    },
    computed: {
      refuse() {
        return this.refuseInfo;
      }
    }
  }
</script>
