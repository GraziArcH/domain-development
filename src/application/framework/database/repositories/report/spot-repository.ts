import { type DatabaseCacheHelper } from '@/application/framework';
import { type ISpotRepository, SpotEntityModel } from '@/domain/report';
import { StringValueObject } from '@/domain/shared';

export class SpotRepository implements ISpotRepository {
  constructor(private readonly databaseCacheHelper: DatabaseCacheHelper) { }

  /**
   * Generates a standardized cache key for a spot
   * @param spotId The ID of the spot
   */
  private getCacheKey(spotId: string): string {
    return `kosen:spotdata:${spotId}`;
  }

  /**
   * Maps a raw cache object to a SpotEntityModel instance
   * @param spot The raw cache object
   */
  private mapper(spot: any): SpotEntityModel | null {
    if (!spot) return null;

    return SpotEntityModel.create({
      spotId: spot.spotId?.string,
      spotTemplateId: spot.spotTemplateId?.string,
      spotData: spot.spotData?.string,
      filters: spot.filters,
      spotName: spot.spotName?.string,
    });
  }

  async create(spot: SpotEntityModel, expireIn = 3600): Promise<SpotEntityModel> {
    const key = this.getCacheKey(spot.spotId.value);
    await this.databaseCacheHelper.set(key, JSON.stringify(spot), expireIn);
    return await this.getById(StringValueObject.create(spot.spotId.value));
  }

  async getById(spotId: StringValueObject): Promise<SpotEntityModel | null> {
    const key = this.getCacheKey(spotId.value);
    const value = await this.databaseCacheHelper.get(key);

    if (!value) {
      console.warn(`Cache miss for key: ${key}`);
      return null; // Handle gracefully when value is not found
    }

    try {
      const parsed = JSON.parse(value);
      return this.mapper(parsed);
    } catch (error) {
      console.error(`Failed to parse cache value for key: ${key}`, error);
      return null; // Handle parsing errors gracefully
    }
  }

  async update(spot: SpotEntityModel, expireIn = 3600): Promise<SpotEntityModel | null> {
    const key = this.getCacheKey(spot.spotId.value);
    await this.databaseCacheHelper.del(key);
    await this.databaseCacheHelper.set(key, JSON.stringify(spot), expireIn);
    return await this.getById(spot.spotId);
  }

  async delete(spotId: StringValueObject): Promise<SpotEntityModel | null> {
    const key = this.getCacheKey(spotId.value);
    const value = await this.getById(spotId);
    await this.databaseCacheHelper.del(key);
    return value;
  }
}
