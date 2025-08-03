import { PurgeTimeDTO, type SpotTemplateEntityModel, type SpotTemplateNameValueObject } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface ISpotTemplateRepository {
  create: (spotTemplate: SpotTemplateEntityModel) => Promise<SpotTemplateEntityModel>

  getById: (spotTemplateId: IdValueObject) => Promise<SpotTemplateEntityModel | null>

  getByLineTemplateId: (lineTemplateId: IdValueObject) => Promise<SpotTemplateEntityModel[]>

  getByName: (spotTemplateName: SpotTemplateNameValueObject) => Promise<SpotTemplateEntityModel | null>

  getAll: () => Promise<SpotTemplateEntityModel[]>

  update: (spotTemplate: SpotTemplateEntityModel) => Promise<SpotTemplateEntityModel>

  delete: (spotTemplateId: IdValueObject) => Promise<SpotTemplateEntityModel>

  findTemplates: (filter: { name?: string, active?: boolean, draft?: boolean }) => Promise<SpotTemplateEntityModel[]>

  deactivateOthersByName: (name: string) => Promise<void>

  softDelete: (spotTemplateId: number) => Promise<SpotTemplateEntityModel>

  getAllPurgeTimes: () => Promise<PurgeTimeDTO[]>
}
