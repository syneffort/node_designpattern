const logger = require('./logger');

logger.log('This is informational message');

// 클래스 인스턴스로 전달되었더라도 새로운 인스턴스 생성을 막지는 못함
const customLogger = new logger.constructor('CUSTOM');
customLogger.log('This is informational message');