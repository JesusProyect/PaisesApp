import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  `
    li{
      cursor: pointer;
    }
  
  `
  ]
})
export class PorPaisComponent  {

  termino : string = '';
  terminoSugerencia: string = '';
  hayError: boolean = false;
  paises  : Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  

  constructor( private paisService: PaisService ) { }


  buscar( termino: string ){
    this.hayError = false;
    this.mostrarSugerencias = false;

    if(this.termino === termino){
      console.log('buscar')
      return
    }
    this.termino = termino;

    this.paisService.buscarPais( this.termino )
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

  sugerencias( termino: string){
    this.hayError = false;
    if(this.terminoSugerencia === termino || termino.length === 0){
      this.mostrarSugerencias = false;
      return
    }
    this.terminoSugerencia = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
    .subscribe( 
      { next: ( paises ) => {
          this.paisesSugeridos = paises.splice(0,5) ;
      },
        error: (e) => {
            this.paisesSugeridos = [];
          }
    })
  }

  buscarSugerido( termino: string ){
    this.buscar( termino );
  
  }


}
