import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDescriptionFieldToProducts1642603990945
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'description');
  }
}
