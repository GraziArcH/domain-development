import Cassandra from 'cassandra-driver'
import { ArchFramework } from 'versatus-arch-framework/arch-framework'
import ArcHCassandraDb from 'versatus-arch-framework/src/cross/Arch-CassandraDB- Wrapper'

export class DatabaseNoSQLHelper {
  private client: ArcHCassandraDb | null

  constructor() {
    this.client = ArchFramework.getCassandraInstance()
  }

  async query(query: string, parameters?: unknown[]): Promise<Cassandra.types.ResultSet> {
    return this.client.query(query, parameters)
  }

  generateUUID = (): Cassandra.types.Uuid => this.client.generateUUID()
}
