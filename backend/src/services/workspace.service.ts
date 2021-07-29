// import { HttpCode } from 'infostack-shared/common/enums';
// import { HttpError } from 'infostack-shared/exceptions';
import { IWorkspace, IWorkspaceCreation } from 'infostack-shared/common/interfaces';
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
// WorkspaceRepository.getAll();

export const create = async(data: IWorkspaceCreation): Promise<IWorkspace> => Promise.resolve({
  id: '18',
  title: data.title,
  description: 'description',
});
// const { title } = data;
// const workspace = WorkspaceRepository.findOne({ title });
// if (!workspace) {
//   WorkspaceRepository.create(data);
// } else {
//   throw new HttpError({
//     status: HttpCode.BAD_REQUEST,
//     message: 'Workspace with such title already exists',
//   });
// }
