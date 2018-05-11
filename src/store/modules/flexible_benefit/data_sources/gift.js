/**
 * 礼品类型
 * @type {[null,null,null,null,null,null,null]}
 */
const giftTypeProperties = [
  {
    value: '0', label: '票券'
  },
  {
    value: '1', label: '办公用品'
  },
  {
    value: '2', label: '生活用品'
  },
  {
    value: '3', label: '食品'
  },
  {
    value: '4', label: '饰品'
  },
  {
    value: '5', label: '数码周边'
  },
  {
    value: '6', label: '儿童用品'
  },
  {
    value: '7', label: '其他'
  }
];

/**
 * 礼品状态
 * @type {[null,null,null]}
 */
const statusProperties = [
  {
    value: "0", label: "正常"
  },
  {
    value: "1", label: "已下架"
  }
];

const rightPersonTypes = [
  {
    value: '0', label: '男士适用'
  },
  {
    value: '1', label: '女士适用'
  },
  {
    value: '2', label: '男女通用'
  }
];

/**
 * 健康医疗公共数据
 * 下拉框
 */
export default {
  giftTypeProperties,
  statusProperties,
  rightPersonTypes,
};
