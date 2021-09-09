import { createConnection } from 'typeorm';

import {
  UserSeeder,
  WorkspaceSeeder,
  UserWorkspaceSeeder,
  PageSeeder,
  TeamSeeder,
  SkillSeeder,
  TeamMemberSeeder,
  TeamPermissionSeeder,
  UserFollowingPagesSeeder,
  CommentSeeder,
  TagSeeder,
  PageTagSeeder,
  PageContentSeeder,
  UserPermissionSeeder,
  NotificationSeeder,
  DraftSeeder,
} from './seeders/index';
import { logger } from '../common/utils';
import { dbConfig } from '../config';

const seeders = async (): Promise<void> => {
  await createConnection(dbConfig);
  logger.info('Connection created');
  logger.info('Seeding users');
  await UserSeeder.execute();
  logger.info('Seeding workspaces');
  await WorkspaceSeeder.execute();
  logger.info('Seeding user_workspaces');
  await UserWorkspaceSeeder.execute();
  logger.info('Seeding pages');
  await PageSeeder.execute();
  logger.info('Seeding page_content');
  await PageContentSeeder.execute();
  logger.info('Seeding user_permissions');
  await UserPermissionSeeder.execute();
  logger.info('Seeding teams');
  await TeamSeeder.execute();
  logger.info('Seeding team_members');
  await TeamMemberSeeder.execute();
  logger.info('Seeding team_permissions');
  await TeamPermissionSeeder.execute();
  logger.info('Seeding skill');
  await SkillSeeder.execute();
  logger.info('Seeding tags');
  await TagSeeder.execute();
  logger.info('Seeding page_tags');
  await PageTagSeeder.execute();
  logger.info('Seeding comments');
  await CommentSeeder.execute();
  logger.info('Seeding user_followedPages');
  await UserFollowingPagesSeeder.execute();
  logger.info('Seeding notifications');
  await NotificationSeeder.execute();
  logger.info('Seeding drafts');
  await DraftSeeder.execute();
  logger.info('Seeding finished');
};

seeders().then(() => process.exit());
