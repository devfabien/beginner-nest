import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ishimwefabien1:Qwerty123@cluster0.klbowej.mongodb.net/',
    ),
  ],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule {}
