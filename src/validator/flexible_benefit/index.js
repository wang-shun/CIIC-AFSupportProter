import {giftValidator} from './gift_validator'
import {marketValidate} from './market_validator'
import {transferValidator} from './transfer_validator'

const validator = {
  giftValidator,
  marketValidate,
  transferValidator,
};
export default {
  install(Vue) {
    Vue.prototype.$Validator = validator
  }
}
