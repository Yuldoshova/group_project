import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update.banner.dto';
import { Banner } from './entities/banner.entity';
import { BannerController } from './banner.controller';
import { BannerModule } from './banner.module';
import { BannerService } from './banner.service';

export default {
  CreateBannerDto,
  UpdateBannerDto,
  Banner,
  BannerController,
  BannerModule,
  BannerService,
};
