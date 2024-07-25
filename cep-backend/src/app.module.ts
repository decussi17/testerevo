/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CepModule } from './cep/cep.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CepModule, PrismaModule],
})
export class AppModule {}
