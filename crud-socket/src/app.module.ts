import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './websocket/events.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [EventModule, TestModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
