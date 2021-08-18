import { IPagination } from '../../common/interfaces/common';
import { getManager } from 'typeorm';
import { mapGetActivitiesResultToUserActivities } from '../../common/mappers/user/map-get-activities-to-user-activities';

class ActivityRepository {
  private _manager = getManager();

  public async getAll(options?: Partial<IPagination>) {
    const result = await this._manager.query(
      `
    select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
      inner join "user" on comment."authorId" = "user".id
    left join page_content p on (comment."pageId" = p."pageId"
		and not exists (
		select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"
	  )
	  )
    union
      select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
      inner join "user" on page_content."authorId" = "user".id
	  inner join "page" on page_content."pageId" = page.id
    order by "createdAtTimestamp" desc
    ${options.take ? `limit ${options.take}` : ''}
    ${options.skip ? `offset ${options.skip}` : ''}
    `,
    );

    return mapGetActivitiesResultToUserActivities(result);
  }

  public async countAll(): Promise<number> {
    const [{ count }] = await this._manager.query(`
    select count(id) from (
      select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
        inner join "user" on comment."authorId" = "user".id
        left join page_content p on (comment."pageId" = p."pageId"
          and not exists (
          select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"
          )
        )
      union
      select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
      inner join "user" on page_content."authorId" = "user".id
      inner join "page" on page_content."pageId" = page.id
    order by "createdAtTimestamp" desc) as "all"
    `);

    return parseInt(count);
  }

  public async getByUserId(options: Partial<IPagination> & { userId: string }) {
    const result = await this._manager.query(
      `
    select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
   	inner join "user" on comment."authorId" = "user".id
	  left join page_content p on (comment."pageId" = p."pageId"
		and not exists (
		select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"
		)
	  )
      where comment."authorId" = $1
    union
    select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
      inner join "user" on page_content."authorId" = "user".id
	  inner join "page" on page_content."pageId" = page.id
      where page_content."authorId" = $1
    order by "createdAtTimestamp" desc
    ${options.take ? `limit ${options.take}` : ''}
    ${options.skip ? `offset ${options.skip}` : ''}
    `,
      [options.userId],
    );

    return mapGetActivitiesResultToUserActivities(result);
  }

  public async countByUserId(userId: string) {
    const [{ count }] = await this._manager.query(
      `
      select count(id) from (
        select comment.id as id, comment."authorId", "user"."fullName", "user".avatar, (extract(epoch from comment."createdAt"::timestamp)) as "createdAtTimestamp", comment."pageId", text as content, ('comment') as type, p.title, (true) as "isNew" from comment
          inner join "user" on comment."authorId" = "user".id
          left join page_content p on (comment."pageId" = p."pageId"
          and not exists (
            select 1 from page_content as p1 where p1."pageId" = comment."pageId" and p1."createdAt" > p."createdAt"
            )
          )
        where comment."authorId" = $1
        union
        select page_content.id as id, page_content."authorId", "user"."fullName", "user".avatar, (extract(epoch from page_content."createdAt"::timestamp)) as "createdAtTimestamp", "pageId", content, ('page') as type, page_content.title, EXTRACT(EPOCH FROM page_content."createdAt"::timestamp - page."createdAt"::timestamp) < 1 as "isNew"  from page_content
          inner join "user" on page_content."authorId" = "user".id
          inner join "page" on page_content."pageId" = page.id
          where page_content."authorId" = $1
        order by "createdAtTimestamp" desc
      ) as "all"
    `,
      [userId],
    );

    return parseInt(count);
  }
}

export default ActivityRepository;
