import { Http } from 'services';
import { IWorkspace, IWorkspaceCreation } from 'common/interfaces/workspace';

const workspaces = [
  {
    id: '1',
    title: 'title',
    description: 'description',
  },
  {
    id: '2',
    title: 'title',
  },
  {
    id: '3',
    title: 'title',
    description: 'description',
  },
  {
    id: '4',
    title: 'title',
    description: 'description',
  },
  {
    id: '5',
    title: 'title',
  },
  {
    id: '6',
    title: 'title',
  },
  {
    id: '7',
    title: 'title',
    description: 'description',
  },
  {
    id: '8',
    title: 'title',
  },
  {
    id: '9',
    title: 'title',
    description: 'description',
  },
  {
    id: '10',
    title: 'title',
  },
  {
    id: '11',
    title: 'title',
    description: 'description',
  },
  {
    id: '12',
    title: 'title',
  },
  {
    id: '13',
    title: 'title',
    description: 'description',
  },
  {
    id: '14',
    title: 'title',
    description: 'description',
  },
  {
    id: '15',
    title: 'title',
  },
  {
    id: '16',
    title: 'title',
    description: 'description',
  },
  {
    id: '17',
    title: 'title',
    description: 'description',
  },
];

class WorkspaceApi {
  private _http: Http;

  constructor() {
    this._http = new Http;
  }

  public async create({ title }: IWorkspaceCreation): Promise<IWorkspace> {
    return new Promise(resolve => setTimeout(() => resolve({
      id: '18',
      title,
      description: 'description',
    }), 1000));
  }
  public async get(): Promise<IWorkspace[]> {
    return new Promise(resolve => setTimeout(() => resolve(workspaces), 1000));
  }
}

export { WorkspaceApi };
