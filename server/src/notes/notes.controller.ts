import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import {NoteDto} from "./dto/note.dto";

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() noteDto: NoteDto) {
    return this.notesService.createNote(noteDto);
  }

  @Patch(':id')
  edit(@Param('id') id: string, @Body() noteDto: NoteDto) {
    return this.notesService.editNote(+id, noteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.deleteNote(+id);
  }

  @Patch('archive/:id')
  archive(@Param('id') id: string) {
    return this.notesService.archiveNote(+id);
  }

  @Patch('unarchive/:id')
  unArchive(@Param('id') id: string) {
    return this.notesService.unArchiveNote(+id);
  }

  @Get()
  getAll() {
    return this.notesService.getAllNotes();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.notesService.getOneNote(+id);
  }

  @Get('stats/all')
  getStats() {
    return this.notesService.getStats();
  }
}
