export interface WorkspaceDTO {
  id: number
  name: string
  description: string
}

export type WorkspaceWithoutIdDTO = Omit<WorkspaceDTO, 'id'>
