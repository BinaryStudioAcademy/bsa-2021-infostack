import { IPageRequest } from 'common/interfaces/pages';
import { useAppDispatch } from 'hooks/hooks';
import { pagesActions } from 'store/pages';

type Props = {
  id?: string;
};

const PlusButton: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const addSubPage = async ( id?: string ): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: id };

    await dispatch(pagesActions.createPage(payload));
    await dispatch(pagesActions.getPagesAsync());
  };

  return (
    <i onClick={(): Promise<void> => addSubPage(id)} className="bi bi-plus-lg ms-auto"></i>
  );
};

export default PlusButton;
