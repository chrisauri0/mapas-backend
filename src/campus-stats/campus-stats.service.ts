import { Injectable } from '@nestjs/common';

interface RutaRegistro {
  destinoId: string;
  destinoNombre: string;
  origenNombre: string;
  distancia: number;
}
@Injectable()
export class CampusStatsService {
  private usuariosActivos = 0;
  private picoUsuariosHoy = 0;
  private totalRutasHoy = 0;

    private pasosHoy = 0;



  
  private busquedasPorDestino = new Map<string, { nombre: string; count: number }>();
  private distanciaTotalHoy = 0;
  private ultimaRuta: {
    origenNombre: string;
    destinoNombre: string;
    timestamp: string;
  } | null = null;

  incrementUsuarios(): void {
    this.usuariosActivos++;
    if (this.usuariosActivos > this.picoUsuariosHoy) {
      this.picoUsuariosHoy = this.usuariosActivos;
    }
  }

  decrementUsuarios(): void {
    this.usuariosActivos = Math.max(0, this.usuariosActivos - 1);
  }



registrarPasos(cantidad: number): void {
  this.pasosHoy += cantidad;
}

getActividadWearable() {
  return {
    pasosHoy: this.pasosHoy,
    ultimaLlegada: this.ultimaRuta, // reusamos el mismo dato que ya tienes
  };
}

  registrarRuta(payload: RutaRegistro): void {
    const actual = this.busquedasPorDestino.get(payload.destinoId) ?? {
      nombre: payload.destinoNombre,
      count: 0,
    };
    actual.count++;
    this.busquedasPorDestino.set(payload.destinoId, actual);

    this.distanciaTotalHoy += payload.distancia;
    this.totalRutasHoy++;

    this.ultimaRuta = {
      origenNombre: payload.origenNombre,
      destinoNombre: payload.destinoNombre,
      timestamp: new Date().toISOString(),
    };
  }

  getStats() {
    return {
      usuariosActivos: this.usuariosActivos,
      picoUsuariosHoy: this.picoUsuariosHoy,
      masBuscado: this.getMasBuscado(),
      distanciaTotalHoyMetros: Math.round(this.distanciaTotalHoy),
      totalRutasHoy: this.totalRutasHoy,
      ultimaRuta: this.ultimaRuta,
    };
  }

  private getMasBuscado(): { nombre: string; count: number } | null {
    let top: { nombre: string; count: number } | null = null;
    this.busquedasPorDestino.forEach((entry) => {
      if (!top || entry.count > top.count) top = entry;
    });
    return top;
  }
}