import { type DatabaseCacheHelper, type DatabaseHelper, type DatabaseNoSQLHelper } from '@/application/framework'
import { ReportAggregateModel, SpotEntity, SpotEntityModel } from '@/domain/report'

export class MockReportRepository {
  constructor(
    private readonly databaseHelper: DatabaseHelper,
    private readonly databaseCacheHelper?: DatabaseCacheHelper,
    private readonly databaseNoSQLHelper?: DatabaseNoSQLHelper
  ) { }

  async createMocks(): Promise<void> {
    await this.databaseHelper.query(`
            INSERT INTO filter_actions (filter_action_id, action, created_at, created_by, active)
                VALUES (1, 'clear', NOW(), 1, true);
                VALUES (2, 'action', NOW(), 1, true);

            INSERT INTO filter_classification (filter_classification_id, classification, created_by, active, created_at)
                VALUES 
            (1, 'primary', 1, TRUE, NOW()),
            (2, 'primary', 1, TRUE, NOW());

            INSERT INTO filter_value_type (filter_value_type_id, value_type, created_by, active, created_at) VALUES
                (1, 'Type1', 1, true, NOW()),
                (2, 'Type2', 1, true, NOW());
    
            INSERT INTO filter 
                (filter_id, parent_id, value, description, filter_classification_id, filter_value_type_id, "order", created_by, created_at, active, filter_action_id)
                VALUES 
                    (1, 1, 'value1', 'Description 1', 1, 1, 1, 1, NOW(), true, 1),
                    (2, 1, 'value2', 'Description 2', 1, 1, 2, 2, NOW(), true, 1);

            INSERT INTO report_type (report_type_id, type_name, description, icon, created_at, created_by, active) VALUES
                (1, 'TypeA', 'Description for TypeA', 'Icon', NOW(), 1, TRUE),
                (2, 'TypeB', 'Description for TypeB', 'Icon', NOW(), 1, TRUE);
    
            INSERT INTO spot_type 
                (spot_type_id, spot_type_name, description, spot_data_format, created_at, active, created_by)
                    VALUES
                (1, 'SpotType1', 'Description for SpotType1', '{"key": "value4"}', NOW(), TRUE, 1),
                (2, 'SpotType2', 'Description for SpotType2', '{"key": "value4"}', NOW(), TRUE, 1);
            
            INSERT INTO report_template
                (
                template_id, 
                template_name, 
                title, 
                description, 
                number_of_lines, 
                cache_purge_period, 
                version, 
                active, 
                created_by, 
                draft, 
                formatting, 
                path, 
                created_at,
                report_type_id
            )
            VALUES 
                (1, 'TemplateA', 'Title1', 'Description1', 5,'30 days', '1.0', true, 1, false, '{"font": "Arial", "size": "12px"}', '/path/to/template1', NOW(), 1),
                (2, 'TemplateB', 'Title1', 'Description1', 5,'30 days', '1.0', true, 1, false, '{"font": "Arial", "size": "12px"}', '/path/to/template1', NOW(), 1);
            
            INSERT INTO line_template 
                (line_template_id, line_title, report_template_id, created_by, active, created_at, draggable, line_order, line_name) 
                    VALUES 
                 (1, 'Template A', 1, 1, true, NOW(), true, 1, 'Name'),
                 (2, 'Template B', 1, 1, true, NOW(), true, 2, 'Name');
            
            INSERT INTO spot_template 
                (spot_template_id, spot_template_name, spot_title, description, spot_legend, version, active, spot_type_id, created_by, draft, formatting, created_at)  
                    VALUES
                 (1, 'SpotTemplateA', 'SpotTitleA', 'Description for SpotTemplateA', 'LegendA', 'v1', true, 1, 1, TRUE, '{"font": "Arial", "size": "12px"}', NOW()),
                 (2, 'SpotTemplateB', 'SpotTitleB', 'Description for SpotTemplateB', 'LegendB', 'v2', true, 1, 1, TRUE, '{"font": "Arial", "size": "12px"}', NOW());

            INSERT INTO spot_by_line (spot_by_line_id, line_template_id, spot_template_name, created_by, active, created_at, spot_order) VALUES
                (1, 1, 'SpotTemplateA', 1, true, NOW(), 1),
                (2, 1, 'SpotTemplateA', 1, true, NOW(), 2);

            INSERT INTO spot_by_line_filters (
                spot_by_line_filters_id, 
                spot_by_line_id,
                filter_id, 
                visible, 
                "default",
                created_by,
                active,
                created_at
            )
                VALUES
            (1, 1, 1, true, '{"key": "value4"}', 1, true, NOW()),
            (2, 1, 1, true, '{"key": "value5"}', 1, true, NOW());

            INSERT INTO pinned (custom_spot_id, spot_template_name, filters, user_id, "order", created_at)
                VALUES
            (1, 'SpotTemplateA', '{}', 1, 1, NOW());

            INSERT INTO filter_by_spot (filter_by_spot_id, spot_template_id, filter_id, created_by, active, created_at) VALUES
                (1, 1, 1, 1, true, NOW()),
                (2, 1, 1, 1, true, NOW());
        `)

    if (this.databaseCacheHelper) {
      await this.databaseCacheHelper.set('report-1', JSON.stringify(
        ReportAggregateModel.create(
          {
            reportName: 'report-1',
            reportId: 1,
            reportDescription: 'Precipitação acumulada.',
            numberOfLines: 1,
            lines: [
              {
                lineId: 1,
                draggable: true,
                lineOrder: 1,
                title: 'Gráfico Comparativo de Precipitação Acumulada',
                spots: [
                  {
                    spotId: 1,
                    spotName: 'SpotTemplateA',
                    spotType: 'line',
                    title: 'SpotTitleA',
                    format: {},
                    legend: 'LegendA',
                    description: 'Description for SpotTemplateA',
                    spotOrder: 1
                  },
                  {
                    spotId: 2,
                    spotName: 'SpotTemplateB',
                    spotType: 'line',
                    title: 'SpotTitleB',
                    format: {},
                    legend: 'LegendB',
                    description: 'Description for SpotTemplateB',
                    spotOrder: 2
                  }
                ],
                filters: [
                  {
                    id: 0,
                    value: 'Regiões',
                    innerFilters: [
                      {
                        id: 1,
                        value: 'Todos',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 2,
                        value: 'N',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 3,
                        value: 'S',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      }
                    ],
                    type: 'Select',
                    classification: 'secondaryFilters',
                    action: 'action'
                  },
                  {
                    id: 4,
                    value: 'Modelos',
                    innerFilters: [
                      {
                        id: 5,
                        value: 'Todos',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 6,
                        value: 'GEFS',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 7,
                        value: 'ETA',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      }
                    ],
                    type: 'Select',
                    classification: 'secondaryFilters',
                    action: 'action'
                  },
                  {
                    id: 8,
                    value: 'Regiões',
                    innerFilters: [
                      {
                        id: 9,
                        value: 'Todos',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 10,
                        value: 'N',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 11,
                        value: 'S',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      }
                    ],
                    type: 'Select',
                    classification: 'secondaryFilters',
                    action: 'action'
                  },
                  {
                    id: 12,
                    value: 'Modelos',
                    innerFilters: [
                      {
                        id: 13,
                        value: 'Todos',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 14,
                        value: 'GEFS',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      },
                      {
                        id: 15,
                        value: 'ETA',
                        innerFilters: null,
                        type: 'Select',
                        action: 'action',
                        classification: 'secondaryFilters'
                      }
                    ],
                    type: 'Select',
                    classification: 'secondaryFilters',
                    action: 'action'
                  }
                ]
              },
              {
                lineId: 2,
                lineOrder: 1,
                draggable: true,
                title: 'Tabela de Comparativo',
                spots: [
                  {
                    spotId: 3,
                    spotName: 'SpotTemplateC',
                    spotType: 'simple-table',
                    title: 'SpotTitleC',
                    format: {},
                    legend: 'LegendC',
                    description: 'Description for SpotTemplateC',
                    spotOrder: 1
                  }
                ],
                filters: []
              },
              {
                lineId: 3,
                lineOrder: 1,
                draggable: true,
                title: 'Gráficos El niño e La niña',
                spots: [
                  {
                    spotId: 4,
                    spotOrder: 1,
                    spotName: 'SpotTemplateD',
                    spotType: 'elninolanina',
                    title: 'SpotTemplateD',
                    format: {},
                    legend: 'LegendA',
                    description: 'Description for SpotTemplateD'
                  }
                ],
                filters: []
              },
              {
                lineId: 4,
                lineOrder: 1,
                draggable: true,
                title: 'Submercado',
                spots: [
                  {
                    spotId: 5,
                    spotOrder: 1,
                    spotName: 'Complex Table',
                    spotType: 'complex-table',
                    title: 'Complex Table',
                    format: {},
                    legend: 'LegendA',
                    description: 'Description for Complex Table'
                  }
                ],
                filters: []
              },
              {
                lineId: 5,
                lineOrder: 1,
                draggable: true,
                title: 'Column',
                spots: [
                  {
                    spotId: 6,
                    spotOrder: 1,
                    spotName: 'Column',
                    spotType: 'column',
                    title: 'Column',
                    format: {},
                    legend: 'Legenda',
                    description: 'Description for Column'
                  },
                  {
                    spotId: 8,
                    spotOrder: 2,
                    spotName: 'Column 2',
                    spotType: 'column',
                    title: 'Column 2',
                    format: {},
                    legend: 'Legenda',
                    description: 'Description for Column 2'
                  },
                  {
                    spotId: 9,
                    spotOrder: 2,
                    spotName: 'Column 3',
                    spotType: 'column',
                    title: 'Column 3',
                    format: {},
                    legend: 'Legenda',
                    description: 'Description for Column 2'
                  },
                  {
                    spotId: 10,
                    spotOrder: 2,
                    spotName: 'Column 4',
                    spotType: 'column',
                    title: 'Column 4',
                    format: {},
                    legend: 'Legenda',
                    description: 'Description for Column 2'
                  }
                ],
                filters: []
              }
            ],
            filters: [],
            reportTitle: 'Precipitação'
          }
        )
      ))

      await this.databaseCacheHelper.set(

        'spot-1'
        , JSON.stringify(
          SpotEntityModel.create(
            {
              spotId: '1',
              spotTemplateId: 'spotTemplateId',
              spotData: '{}',
              filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
              spotName: 'Name'
            }
          )
        ))
    }

    if (this.databaseNoSQLHelper) {
      await this.databaseNoSQLHelper.query(`
            INSERT INTO 
            report.spot_data 
                (spot_data_id, spot_template_id, spot_name, spot_data, primary_filters, secondary_filters, specific_filters)
                    VALUES 
                (
                  00000000-0000-0000-0000-000000000000, 
                  '1', 
                  'Name', 
                  '{"param1": "value1", "param2": "value2"}', 
                  [ { name: 'Regiões', value: 'N' }, { name: 'Regiões', value: 'S' } ],
                  [ { name: 'Regiões', value: 'N' } ],
                  [ { name: 'Regiões', value: 'N' } ]
                )
        `)
    }
  }

  async clearTables(): Promise<void> {
    await this.databaseHelper.query(`
            DELETE FROM pinned;
            DELETE FROM spot_by_line_filters;
            DELETE FROM filter_by_spot;
            DELETE FROM spot_by_line;
            DELETE FROM spot_template;
            DELETE FROM spot_type;
            DELETE FROM line_template;
            DELETE FROM report_template;
            DELETE FROM report_type;
            DELETE FROM filter;
            DELETE FROM filter_value_type;
            DELETE FROM filter_classification;
            DELETE FROM filter_actions;
        `)

    if (this.databaseCacheHelper) for (const key of (await this.databaseCacheHelper.getKeys())) await this.databaseCacheHelper.del(key)

    if (this.databaseNoSQLHelper) await this.databaseNoSQLHelper.query('TRUNCATE report.spot_data')
  }
}
