import { type DatabaseHelper } from '@/application/framework'

export class MockMethodologyRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  async createMocks (): Promise<void> {
    await this.databaseHelper.query(`
        INSERT INTO ons_consultant (ons_consultant_id, consultant_name, cpf) VALUES (1, 'Consultor 1', '87191337079');

        INSERT INTO email (email_id, ons_consultant_id, email) VALUES (1, 1, 'consultor1@example.com'), (2, 1, 'consultor2@example.com');
        
        INSERT INTO phone (phone_id, ons_consultant_id, phone, whatsapp, telegram) VALUES (1, 1, '11962587841', true, true), (2, 1, '11962587842', true, true);
        
        INSERT INTO ons_methodology 
            (ons_methodology_id, version, description_of_modifications, ons_consultant_id) 
                VALUES
            (1, '1.0', 'Primeira versão', 1);
        
        INSERT INTO method 
            (method_id, ons_methodology_id, description, residue, skill, error_measurements) 
                VALUES
            (1, 1, 'Método 1', 'Resíduo 1', 'Habilidade 1', 0.05);
        `)
  }

  async clearTables (): Promise<void> {
    await this.databaseHelper.query(`
            DELETE FROM method;
            DELETE FROM ons_methodology;
            DELETE FROM phone;
            DELETE FROM email;
            DELETE FROM ons_consultant;
        `)
  }
}
