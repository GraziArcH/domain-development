import { type IStoreLayerRepository, StoreLayerEntityModel, StoreLayerNameValueObject } from '@/domain/report-geoserver'
import { IdValueObject } from '@/domain/shared'
import { type StoreLayerDTO, type StoreLayerWithoutDTO } from './store-layer-dtos'

export class StoreLayerEntity {
  constructor (private readonly repository: IStoreLayerRepository) { }

  async create (dto: StoreLayerWithoutDTO): Promise<StoreLayerEntityModel> {
    const storeLayerModelOrError = StoreLayerEntityModel.create({
      id: 1,
      ...dto
    })

    return await this.repository.create(storeLayerModelOrError)
  }

  async getByName (storeLayerName: string): Promise<StoreLayerEntityModel> {
    const storeLayerIdOrError = StoreLayerNameValueObject.create(storeLayerName)

    return await this.repository.getByName(storeLayerIdOrError)
  }

  async getById (storeLayerId: number): Promise<StoreLayerEntityModel> {
    const storeLayerIdOrError = IdValueObject.create(storeLayerId)

    return await this.repository.getById(storeLayerIdOrError)
  }

  async getAll (): Promise<StoreLayerEntityModel[]> {
    return await this.repository.getAll()
  }

  async update (dto: StoreLayerDTO): Promise<StoreLayerEntityModel> {
    const storeLayerModelOrError = StoreLayerEntityModel.create(dto)

    if (storeLayerModelOrError instanceof Error) return storeLayerModelOrError

    const storeLayerExists = await this.repository.getById(storeLayerModelOrError.id)

    if (!storeLayerExists) throw new Error('Esta camada de loja não existe')

    return await this.repository.update(storeLayerModelOrError)
  }

  async delete (
    storeLayerId: number
  ): Promise<StoreLayerEntityModel> {
    const storeLayerIdOrError = IdValueObject.create(storeLayerId)

    const storeLayerExists = await this.repository.getById(storeLayerIdOrError)

    if (!storeLayerExists) throw new Error('Esta camada de loja não existe')

    return await this.repository.delete(storeLayerIdOrError)
  }
}
