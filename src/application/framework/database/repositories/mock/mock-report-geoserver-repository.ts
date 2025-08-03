import { type DatabaseHelper } from '@/application/framework'

export class MockReportGeoserverRepository {
  constructor (
    private readonly databaseHelper: DatabaseHelper
  ) { }

  async createMocks (): Promise<void> {
    await this.databaseHelper.query(`
            INSERT INTO workspace (id, name, description, created_at, updated_at) 
            VALUES 
                (1, 'Workspace A', 'Description for Workspace A', '2024-04-09 12:00:00', '2024-04-09 12:00:00'),
                (2, 'Workspace B', 'Description for Workspace B', '2024-04-09 12:00:00', '2024-04-09 12:00:00');
            
            INSERT INTO store_layer (id, id_workspace, name, description, type, endpoint, created_by, created_at, updated_at) 
            VALUES 
                (1, 1, 'Store Layer 1', 'Description for Store Layer 1', 'Type 1', 'http://example.com/endpoint1', 1, '2024-04-09 12:00:00', '2024-04-09 12:00:00'),
                (2, 1, 'Store Layer 2', 'Description for Store Layer 1', 'Type 2', 'http://example.com/endpoint2', 1, '2024-04-09 12:00:00', '2024-04-09 12:00:00');
            
            INSERT INTO layer (id, id_store, id_workspace, name, type, file_path, geoserver_response_code, status, persisted_in_store_at, send_to_geoserver_at, created_at, updated_at, file_key) 
            VALUES 
                (1, 1, 1, 'Layer 1', 'Type 1', '/path/to/file1', 200, true, '2024-04-09 12:00:00', '2024-04-09 12:00:00', '2024-04-09 12:00:00', '2024-04-09 12:00:00', 'key'),
                (2, 1, 1, 'Layer 2', 'Type 2', '/path/to/file2', 200, true, '2024-04-09 12:00:00', '2024-04-09 12:00:00', '2024-04-09 12:00:00', '2024-04-09 12:00:00', 'key');
            
            INSERT INTO state_control (id, workspace_status, store_status, layer_status, stack, created_at, updated_at) 
            VALUES 
                ('81f3ae8c-f92e-4415-a093-c44728083921', 'success', 'success', 'success', 'Stack 1', '2024-04-09 12:00:00', '2024-04-09 12:00:00'),
                ('9ffee66b-3443-443b-a232-360d711a9036', 'success', 'success', 'success', 'Stack 2', '2024-04-09 12:00:00', '2024-04-09 12:00:00');
        `)
  }

  async clearTables (): Promise<void> {
    await this.databaseHelper.query(`
            DELETE FROM state_control;
            DELETE FROM layer;
            DELETE FROM store_layer;
            DELETE FROM workspace;
        `)
  }
}
