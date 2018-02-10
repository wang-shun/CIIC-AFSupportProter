<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工日期：">
            {{refuse.resignDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="首次进入日期：">
            {{refuse.firstInDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="终止类型：">
             {{refuse.endType}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="打印日期：">
             {{refuse.printDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="人员性质：">
             {{refuse.empCharacter}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档方向：">
             {{refuse.returnDocDirect}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退档日期：">
             {{refuse.returnDocDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移方式：">
             {{refuse.transferWay}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移备注：">
             {{refuse.transferRemark}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="转移备注补充：">
            {{refuse.transferRemark1}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="暂存日期：">
            {{refuse.cacheDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工原因：">
            {{refuse.resignReason}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案保管意向：">
            {{refuse.docHoldIntent}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工送办日期：">
            {{refuse.resignHandleDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈：">
            {{refuse.resignFeedback1}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈日期：">
            {{refuse.resignFeedbackDate1}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈2：">
            {{refuse.resignFeedback2}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工反馈2日期：">
            {{refuse.resignFeedbackDate2}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工操作员：">
            {{refuse.resignOperateMan}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          {{refuse.ukeyBorrowDate}}
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          {{refuse.ukeyReturnDate}}
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          {{refuse.docNum}}
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          {{refuse.archivePlace}}
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="入库日期：">
            {{refuse.storageDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈：">
            {{refuse.diaodangFeedback}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工成功：">
            {{refuse.employSuccess}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="反馈备注：">
            {{refuse.feedbackNotes}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司集体转出方向：">
            {{refuse.comGroupOutDirect}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="预留档案编号：">
            {{refuse.yuliuDocNum}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地补充：">
            {{refuse.archivePlaceAdditional}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案号：">
            {{refuse.docCode}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档卡状态：">
            {{refuse.archiveCardState}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="办理类型：">
            {{refuse.handleType}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="refuse.ifNetwork" true-value="1" false-value="0">是否网办</Checkbox>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="职介反馈日期：">
            {{refuse.jobCentreFeedbackDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工材料交付日期：">
           {{refuse.resignMaterialDeliveryDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="劳动手册是否交被退人员：">
            {{refuse.ifLaborManualReturn}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="对应用工序号：">
            {{refuse.matchEmployIndex}}
          </Form-item>
        </Col>
      </Row>
      
    </Form>
  </div>
</template>
<script>
 import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      refuseInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        endTypeList: [
          {value: '空', label: '空'},
          {value: '合同终止', label: '合同终止'},
          {value: '合同解除', label: '合同解除'}
        ],
        personPropertyList: [
          {value: '空', label: '空'},
          {value: '上海户籍', label: '上海户籍'},
          {value: '居住证', label: '居住证'},
          {value: '外来从业人员', label: '外来从业人员'}
        ],
        refuseFileDirectionList: [
          {value: '户口所在地', label: '户口所在地'},
          {value: '市区人才', label: '市区人才'},
          {value: '徐汇', label: '徐汇'},
          {value: '科技人才', label: '科技人才'},
          {value: '暂存', label: '暂存'},
          {value: '其他', label: '其他'},
          {value: '转公司用工', label: '转公司用工'}
        ],
        transferMethodList: [
          {value: '空', label: '空'},
          {value: '职介所', label: '职介所'},
          {value: '其他', label: '其他'}
        ],
        transferNotesList: [
          {value: '空', label: '空'},
          {value: '档案未退先退工', label: '档案未退先退工'},
          {value: '徐职', label: '徐职'},
          {value: '转公司', label: '转公司'},
          {value: '转公司/暂存', label: '转公司/暂存'},
          {value: '转户口转档', label: '转户口转档'},
          {value: '无档', label: '无档'},
          {value: '退工单自行归档', label: '退工单自行归档'},
          {value: '用工不调', label: '用工不调'},
          {value: '退工不调档', label: '退工不调档'},
          {value: '居住证', label: '居住证'},
          {value: '红联自归', label: '红联自归'},
          {value: '退工不调', label: '退工不调'},
          {value: '属地管理', label: '属地管理'},
          {value: '农村富裕劳动力', label: '农村富裕劳动力'},
          {value: '自开退工单', label: '自开退工单'}
        ],
        refuseFeedbackList: [
          {value: '退工成功', label: '退工成功'},
          {value: '档案未退先退工', label: '档案未退先退工'},
          {value: '退工盖章未返回', label: '退工盖章未返回'},
          {value: '退工失败', label: '退工失败'},
          {value: '前道要求批退', label: '前道要求批退'},
          {value: '自开退工单', label: '自开退工单'},
          {value: '未交', label: '未交'},
          {value: '用工已办未反馈', label: '用工已办未反馈'},
          {value: '等翻牌联系单', label: '等翻牌联系单'},
          {value: 'Ukey外借', label: 'Ukey外借'},
          {value: '单项服务', label: '单项服务'},
          {value: '原退工成功', label: '原退工成功'},
          {value: '转外地社保', label: '转外地社保'},
          {value: '转人员性质无需退工', label: '转人员性质无需退工'},
          {value: '改社保', label: '改社保'},
          {value: '重复任务单', label: '重复任务单'},
          {value: '等修改备案表', label: '等修改备案表'}
        ],
        refuseFeedbackList2: [
           {value: '前道要求批退', label: '前道要求批退'},
           {value: '重打退工单', label: '重打退工单'},
           {value: '退工成功', label: '退工成功'},
           {value: '撤销退工', label: '撤销退工'},
           {value: '撤销退工等修改表', label: '撤销退工等修改表'}
        ],
        companyGroupTransferDirectionList: [
          {value: '空', label: '空'},
          {value: '公司自行管理', label: '公司自行管理'},
          {value: '外服', label: '外服'},
          {value: '四达', label: '四达'},
          {value: '北京外企', label: '北京外企'}
        ],
        LaborManualIsDeliverRefuserList: [
          {value: '0',label: "已交"},
          {value: '1',label: "未交"}
        ]
      }
    },
    computed: {
      refuse() {
        return this.refuseInfo;
      }
    },
    methods: {

       instance() {
        var fromData = this.$utils.clear(this.refuseInfo,'');
        fromData.employDate = this.$utils.formatDate(this.refuseInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        fromData.printDate = this.$utils.formatDate(this.refuseInfo.printDate, 'YYYY-MM-DD');
        fromData.returnDocDate = this.$utils.formatDate(this.refuseInfo.returnDocDate, 'YYYY-MM-DD');
        fromData.cacheDate = this.$utils.formatDate(this.refuseInfo.cacheDate, 'YYYY-MM-DD');
        fromData.resignHandleDate = this.$utils.formatDate(this.refuseInfo.resignHandleDate, 'YYYY-MM-DD');
        fromData.resignFeedbackDate1 = this.$utils.formatDate(this.refuseInfo.resignFeedbackDate1, 'YYYY-MM-DD');
        fromData.resignFeedbackDate2 = this.$utils.formatDate(this.refuseInfo.resignFeedbackDate2, 'YYYY-MM-DD');
        fromData.ukeyBorrowDate = this.$utils.formatDate(this.refuseInfo.ukeyBorrowDate, 'YYYY-MM-DD');
        fromData.ukeyReturnDate = this.$utils.formatDate(this.refuseInfo.ukeyReturnDate, 'YYYY-MM-DD');
        fromData.storageDate = this.$utils.formatDate(this.refuseInfo.storageDate, 'YYYY-MM-DD');
        fromData.intermediaryFeedbackDate = this.$utils.formatDate(this.refuseInfo.intermediaryFeedbackDate, 'YYYY-MM-DD');
        fromData.resignMaterialDeliveryDate = this.$utils.formatDate(this.refuseInfo.resignMaterialDeliveryDate, 'YYYY-MM-DD');
        fromData.jobCentreFeedbackDate = this.$utils.formatDate(this.refuseInfo.jobCentreFeedbackDate, 'YYYY-MM-DD');
       
        api.saveAmResign(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                 history.go(-1);
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
        })
         
       }
       
    }
  }
</script>
