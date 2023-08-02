"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.getOneNote = exports.getAllNotes = exports.toggleArchiveNote = exports.deleteNote = exports.editNote = exports.createNote = void 0;
const MockedDB_json_1 = __importDefault(require("../../repositories/MockedDB.json"));
const validators_1 = require("../../helpers/validators");
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newNote = req.body;
        validators_1.noteSchema.validateSync(newNote);
        const createdNote = Object.assign({}, newNote);
        MockedDB_json_1.default.push(createdNote);
        res.status(201).json(createdNote);
    }
    catch (e) {
        res.status(400).json({ message: 'Failed to create the note. Please ensure all fields are filled correctly.' });
    }
});
exports.createNote = createNote;
const editNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedNote = req.body;
        yield validators_1.noteSchema.validate(updatedNote);
        const index = MockedDB_json_1.default.findIndex((n) => n.id === id);
        if (index >= 0) {
            MockedDB_json_1.default[index] = Object.assign(Object.assign({}, MockedDB_json_1.default[index]), updatedNote);
            res.json(MockedDB_json_1.default[index]);
        }
        else {
            res.status(404).json({ message: 'Note not found' });
        }
    }
    catch (e) {
        res.status(500).json({ message: 'An error occurred while updating the note.' });
    }
});
exports.editNote = editNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const index = MockedDB_json_1.default.findIndex((n) => n.id === id);
        if (index >= 0) {
            const deletedNote = MockedDB_json_1.default.splice(index, 1)[0];
            res.json(deletedNote);
        }
        else {
            res.status(404).json({ message: 'Note not found' });
        }
    }
    catch (e) {
        res.status(500).json({ message: 'An error occurred while deleting the note.' });
    }
});
exports.deleteNote = deleteNote;
const toggleArchiveNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { archived } = req.body;
        const index = MockedDB_json_1.default.findIndex((n) => n.id === id);
        validators_1.toggleArchiveNoteSchema.validateSync({ archived });
        if (index !== -1) {
            MockedDB_json_1.default[index] = Object.assign(Object.assign({}, MockedDB_json_1.default[index]), { archived: archived });
            res.json(MockedDB_json_1.default[index]);
        }
        else {
            res.status(404).json({ message: 'Note not found' });
        }
    }
    catch (e) {
        res.status(500).json({ message: 'An error occurred while updating the note.' });
    }
});
exports.toggleArchiveNote = toggleArchiveNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(MockedDB_json_1.default);
    }
    catch (e) {
        res.status(500).json({ message: 'An error occurred while fetching all notes.' });
    }
});
exports.getAllNotes = getAllNotes;
const getOneNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = MockedDB_json_1.default.find((n) => n.id === id);
        if (note) {
            validators_1.noteSchema.validateSync(note);
            res.json(note);
        }
        else {
            res.status(404).json({ message: 'Note not found' });
        }
    }
    catch (e) {
        res.status(500).json({ message: 'An error occurred while fetching the note.' });
    }
});
exports.getOneNote = getOneNote;
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriesCount = MockedDB_json_1.default.reduce((acc, note) => {
            const status = note.archived ? 'archived' : 'active';
            const category = note.category;
            acc[category] = acc[category] || { active: 0, archived: 0 };
            acc[category][status]++;
            return acc;
        }, {});
        res.json(categoriesCount);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching statistics.' });
    }
});
exports.getStats = getStats;
//# sourceMappingURL=notes.js.map