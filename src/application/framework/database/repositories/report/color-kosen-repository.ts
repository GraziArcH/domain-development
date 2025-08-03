import { type IdValueObject } from '@/domain/shared'
import { type DatabaseHelper } from '@/application/framework'
import { type IColorKosenRepository } from '../../../../../domain/report/interfaces/database/icolor-kosen-repository'
import { ColorKosenEntityModel } from '../../../../../domain/report/entities/color-kosen'

export class ColorKosenRepository implements IColorKosenRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) {}

  private mapper (row: any): ColorKosenEntityModel {
    if (!row) return null

    return ColorKosenEntityModel.create({
      colorId: row.color_id,
      colorName: row.color_name,
      color: row.color
    })
  }

  async create (color: ColorKosenEntityModel): Promise<ColorKosenEntityModel> {
    const query = `INSERT INTO color_kosen (
      color_id,
      color_name,
      color
    ) 
      VALUES 
    (
      $1, 
      $2, 
      $3
    ) RETURNING *
    `

    const result = await this.databaseHelper.query(
      query,
      [
        color.colorId.value,
        color.colorName.value,
        color.color.value
      ]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async getById (colorId: IdValueObject): Promise<ColorKosenEntityModel | null> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM color_kosen WHERE color_id = $1',
      [colorId.value]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async getAll (): Promise<ColorKosenEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM color_kosen')
    const rows = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async update (color: ColorKosenEntityModel): Promise<ColorKosenEntityModel> {
    const query = `
      UPDATE color_kosen 
      SET 
        color_name = $1,
        color = $2
      WHERE 
        color_id = $3 
      RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        color.colorName.value,
        color.color.value,
        color.colorId.value
      ]
    )

    const row = result.rows[0]
    return this.mapper(row)
  }

  async delete (colorId: IdValueObject): Promise<void> {
    await this.databaseHelper.query(
      'DELETE FROM color_kosen WHERE color_id = $1',
      [colorId.value]
    )
  }
}
