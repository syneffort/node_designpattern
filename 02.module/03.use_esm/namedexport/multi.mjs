import { log, Logger } from './logger.mjs';

log('Hello node');

const logger = new Logger('DEFAULT');
logger.log('Hello node');