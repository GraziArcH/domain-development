export interface LayerDTO {
  id: number;
  idStore: number;
  idWorkspace: number;
  name: string;
  type: string;
  geoserverResponseCode: number | null;
  status: boolean;
  persistedInStoreAt: Date;
  sendToGeoserverAt: Date;
  dateArquivo: Date;
  contornos: string;
  modelos: string;
  modulos: string
  extensao: string;
}

export type LayerWithoutIdDTO = Omit<LayerDTO, 'id'>;
