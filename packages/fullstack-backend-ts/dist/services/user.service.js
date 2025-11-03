"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const WinstonLoggerAdapter_1 = __importDefault(require("../adapters/logger/WinstonLoggerAdapter"));
class UserService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    craeteUser = async (data) => {
        try {
            const user = await this.repository.create(data);
            return user;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error(`${this}: createUser`, {
                message: error.message,
                stack: error.stack,
            });
            throw error;
        }
    };
}
exports.UserService = UserService;
