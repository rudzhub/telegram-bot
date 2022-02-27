import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { DataModule } from 'src/data/data.module';
import { ActionsModule } from 'src/actions/actions.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '5227368679:AAG6NMaoWxG7AOYcnpK0eMigxOYa6vwYpsU',
      include: [ActionsModule],
    }),
    DataModule,
    ActionsModule,
  ],
})
export class AppModule {}
