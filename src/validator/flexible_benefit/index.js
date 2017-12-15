import {giftValidator} from './gift_validator'
import {marketValidate} from './market_validator'
import {transferValidator,reimbursementValidator} from './transfer_validator'

const validator = {
  giftValidator,
  marketValidate,
  transferValidator,
  reimbursementValidator,
};
export default {
  install(Vue) {
    Vue.prototype.$Validator = validator
  }
}
