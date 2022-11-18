import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino : string = '';
  terminoSugerencia: string = '';
  mostrarSugerencias: boolean = false;
  paisesSugeridos: Country[] = [];
  hayError: boolean = false;
  paises  : Country[] = [];
  
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {}

  buscar( termino: string ){
    this.hayError = false;
    this.mostrarSugerencias = false;
    if(this.termino === termino){return}
    this.termino = termino;

    this.paisService.buscarCapital( this.termino )
      .subscribe( {
        next: ( paises ) => {
          this.paises = paises;
        },
        error: ( err ) => {
          this.hayError = true;
          this.paises = [];
        }
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    if( this.terminoSugerencia === termino ){return}
    this.mostrarSugerencias = true;
    this.terminoSugerencia = termino;
    //TODO: crear sugerencias lo haremos en la siguiente seccion

    this.paisService.buscarCapital( this.terminoSugerencia )

      .subscribe({
        next: (paises) => { this.paisesSugeridos = paises.splice(0,5)},
        error: (e) => { this.paisesSugeridos = [] }
      });
  }

  buscarSugerido( termino: string){
    this.buscar( termino );
  }

}
