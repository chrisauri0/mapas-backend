<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
# Campus Dashboard — Ecosistema Multi-dispositivo

Sistema de mapeo y estadísticas del campus, compuesto por 3 aplicaciones sincronizadas:

- **PWA Móvil/TV (Angular)**: mapa interactivo con ruta óptima + dashboard tipo Smart TV
- **Wearable (Flutter)**: monitor de actividad (pasos + notificación de llegada)
- **Backend (NestJS)**: API REST + WebSocket Gateway

## Arquitectura



## Requisitos previos

- Node.js 20+
- pnpm
- Flutter SDK 3.44+
- Android Studio (con emulador Wear OS configurado)

## 1. Backend (NestJS)

```bash
cd horarios-tv-backend
pnpm install
pnpm run start:dev
```

Corre en `http://localhost:3000`

## 2. Frontend Angular (PWA)

```bash
cd angular-pwa
pnpm install
ng serve
```

Corre en `http://localhost:4200`

- Ruta `/map` → vista móvil con GPS y trazado de ruta óptima
- Ruta `/dashboard` → vista Smart TV con estadísticas en vivo

## 3. Wearable (Flutter)

```bash
cd campus_wearable
flutter pub get
flutter run -d emulator-5554
```

> Antes de correr, actualiza la IP en `lib/main.dart` (variable `apiUrl`) con la IP local de la máquina que corre el backend:
> ```bash
> hostname -I
> ```

## Flujo de sincronización

1. El usuario traza una ruta en `/map` (Angular)
2. El evento se emite vía WebSocket al backend NestJS
3. El backend actualiza estadísticas en tiempo real (usuarios activos, destino más buscado, ruta en vivo, distancia recorrida)
4. El dashboard `/dashboard` (Smart TV) y el wearable (Flutter, vía polling HTTP) reflejan los cambios en <2 segundos

## Variables de entorno

Cada proyecto (`angular-pwa`, `horarios-tv-backend`) requiere un archivo `.env` local (no incluido en el repo por seguridad). Ver `.env.example` en cada carpeta para las variables necesarias.

## Seguridad

- CSP configurada restringiendo `img-src`, `script-src`, `connect-src` a orígenes conocidos
- `.env` y credenciales excluidos del control de versiones
- Ver `SECURITY.md` para el detalle de OWASP Mobile Top 10 aplicado y aviso de privacidad (LFPDPPP)