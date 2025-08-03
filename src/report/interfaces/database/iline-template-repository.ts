import { type LineTemplateEntityModel } from '@/domain/report'
import { type IdValueObject } from '@/domain/shared'

export interface ILineTemplateRepository {
  create: (lineTemplate: LineTemplateEntityModel) => Promise<LineTemplateEntityModel>

  getById: (lineTemplateId: IdValueObject) => Promise<LineTemplateEntityModel | null>

  getByReportTemplateId: (reportTemplateId: IdValueObject) => Promise<LineTemplateEntityModel[]>

  getAll: () => Promise<LineTemplateEntityModel[]>

  update: (lineTemplate: LineTemplateEntityModel) => Promise<LineTemplateEntityModel>

  delete: (lineTemplateId: IdValueObject) => Promise<LineTemplateEntityModel>
}
