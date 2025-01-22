/* eslint-disable prettier/prettier */
import { CreateTypeDto } from './dto/createType.dto';
import { UpdateTypeDto } from './dto/updateType.dto';
import { Type } from './entity/type.entity';
import { TypeController } from './type.controller';
import { TypeModule } from './type.module';
import { TypeService } from './type.service';

export default {
  CreateTypeDto,
  UpdateTypeDto,
  TypeController,
  TypeService,
  TypeModule,
  Type,
};
