import { DateValueObject, type IEntityModel, IdValueObject, StringValueObject } from '@/domain/shared'
import {
  LayerNameValueObject,
  LayerTypeValueObject
} from '@/domain/report-geoserver'
import { type LayerDTO } from './layer-dtos'

export class LayerEntityModel implements IEntityModel<LayerDTO> {
  constructor(
    public readonly id: IdValueObject,
    public readonly idStore: IdValueObject,
    public readonly idWorkspace: IdValueObject,
    public readonly name: LayerNameValueObject,
    public readonly type: LayerTypeValueObject,
    public readonly geoserverResponseCode: IdValueObject | null,
    public readonly status: boolean,
    public readonly persistedInStoreAt: Date,
    public readonly sendToGeoserverAt: Date,
    public readonly dateArquivo: Date,
    public readonly contornos: string,
    public readonly modelos: string,
    public readonly modulos: string,
    public readonly extensao: string
  ) { }

  static create({
    id,
    idStore,
    idWorkspace,
    name,
    type,
    geoserverResponseCode,
    status,
    persistedInStoreAt,
    sendToGeoserverAt,
    dateArquivo,
    contornos,
    modelos,
    modulos,
    extensao
  }: LayerDTO): LayerEntityModel {
    const idOrError = IdValueObject.create(id)
    const idStoreOrError = IdValueObject.create(idStore)
    const idWorkspaceOrError = IdValueObject.create(idWorkspace)
    const nameOrError = LayerNameValueObject.create(name)
    const typeOrError = LayerTypeValueObject.create(type)
    const geoserverResponseCodeOrError = geoserverResponseCode
      ? IdValueObject.create(geoserverResponseCode)
      : null

    return new LayerEntityModel(
      idOrError,
      idStoreOrError,
      idWorkspaceOrError,
      nameOrError,
      typeOrError,
      geoserverResponseCodeOrError,
      status,
      persistedInStoreAt,
      sendToGeoserverAt,
      dateArquivo,
      contornos,
      modelos,
      modulos,
      extensao
    )
  }

  getValues(): LayerDTO {
    return {
      id: this.id.value,
      idStore: this.idStore.value,
      idWorkspace: this.idWorkspace.value,
      name: this.name.value,
      type: this.type.value,
      geoserverResponseCode: this.geoserverResponseCode?.value || null,
      status: this.status,
      persistedInStoreAt: this.persistedInStoreAt,
      sendToGeoserverAt: this.sendToGeoserverAt,
      dateArquivo: this.dateArquivo,
      contornos: this.contornos,
      modelos: this.modelos,
      modulos: this.modulos,
      extensao: this.extensao
    }
  }
}
