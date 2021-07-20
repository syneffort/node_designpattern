// default export 사용 시 import 때 이름을 지정할 수 있음
import MyLogger from './logger.mjs';
const logger = new MyLogger('info');

logger.log('Hello node');