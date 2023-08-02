"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const notes_1 = require("./controllers/notes");
exports.router = express_1.default.Router();
//Create a note object/
exports.router.post('/', notes_1.createNote);
//Remove item/
exports.router.delete('/:id', notes_1.deleteNote);
//Edit item/
exports.router.patch('/:id', notes_1.editNote);
//Toggle Archive note item/
exports.router.patch('/toggle/:id', notes_1.toggleArchiveNote);
//Get all notes
exports.router.get('/', notes_1.getAllNotes);
//Retrieve item/
exports.router.get('/:id', notes_1.getOneNote);
//Get aggregated data statistics/
exports.router.get('/stats/all', notes_1.getStats);
//# sourceMappingURL=index.js.map