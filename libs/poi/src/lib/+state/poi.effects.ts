import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { map } from 'rxjs/operators';
import { PoiService } from '../poi.service';

import * as PoiActions from './poi.actions';
import * as PoiFeature from './poi.reducer';

@Injectable()
export class PoiEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PoiActions.initPoi),
      fetch({
        run: (action) => {
          return this.poiService.getAll().pipe(
            map(pois => PoiActions.loadPoiSuccess({ poi:
            pois}))
          )
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PoiActions.loadPoiFailure({ error });
        },
      })
    )
  );

  constructor(private poiService: PoiService) {

  }
}
