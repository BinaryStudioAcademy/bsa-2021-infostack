import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';

@EntityRepository(Page)
class PageRepository extends Repository<Page> {
  findById(id: string):Promise<Page> {
    return this.findOne({ id });
  }
}

export default PageRepository;
