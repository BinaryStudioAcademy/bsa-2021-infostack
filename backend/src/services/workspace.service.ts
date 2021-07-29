// import { HttpCode } from 'infostack-shared/common/enums';
// import { HttpError } from 'infostack-shared/exceptions';
import { IWorkspace, IWorkspaceCreation } from 'infostack-shared/common/interfaces';
// import { UserRole } from './enums/userRole';

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

export const getAll = async(): Promise<IWorkspace[]> => Promise.resolve(workspaces);
// const workspacesId = await UserWorkspaceRepository.find({ userId });
// const workspaces = [] as IWorkspace[]
// for (workspaceId of workspacesId) {
//   const workspace = await WorkspaceRepository.findOne({ workspaceId });
//   workspaces.push(workspace)
// }
// return workspaces

export const create = async(data: IWorkspaceCreation): Promise<IWorkspace> => Promise.resolve({
  id: '18',
  title: data.title,
  description: 'description',
});
// const workspace = WorkspaceRepository.create(data);
// UserWorkspaceRepository.create({userId, workspaceId: workspace.id, role: UserRole.ADMIN});

