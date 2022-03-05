import Polygon from '@arcgis/core/geometry/Polygon'
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import * as projection from '@arcgis/core/geometry/projection'
import SpatialReference from '@arcgis/core/geometry/SpatialReference'
import Geometry from '@arcgis/core/geometry/Geometry'

export const projectExtent = (mapView: MapView) => {
  const extent = mapView.extent
  const area = Polygon.fromExtent(extent as Extent)
  projection.load()
  const outSpatialReference = new SpatialReference({
    wkid: 4326
  })
  const prj = projection.project(area, outSpatialReference)
  const _extent = [(prj as Geometry).extent.xmin, (prj as Geometry).extent.ymin, (prj as Geometry).extent.xmax, (prj as Geometry).extent.ymax]
  return _extent
}

export const geometry2Extent = (geometry: Geometry) => {
  projection.load()
  const outSpatialReference = new SpatialReference({
    wkid: 4326
  })
  const prj = projection.project(geometry, outSpatialReference)
  const _extent = [(prj as Geometry).extent.xmin, (prj as Geometry).extent.ymin, (prj as Geometry).extent.xmax, (prj as Geometry).extent.ymax]
  return _extent
}
