import { Injectable } from '@nestjs/common';
import { Edificio } from './interfaces/edificio.interface';

@Injectable()
export class EdificiosService {
  private readonly edificios: Edificio[] = [
    {
      id: 'edif-a',
      nombre: 'Edificio A - Ingeniería',
      tipo: 'Aulas',
      ocupacionActual: 68,
      distanciaDesdeEntrada: 120,
      mediaUrl: '/media/edificio-a.mp4',
    },
    {
      id: 'edif-b',
      nombre: 'Edificio B - Laboratorios',
      tipo: 'Laboratorio',
      ocupacionActual: 45,
      distanciaDesdeEntrada: 200,
      mediaUrl: '/media/edificio-b.mp4',
    },
    {
      id: 'biblioteca',
      nombre: 'Biblioteca Central',
      tipo: 'Servicios',
      ocupacionActual: 82,
      distanciaDesdeEntrada: 300,
      mediaUrl: '/media/biblioteca.mp4',
    },
    {
      id: 'administrativo',
      nombre: 'Edificio Administrativo',
      tipo: 'Administrativo',
      ocupacionActual: 30,
      distanciaDesdeEntrada: 150,
      mediaUrl: '/media/administrativo.mp4',
    },
  ];

  findAll(): Edificio[] {
    return this.edificios;
  }

  findOne(id: string): Edificio | undefined {
    return this.edificios.find((e) => e.id === id);
  }
}