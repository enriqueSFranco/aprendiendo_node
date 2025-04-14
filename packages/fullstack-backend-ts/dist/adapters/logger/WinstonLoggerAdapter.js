"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
var LevelKey;
(function (LevelKey) {
    LevelKey["LOG"] = "log";
    LevelKey["INFO"] = "info";
    LevelKey["WARN"] = "warn";
    LevelKey["ERROR"] = "error";
    LevelKey["DEBUG"] = "debug";
})(LevelKey || (LevelKey = {}));
class WinstonLoggerAdapter {
    logger;
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: LevelKey.DEBUG,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
            transports: [new winston_1.default.transports.Console()],
        });
    }
    debug(message, meta) {
        this.logger.debug(message, { meta });
    }
    info(message, meta) {
        this.logger.info(message, { meta });
    }
    warn(message, meta) {
        this.logger.warn(message, { meta });
    }
    error(message, meta) {
        this.logger.error(message, { meta });
    }
}
const winstonLoggerAdapter = new WinstonLoggerAdapter();
exports.default = winstonLoggerAdapter;
