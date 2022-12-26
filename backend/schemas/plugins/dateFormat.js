"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("dayjs"));
function modifyDates(format, obj) {
    if (obj) {
        Object.keys(obj).forEach((k) => {
            if (obj[k] instanceof Date)
                obj[k] = moment_1.default(obj[k]).format(format);
            if (typeof obj[k] === 'object')
                modifyDates(format, obj[k]);
        });
    }
}
function toJSON(format, schema) {
    let transform;
    const toJSON = schema.get('toJSON');
    if (toJSON && toJSON.transform) {
        transform = toJSON.transform;
    }
    schema.set('toJSON', Object.assign(toJSON || {}, {
        transform(doc, ret) {
            modifyDates(format, ret);
            if (transform) {
                return transform(doc, ret);
            }
        },
    }));
}

exports.declareFormat = (format) => {
    return toJSON.bind(null, format)
}
