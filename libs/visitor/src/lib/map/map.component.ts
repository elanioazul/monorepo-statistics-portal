import { Component, ElementRef, OnInit, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PoiSelectors } from '@portal-map-nx-ngrx/poi';

import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
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
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild("mapcanvas", { static: false} ) mapDiv!: ElementRef<HTMLElement>;
  @ViewChild("popup", { static: false} ) overlayDiv!: ElementRef<HTMLElement>;
  @ViewChild("empty", { static: false} ) emptyDiv!: ElementRef<HTMLElement>;

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
  public selectInteractionFeatures = new Select({
    condition: olEvents.click,
    layers: [this.poisPoints],
    style: null,
    multi: false,
    hitTolerance: 2
  });

  poi$ = this.store.select(PoiSelectors.selectSelectedId);
  poiToFlytTo!: any;

  constructor(private store: Store, private renderer2: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.poi$.subscribe(id => {
      this.poiToFlytTo = poiArr.find(poi => poi.id === id);
      if (this.poiToFlytTo) {
        this.updateView([this.poiToFlytTo.lng, this.poiToFlytTo.lat])
        this.renderer2.insertBefore(this.mapDiv.nativeElement, this.overlayDiv.nativeElement, this.emptyDiv.nativeElement)
      }
    })
  }
  ngOnInit(): void {
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
    this.map.addInteraction(this.selectInteractionFeatures);
    this.selectInteractionFeatures.on('select', (e) => {
      return this.renovateOverlayWhenOhterFeatureClicked(e)
    });


  }

  renovateOverlayWhenOhterFeatureClicked(e: any) {
    if (e.selected.length > 0) {
      const clicked = e.target.getFeatures().array_[0];
      const coordClicked = clicked.values_.geometry.flatCoordinates;
      this.updateCardTemplate(clicked);
      this.updateViewFlatCoord(coordClicked);
    } else {
      return
    }
  }

  updateViewFlatCoord(coordinates: olCoordinate.Coordinate): void {
    const newView = new View({
      center: coordinates,
      zoom: 9
    });
    this.map.setView(newView);
  }

  updateCardTemplate(feature: any): void {
    if (this.poiToFlytTo) {
      this.poiToFlytTo = poiArr.find(poi => poi.id === feature.values_.id);
    }
  }

  updateView(coordinates: olCoordinate.Coordinate): void {
    const newView = new View({
      center: fromLonLat(coordinates),
      zoom: 9
    });
    this.map.setView(newView);
  }

  onCloseCard() {
    this.renderer2.removeChild(this.mapDiv?.nativeElement, this.overlayDiv?.nativeElement, true)
  }

}
