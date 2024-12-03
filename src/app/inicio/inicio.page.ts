import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  slides = [
    {
      image: 'assets/img/slide1.jpg',
      title: 'Lorem Ipsum es simplemente',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar d',
    },
    {
      image: 'assets/img/slide2.jpg',
      title: 'Lorem Ipsum es simplemente',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar d',
    },
    {
      image: 'assets/img/slide3.jpg',
      title: 'Lorem Ipsum es simplemente',
      description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar d',
    },
  ];
}
