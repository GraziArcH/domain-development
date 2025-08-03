import { type FilterEntityModel } from '@/domain/report'
import { type StringValueObject, type IdValueObject } from '@/domain/shared'

export interface IFilterRepository {
  getBySpotTemplateIdWithYourDependents: (spotTemplateId: IdValueObject) => Promise<FilterEntityModel[]>

  getFiltersByReportTemplateId: (reportTemplateIdOrError: IdValueObject) => FilterEntityModel[] | PromiseLike<FilterEntityModel[]>

  getFiltersByReportTemplateName: (reportTemplateName: StringValueObject) => Promise<FilterEntityModel[]>

  getFiltersByLine: (spotId: IdValueObject, lineId: IdValueObject) => Promise<FilterEntityModel[]>

  removeLineFilterByFilterIdAndReportTemplaName: (filterId: IdValueObject, reportTemplateName: StringValueObject) => Promise<void>

  getBySpotTemplateId: (spotTemplateId: IdValueObject) => Promise<FilterEntityModel[]>

  getBySpotTemplateName: (spotTemplateName: StringValueObject) => Promise<FilterEntityModel[]>

  create: (filter: FilterEntityModel) => Promise<FilterEntityModel>

  getById: (filterId: IdValueObject) => Promise<FilterEntityModel | null>

  getByParentId: (filterId: IdValueObject) => Promise<FilterEntityModel[]>

  getAll: () => Promise<FilterEntityModel[]>

  update: (filter: FilterEntityModel) => Promise<FilterEntityModel>

  delete: (filterId: IdValueObject) => Promise<FilterEntityModel>
}
