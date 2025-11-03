"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../../schemas/user.schema"));
const AppError_1 = __importDefault(require("../../utils/errors/AppError"));
const WinstonLoggerAdapter_1 = __importDefault(require("../../adapters/logger/WinstonLoggerAdapter"));
class MongoDatabaseUserRepository {
    create = async (user) => {
        try {
            if (!user.email.trim() || !user.password.trim() || !user.username.trim())
                throw new AppError_1.default("username and email and password are required", 400);
            const row = new user_schema_1.default(user);
            const savedUser = await row.save();
            return {
                id: savedUser.id,
                username: savedUser.username,
                email: savedUser.email,
                password: savedUser.password,
                active: savedUser.active,
            };
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.debug(`[${this}:create] Failed to create user`, {
                message: error.message,
                stack: error.stack,
            });
            throw err;
        }
    };
    findAll = async () => {
        try {
            const users = await user_schema_1.default.find().lean();
            return users;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error(`[${this}:findAll] Failed to retrieve users`, {
                message: error.message,
                stack: error.stack,
            });
            throw new AppError_1.default("Failed to retrieve todo items", 500);
        }
    };
    findById = async (_id) => {
        try {
            const user = await user_schema_1.default.findById(_id).lean();
            if (!user)
                throw new AppError_1.default(`User with id "${_id}" not found`, 404);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unkown error");
            WinstonLoggerAdapter_1.default.error(`[${this}:findById] Failed to retrieve user`, {
                message: error.message,
                stack: error.stack,
            });
        }
    };
    update = async (_id, data) => {
        const updateData = {};
        if (data.username)
            updateData.username = data.username.trim();
        if (data.email)
            updateData.email = data.email.trim();
        if (data.password)
            updateData.password = data.password.trim();
        try {
            const user = await user_schema_1.default.findByIdAndUpdate({ _id }, {
                $set: updateData,
            }, { new: true, runValidators: true });
            return user;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error(`[${this}:update] Failed to update user`, {
                message: error.message,
                stack: error.stack,
            });
        }
    };
    delete = async (_id) => {
        try {
            if (!_id || !_id.trim()) {
                throw new AppError_1.default("User ID is required", 400);
            }
            const deletedDoc = await user_schema_1.default.findByIdAndDelete(_id).exec();
            if (!deletedDoc) {
                throw new AppError_1.default(`User with id '${_id}' not found`, 404);
            }
            return {
                id: deletedDoc.id.toString(),
                username: deletedDoc.username,
                email: deletedDoc.email,
                password: deletedDoc.password,
                active: deletedDoc.active,
            };
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Unknown error");
            WinstonLoggerAdapter_1.default.error("[UserRepository:delete] Failed to delete user", {
                id: _id,
                message: error.message,
                stack: error.stack,
            });
            if (error instanceof AppError_1.default)
                throw error;
            throw new AppError_1.default("Failed to delete the user. Please try again later.", 500);
        }
    };
}
const mongoDatabaseUserRepository = new MongoDatabaseUserRepository();
exports.default = mongoDatabaseUserRepository;
