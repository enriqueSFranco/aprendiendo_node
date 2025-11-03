"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDatabase = connectionDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectionDatabase() {
    try {
        await mongoose_1.default.connect("mongodb://user:password@host:port/database?options");
    }
    catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        return error;
        // console.error("ha ocurrido un error en la base de datos");
    }
}
