import {Injectable} from "@nestjs/common";
import {UserNote} from "../../Module";

@Injectable()
export class NotesService {
  async createNote(newNote) {
    return await UserNote.create(newNote);
  }

  async editNote(id: number, updatedNote) {
    const existingNote = await UserNote.findOne({ where: { id } });
    if (existingNote) {
      return await existingNote.update(updatedNote);
    } else {
      throw new Error('Note not found');
    }
  }

  async deleteNote(id: number) {
    const noteToDelete = await UserNote.findOne({ where: { id } });
    if (noteToDelete) {
      await noteToDelete.destroy();
    } else {
      throw new Error('Note not found');
    }
  }

  async archiveNote(id: number) {
    const noteToArchive = await UserNote.findOne({ where: { id } });
    if (noteToArchive) {
      noteToArchive.setDataValue('archived', true);
      await noteToArchive.save();
      return noteToArchive;
    } else {
      throw new Error('Note not found');
    }
  }

  async unArchiveNote(id: number) {
    const noteToArchive = await UserNote.findOne({ where: { id } });
    if (noteToArchive) {
      noteToArchive.setDataValue('archived', false);
      await noteToArchive.save();
      return noteToArchive;
    } else {
      throw new Error('Note not found');
    }
  }

  async getAllNotes() {
    return await UserNote.findAll();
  }

  async getOneNote(id: number) {
    const note = await UserNote.findOne({ where: { id } });
    if (note) {
      return note;
    } else {
      throw new Error('Note not found');
    }
  }

  async getStats() {
    try {
      const allNotes = await UserNote.findAll();
      const categoriesCount = allNotes.reduce((acc, note) => {
        const status: "archived" | "active" = note.archived ? 'archived' : 'active';
        const category: string = note.category;

        acc[category] = acc[category] || {active: 0, archived: 0}
        acc[category][status]++
        return acc
      }, {})
      return categoriesCount;
    } catch (error) {
      console.error('Error getting stats:', error);
    }
  }
}