import { IPagination } from '../../common/interfaces/common';
import { getManager } from 'typeorm';
import { mapGetActivitiesResultToUserActivities } from '../../common/mappers/user/map-user-activities-raw-results-to-user-activities';
import { IUserActivity } from '../../common/interfaces/user';

class ActivityRepository {
  private _manager = getManager();

  public async getAll(
    options?: Partial<IPagination> & { userId: string; workspaceId: string },
  ): Promise<IUserActivity[]> {
    const result = await this._manager.query(
      `
      select * from (
        select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
            inner join "user" on comment."authorId" = "user".id
          left join page on comment."pageId" = page.id
            left join page_content p on (comment."pageId" = p."pageId"
          and not exists (
          select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"
          )
          )
          where page."workspaceId" = $2
            union
            select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
            inner join "user" on page_content."authorId" = "user".id
          inner join "page" on page_content."pageId" = page.id
          where page."workspaceId" = $2) as records
      where exists (select from user_permission where "pageId" = records."pageId" and  user_permission."userId" = $1)
      or exists (
            select * from "user" as u
            inner join team_member on u.id = team_member."userId"
            inner join team_permission on team_permission."teamId" = team_member."teamId"
            where u.id = $1 and "pageId" = records."pageId")
      order by "createdAtTimestamp" desc
${options.take ? `limit ${options.take}` : ''}
${options.skip ? `offset ${options.skip}` : ''}`,
      [options.userId, options.workspaceId],
    );

    return mapGetActivitiesResultToUserActivities(result);
  }

  public async countAll(userId: string, workspaceId: string): Promise<number> {
    const [{ count }] = await this._manager.query(
      `
      select count(id) from (select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
      inner join "user" on comment."authorId" = "user".id
      left join page on comment."pageId" = page.id
      left join page_content p on (comment."pageId" = p."pageId"
      and not exists (select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"))
      where page."workspaceId" = $2
union
      select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
      inner join "user" on page_content."authorId" = "user".id
inner join "page" on page_content."pageId" = page.id
where page."workspaceId" = $2) as records
where exists (select from user_permission where "pageId" = records."pageId" and  user_permission."userId" = $1) or exists (
select * from "user" as u
inner join team_member on u.id = team_member."userId"
inner join team_permission on team_permission."teamId" = team_member."teamId"
where u.id = $1 and "pageId" = records."pageId")`,
      [userId, workspaceId],
    );

    return parseInt(count);
  }

  public async getCreatedByUserId(
    options: Partial<IPagination> & { userId: string; workspaceId: string },
  ): Promise<IUserActivity[]> {
    const result = await this._manager.query(
      `
      select * from (
        select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
        inner join "user" on comment."authorId" = "user".id
        left join page on comment."pageId" = page.id
        left join page_content p on (comment."pageId" = p."pageId"
        and not exists (
        select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"))
            where comment."authorId" = $1 and page."workspaceId" = $2
          union
          select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
            inner join "user" on page_content."authorId" = "user".id
          inner join "page" on page_content."pageId" = page.id
            where page_content."authorId" = $1 and page."workspaceId" = $2) as records
      where exists (select from user_permission where "pageId" = records."pageId" and  "userId" = $1)
        or exists (
        select * from "user" as u
      inner join team_member on u.id = team_member."userId"
      inner join team_permission on team_permission."teamId" = team_member."teamId"
      where u.id = $1 and "pageId" = records."pageId")
      order by "createdAtTimestamp" desc
    ${options.take ? `limit ${options.take}` : ''}
    ${options.skip ? `offset ${options.skip}` : ''}`,
      [options.userId, options.workspaceId],
    );

    return mapGetActivitiesResultToUserActivities(result);
  }

  public async countCreatedByUserId(
    userId: string,
    workspaceId: string,
  ): Promise<number> {
    const [{ count }] = await this._manager.query(
      `
      select count(id) from (
        select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
        inner join "user" on comment."authorId" = "user".id
        left join page on comment."pageId" = page.id
        left join page_content p on (comment."pageId" = p."pageId"
        and not exists (
        select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"))
            where comment."authorId" = $1 and page."workspaceId" = $2
          union
          select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
            inner join "user" on page_content."authorId" = "user".id
          inner join "page" on page_content."pageId" = page.id
            where page_content."authorId" = $1 and page."workspaceId" = $2) as records
      where exists (select from user_permission where "pageId" = records."pageId" and  "userId" = $1)
        or exists (
        select * from "user" as u
      inner join team_member on u.id = team_member."userId"
      inner join team_permission on team_permission."teamId" = team_member."teamId"
      where u.id = $1 and "pageId" = records."pageId")`,
      [userId, workspaceId],
    );

    return parseInt(count);
  }
}

export default ActivityRepository;
