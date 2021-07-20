require('./patcher');
const logger = require('./logger');

// 런타임 시점에서 기존 객체를 수정하는 방법은 권장되지 않음!
logger.customMessage();