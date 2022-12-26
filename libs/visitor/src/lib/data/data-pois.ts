import { GeoJSON } from 'geojson';

export const poiPoints: GeoJSON =   {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates":  [ 23.725749197701326, 37.97170989160553 ]
      },
      "properties":
      {
        "id": 1,
        "name": "Acropolis",
        "description": "Acropolis of Athens",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg/390px-The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg"
      },
    },
    {
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates":  [ 22.51021540014237, 38.50172172340826]
      },
      "properties":
      {
        "id": 2,
        "name": "Delphi",
        "description": "Delphi",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ac.delphi1.jpg/450px-Ac.delphi1.jpg"
      },
    },
    {
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates":  [ 22.948404240113845, 40.62660913661512 ]
      },
      "properties":
      {
        "id": 3,
        "name": "White Tower",
        "description": "White Tower of Thessaloniki",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/WhiteTowerThessaloniki_%283%29.JPG/330px-WhiteTowerThessaloniki_%283%29.JPG"
      }
    }
  ]
}
