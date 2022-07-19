import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnIsAdminTypeVarcharToBollean1629282960088
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'isAdmin',
      new TableColumn({
        name: 'isAdmin',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'isAdmin',
      new TableColumn({
        name: 'isAdmin',
        type: 'varchar',
        default: false,
      }),
    );
  }
}
