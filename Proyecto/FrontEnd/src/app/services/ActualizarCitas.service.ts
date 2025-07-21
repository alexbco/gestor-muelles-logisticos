import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActualizarCitasService {

    private subject: Subject<void> = new Subject<void>();

    emitirEvento(): void {
        this.subject.next();
    }

    obtenerEvento() {
        return this.subject.asObservable();
    }
    
    constructor() { }

}

