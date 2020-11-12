import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from './core/core.module';
import { PostsModule } from './feature/posts/posts.module';
import { CommentsModule } from './feature/comments/comments.module';
import { RepliesModule } from './feature/replies/replies.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from './app.gateway';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist/apps/anomzone'),
      exclude: ['/api*'],
    }),
    CoreModule,
    PostsModule,
    CommentsModule,
    RepliesModule,
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
