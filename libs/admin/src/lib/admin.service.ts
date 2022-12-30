import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LocalStorageService } from 'libs/poi/src/lib/local-storage.service';
import { PoiEntity } from '@portal-map-nx-ngrx/poi';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private LSservice: LocalStorageService) { }

  getStatistics(pois: PoiEntity[]): number[] {
    return pois.map(poi => {
      const stat = this.LSservice.getData('tour-' + poi.id) ?? 0;
      return +stat
    })
  }
}
