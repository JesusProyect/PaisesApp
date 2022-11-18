import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right: 5px; 
    }
  `
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = [ 'EU', 'EFTA', 'CARICOM','PA', 'AU', 'USAN','EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'  ];
  regionActiva: string = '';
  paises: Country[] = [];
  hayError: boolean = false;
  termino: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  activarRegion( region: string ){

    if(region === this.regionActiva) {return}

    this.regionActiva = region;
    this.paises = [];
    this.hayError = false;
    //asi creo que esta deprecated no me queda claro creo 
    this.paisService.buscarRegion(region)
      .pipe( //esto no es necesario pero aja para tenerlo de ejemplo lo dejo
        tap(console.log)
      )
      .subscribe( {//asi es la manera actual
        next: (paises) => this.paises = paises,
        error: (e) => {
          this.hayError = true;
          this.paises = [];
        }
      }
      )
     
     
  }

  getClaseCss( region: string): string{
    return (region === this.regionActiva) 
              ? 'btn btn-primary' 
              : 'btn btn-outline-primary '
  }
}
