import { Component, OnInit } from '@angular/core';
import { Muelles, TipoMuelles } from 'src/app/services/Interfaces/citas.interface';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-descripcion-muelles',
  templateUrl: './descripcion-muelles.component.html',
  styleUrls: ['./descripcion-muelles.component.css']
})
export class DescripcionMuellesComponent implements OnInit {
  muelles_disponibles: Muelles[] = [];
  tipo_muelles: TipoMuelles[] = [];
  fecha_formateada: string = '';  
  loading: boolean = true;

  constructor(private citas: CitasService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){    
    this.getMuelles();
    this.getTipoMuelles();
  }

  getMuelles() {
    this.citas.muelles().subscribe(
      (response: Muelles[] | any) => {
        this.muelles_disponibles = response;
        this.loading = false; // Establecer a false después de recibir la respuesta
      },
      (error: any) => {
        this.loading = false;
        console.log('Error al obtener los muelles:', error);
      }
    );
  }

  getTipoMuelles(){
    this.citas.tipoMuelles().subscribe(
      (response: TipoMuelles[] | any) => {
        this.tipo_muelles = response;
        this.loading = false; // Establecer a false después de recibir la respuesta
      },
      (error: any) => {
        this.loading = false;
        console.log('Error al obtener los muelles:', error);
      }
    );
  }

  getDescripcionMuelle(tipoCamionID: number): string {
    const muelle = this.tipo_muelles.find(m => m.id === tipoCamionID);
    return muelle ? muelle.descripcion : '';
  }
}
