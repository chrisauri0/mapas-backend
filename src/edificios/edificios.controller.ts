import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { EdificiosService } from './edificios.service';

@Controller('edificios')
export class EdificiosController {
  constructor(private readonly edificiosService: EdificiosService) {}

  @Get()
  findAll() {
    return this.edificiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const edificio = this.edificiosService.findOne(id);
    if (!edificio) throw new NotFoundException(`Edificio ${id} no encontrado`);
    return edificio;
  }
}