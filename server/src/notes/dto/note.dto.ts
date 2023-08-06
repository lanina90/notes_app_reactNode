import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  title: string;

  @IsString()
  created: string;

  @IsString()
  category: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  dates?: string;

  @IsBoolean()
  archived: boolean;
}