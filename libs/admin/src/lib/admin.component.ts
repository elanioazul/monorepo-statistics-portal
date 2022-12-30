import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PoiActions, PoiEntity, PoiSelectors } from '@portal-map-nx-ngrx/poi';
import { Subscription } from 'rxjs';
import { runInThisContext } from 'vm';
import { AdminService } from './admin.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'portal-map-nx-ngrx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {

  public dataToDisplay!: any;
  public chartOptions!: any;

  private subscription: Subscription | undefined;

  constructor(
    private store: Store,
    private adminS: AdminService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
      this.subscription = this.store.select(PoiSelectors.selectAllPoi)
      .subscribe(pois => {
        this.buidChart(pois)
      })
      this.store.dispatch(PoiActions.initPoi())
  }

  buidChart(pois: PoiEntity[]): void {
    const labelsArr = pois.map(poi => poi.name);
    this.dataToDisplay = {
      labels: labelsArr,
      datasets: [
        {
          data: this.adminS.getStatistics(pois),
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
        ],
        hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
        ]
        }
      ]
    }
    this.chartOptions = {
      title: {
          display: true,
          text: 'Article Views',
          fontSize: 32,
          position: 'top',
      },
      plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
  };
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
