
import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('nuestro-universo');

  fechaInicio: Date = new Date(2021, 9, 26);

  anios: number = 0;
  meses: number = 0;
  dias: number = 0;

  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  
  
diasFaltantes: number = 0;
horasFaltantes: number = 0;
minutosFaltantes: number = 0;
segundosFaltantes: number = 0;

  cartaAbierta: boolean = false;


calcularTiempo(): void {
  const ahora = new Date();
  const inicio = this.fechaInicio;

  const diferencia = ahora.getTime() - inicio.getTime();

  this.segundos = Math.floor(diferencia / 1000) % 60;
  this.minutos = Math.floor(diferencia / 60000) % 60;
  this.horas = Math.floor(diferencia / 3600000) % 24;

  let anios = ahora.getFullYear() - inicio.getFullYear();
  let meses = ahora.getMonth() - inicio.getMonth();
  let dias = ahora.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;

    const diasMesAnterior = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      0
    ).getDate();

    dias += diasMesAnterior;
  }

  if (meses < 0) {
    anios--;
    meses += 12;
  }

  this.anios = anios;
  this.meses = meses;
  this.dias = dias;
}

alternarCarta(): void {
  this.cartaAbierta = !this.cartaAbierta;
}


calcularCuentaRegresiva(): void {
  const ahora = new Date();

  let aniversario = new Date(
    ahora.getFullYear(),
    9,
    26,
    0, 0, 0
  );

  if (ahora >= aniversario) {
    aniversario = new Date(
      ahora.getFullYear() + 1,
      9,
      26,
      0, 0, 0
    );
  }

  const diferencia = aniversario.getTime() - ahora.getTime();

  this.diasFaltantes = Math.floor(diferencia / 86400000);
  this.horasFaltantes = Math.floor(diferencia / 3600000) % 24;
  this.minutosFaltantes = Math.floor(diferencia / 60000) % 60;
  this.segundosFaltantes = Math.floor(diferencia / 1000) % 60;
}



 constructor(private cdr: ChangeDetectorRef) {
  this.calcularTiempo();
  this.calcularCuentaRegresiva();

  setInterval(() => {
    this.calcularTiempo();
    this.calcularCuentaRegresiva();
    this.cdr.detectChanges();
  }, 1000);
}
}
