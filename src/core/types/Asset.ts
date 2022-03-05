export const AssetTypeMap = {
  WMTS: 'WMTS',
  GEOJSON: 'GEOJSON',
  GEOJSON_POINT: 'GEOJSON_POINT'
}

export type AssetType = keyof typeof AssetTypeMap
