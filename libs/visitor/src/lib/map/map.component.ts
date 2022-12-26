import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PoiSelectors } from '@portal-map-nx-ngrx/poi';

import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import LayerTile from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import { Zoom } from 'ol/control';
import Feature from 'ol/Feature';
import * as olCoordinate from 'ol/coordinate';
import Select from 'ol/interaction/Select';
import * as olEvents from 'ol/events/condition';

import { poiPoints } from '../data/data-pois';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { type } from 'os';

const poiArr = [
  {
    "id": 1,
    "lat": 37.97170989160553,
    "lng": 23.725749197701326,
    "name": "Acropolis",
    "description": "Acropolis of Athens",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg/390px-The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg"
  },
  {
    "id": 2,
    "lat": 38.50172172340826,
    "lng": 22.51021540014237,
    "name": "Delphi",
    "description": "Delphi",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ac.delphi1.jpg/450px-Ac.delphi1.jpg"
  },
  {
    "id": 3,
    "lat": 40.62660913661512,
    "lng": 22.948404240113845,
    "name": "White Tower",
    "description": "White Tower of Thessaloniki",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/WhiteTowerThessaloniki_%283%29.JPG/330px-WhiteTowerThessaloniki_%283%29.JPG"
  }
]


@Component({
  selector: 'portal-map-nx-ngrx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  map!: Map;
  public zoom = new Zoom();
  public poisPoints = new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(poiPoints, {
        dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'
      })
    }),
    style: new Style({
      image: new Icon({
        anchorOrigin: 'top-right',
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        opacity: 0.8,
        src: 'assets/pin.png'
      })
    })
  });

  poi$ = this.store.select(PoiSelectors.selectSelectedId);
  poiToFlytTo!: any;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.poi$.subscribe(id => {
      this.poiToFlytTo = poiArr.find(poi => poi.id === id);
      if (this.poiToFlytTo) {
        this.updateView([this.poiToFlytTo.lng, this.poiToFlytTo.lat])
      }
    })
    this.map = new Map ({
      target: 'mapcanvas',
      layers: [ new LayerTile ({
        visible: true,
        opacity: 0.8,
        source: new OSM(),
        maxZoom: 18
      }), this.poisPoints],
      view: new View({
        projection: 'EPSG:3857',
        center: [2511955.6028959635, 4610645.880154711],
        zoom: 7
      }),
      controls: [this.zoom]
    });
    this.map.addInteraction(new Select({
      condition: olEvents.click,
      layers: [this.poisPoints],
      style: null,
      multi: false,
      hitTolerance: 2
    }));


  }

  updateView(coordinates: olCoordinate.Coordinate): void {
    const newView = new View({
      center: fromLonLat(coordinates),
      zoom: 12
    });
    this.map.setView(newView);
  }
}
