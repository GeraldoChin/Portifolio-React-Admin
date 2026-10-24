import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUrl, MaxLength, Min, ValidateIf } from 'class-validator';

export class CreateProjectDto {
  @IsString() @MaxLength(120) title: string;
  @IsString() @MaxLength(10000) description: string;
  @IsString() @MaxLength(80) category: string;
  @IsOptional() @IsString() @MaxLength(40) status?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) techs?: string[];
  @IsOptional() @ValidateIf((_o, value) => value !== '') @IsUrl({ require_protocol: true }) liveUrl?: string;
  @IsOptional() @ValidateIf((_o, value) => value !== '') @IsUrl({ require_protocol: true }) githubUrl?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() @Min(0) sortOrder?: number;
}
