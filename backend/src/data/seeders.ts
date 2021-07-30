import { createConnection } from 'typeorm';
import UserSeeder from './seeders/user.seeder';
import WorkspaceSeeder from './seeders/workspace.seeder';
import UserWorkspaceSeeder from './seeders/user-workspace.seeder';
import PageSeeder from './seeders/page.seeder';
import TeamSeeder from './seeders/team.seeder';
import TeamMemberSeeder from './seeders/team-member.seeder';
import TeamPermissionSeeder from './seeders/team-permission.seeder';
import { logger } from '../common/utils/logger.util';

const seeders = async ():Promise<void> => {
  await createConnection();
  logger.info('Connection created');
  logger.info('Seeding users');
  await UserSeeder.execute();
  logger.info('Seeding workspaces');
  await WorkspaceSeeder.execute();
  logger.info('Seeding user_workspaces');
  await UserWorkspaceSeeder.execute();
  logger.info('Seeding pages');
  await PageSeeder.execute();
  logger.info('Seeding teams');
  await TeamSeeder.execute();
  logger.info('Seeding team_members');
  await TeamMemberSeeder.execute();
  logger.info('Seeding team_permissions');
  await TeamPermissionSeeder.execute();
  logger.info('Seeding finished');
};

seeders();
