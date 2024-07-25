/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CepService } from './cep.service';
import { Prisma } from '@prisma/client';

@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Post('/inserir')
  async create(@Body() data: Prisma.CepSearchCreateInput) {
    console.log('Dados recebidos no backend:', data);
    return this.cepService.createCepSearch(data);
  }
}
