import { IPageRequest } from 'common/interfaces/pages';
import { useAppDispatch } from 'hooks/hooks';
import { pagesActions } from 'store/pages';

type Props = {
  id: string | null;
};

const PlusButton: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const addSubPage = async ( id: string | null ): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: id };

    await dispatch(pagesActions.createPage(payload));
    await dispatch(pagesActions.getPagesAsync());
  };

  return (
    <svg onClick={(): Promise<void> => addSubPage(id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg ms-auto" viewBox="0 0 16 16">
      <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
    </svg>
  );
};

export default PlusButton;
