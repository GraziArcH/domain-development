export interface StoreLayerDTO {
  id: number
  idWorkspace: number
  name: string
  description: string
  type: string
  endpoint: string
  createdBy: number
}

export type StoreLayerWithoutDTO = Omit<StoreLayerDTO, 'id'>
