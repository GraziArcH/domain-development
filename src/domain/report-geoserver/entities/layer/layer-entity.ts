import { type ILayerRepository, LayerEntityModel, LayerNameValueObject } from '@/domain/report-geoserver'
import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type LayerDTO, type LayerWithoutIdDTO } from './layer-dtos'
import { LayerFilters } from '../../../../application/framework'

export class LayerEntity {
  constructor(private readonly repository: ILayerRepository) { }

  async create(dto: LayerWithoutIdDTO): Promise<LayerEntityModel> {
    const layerModelOrError = LayerEntityModel.create({
      id: 1,
      ...dto
    })

    return await this.repository.create(layerModelOrError)
  }

  async getById(layerId: number): Promise<LayerEntityModel> {
    const layerIdOrError = IdValueObject.create(layerId)

    return await this.repository.getById(layerIdOrError)
  }

  async getByName(layerName: string): Promise<LayerEntityModel> {
    const layerNameOrError = LayerNameValueObject.create(layerName)

    return await this.repository.getByName(layerNameOrError)
  }

  async getAll(): Promise<LayerEntityModel[]> {
    return await this.repository.getAll()
  }

  async update(dto: LayerDTO): Promise<LayerEntityModel> {
    const layerModelOrError = LayerEntityModel.create(dto)

    const layerExists = await this.repository.getById(layerModelOrError.id)

    if (!layerExists) throw new NotFoundError('Esta camada não existe')

    return await this.repository.update(layerModelOrError)
  }

  async delete(
    layerId: number
  ): Promise<LayerEntityModel> {
    const layerIdOrError = IdValueObject.create(layerId)

    const layerExists = await this.repository.getById(layerIdOrError)

    if (!layerExists) throw new NotFoundError('Esta camada não existe')

    return await this.repository.delete(layerIdOrError)
  }

  async getLayerNames(filters: LayerFilters): Promise<{ contornos: string[], rasters: string[] }> {
    return await this.repository.getLayerNames(filters)
  }
}
