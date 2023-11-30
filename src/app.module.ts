import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [MongooseModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
