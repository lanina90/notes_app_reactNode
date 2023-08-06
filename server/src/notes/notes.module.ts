import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserNote} from "../../Module";
import {NotesController} from "./notes.controller";
import {NotesService} from "./notes.service";


@Module({
  imports: [SequelizeModule.forFeature([UserNote])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}