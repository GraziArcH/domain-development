import { type DatabaseHelper } from '@/application/framework'

export class MockDataProvidersRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  async createMocks (): Promise<void> {
    await this.databaseHelper.query(`
            INSERT INTO data_providers 
                (data_providers_id, provider_name, description) 
                    VALUES
                    (1, 'Provider 1', 'Descrição do Provedor 1');
            
            INSERT INTO data_quality_informations 
                (quality_informations_id, disturbances_description, data_providers_id, identified_at, was_delay, time_of_delay) 
                    VALUES
                (1, 'Descrição de Perturbações 1', 1, NOW(), true, NOW());
        `)
  }

  async clearTables (): Promise<void> {
    await this.databaseHelper.query(`
            DELETE FROM data_quality_informations;
            DELETE FROM data_providers;
        `)
  }
}
