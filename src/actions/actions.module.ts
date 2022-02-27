import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { ActionsUpdate } from './actions.update';

@Module({
  imports: [DataModule],
  providers: [ActionsUpdate],
})
export class ActionsModule {}
