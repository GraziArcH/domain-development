export interface LineTemplateDTO {
  lineTemplateId: number
  reportTemplateId: number
  lineOrder: number
  title: string
  name: string
  createdBy: number
  active: boolean
  draggable: boolean
}

export type LineTemplateDTOWithoutId = Omit<LineTemplateDTO, 'lineTemplateId'>
