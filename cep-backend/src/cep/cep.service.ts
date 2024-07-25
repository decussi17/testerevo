/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CepService {
  constructor(private prisma: PrismaService) {}

  async createCepSearch(data: Prisma.CepSearchCreateInput) {
    console.log(data);
    return this.prisma.cepSearch.create({
      data,
    });
  }

  async getCepSearches() {
    return this.prisma.cepSearch.findMany();
  }
}
