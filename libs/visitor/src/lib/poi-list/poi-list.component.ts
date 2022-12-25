import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PoiActions, PoiSelectors } from '@portal-map-nx-ngrx/poi';
@Component({
  selector: 'portal-map-nx-ngrx-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.css'],
})
export class PoiListComponent implements OnInit {

  pois$ = this.store.select(PoiSelectors.selectAllPoi)

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PoiActions.initPoi())
  }
}