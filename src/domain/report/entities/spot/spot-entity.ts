import {
  type Filters,
  type ISpotDataRepository,
  type ISpotRepository,
  PurgeDTO,
  SpotEntityModel
} from '@/domain/report'
import { StringValueObject } from '@/domain/shared'
import { type SpotDTO, type SpotDTOWithoutId } from './spot-dtos'
import { createHash } from 'crypto'

export class SpotEntity {
  constructor(
    protected readonly cacheRepository: ISpotRepository,
    protected readonly noSQLRepository: ISpotDataRepository
  ) { }


  async createInCache(dto: SpotDTO, expireIn: number = 3600): Promise<SpotEntityModel> {
    const spotModelOrError = SpotEntityModel.create(dto)

    return await this.cacheRepository.create(spotModelOrError, expireIn)
  }

  async getCacheById(
    spotId: string
  ): Promise<SpotEntityModel> {
    const spotIdOrError = StringValueObject.create(spotId)

    return await this.cacheRepository.getById(spotIdOrError)
  }

  async updateCache(dto: SpotDTO, expireIn: number = 3600): Promise<SpotEntityModel> {
    const spotModelOrError = SpotEntityModel.create(dto)

    return await this.cacheRepository.update(spotModelOrError, expireIn)
  }

  async deleteCache(
    spotId: string
  ): Promise<SpotEntityModel> {
    const spotIdOrError = StringValueObject.create(spotId)

    return await this.cacheRepository.delete(spotIdOrError)
  }

  async createInNoSQL(dto: SpotDTOWithoutId): Promise<SpotEntityModel> {
    const spotModelOrError = SpotEntityModel.create({
      spotId: '1',
      ...dto
    })

    return await this.noSQLRepository.create(spotModelOrError)
  }

  async getNoSQLById(spotName: string): Promise<SpotEntityModel> {
    const spotIdOrError = StringValueObject.create(spotName)

    return await this.noSQLRepository.getById(spotIdOrError)
  }

  async getNoSQLBySpotName(spotName: string, filters: Filters): Promise<SpotEntityModel> {
    const spotNameOrError = StringValueObject.create(spotName)

    return await this.noSQLRepository.getBySpotDataName(spotNameOrError, filters)
  }

  async getNoSQLBySpotTemplateId(spotTemplateId: string, filters: Filters): Promise<SpotEntityModel> {
    const spotIdOrError = StringValueObject.create(spotTemplateId)

    return await this.noSQLRepository.getBySpotTemplateIdAndFilters(spotIdOrError, filters)
  }

  async updateNoSQL(dto: SpotDTO): Promise<SpotEntityModel> {
    const spotModelOrError = SpotEntityModel.create(dto)

    return await this.noSQLRepository.update(spotModelOrError)
  }

  async deleteNoSQL(spotDataId: string): Promise<SpotEntityModel> {
    const spotDataIdOrError = StringValueObject.create(spotDataId)

    return await this.noSQLRepository.delete(spotDataIdOrError)
  }

  async getSpotDataIdsToBeDeleted(purgeRules: PurgeDTO[]): Promise<string[]> {
    return await this.noSQLRepository.getSpotDataIdsToBeDeleted(purgeRules)
  }
}
