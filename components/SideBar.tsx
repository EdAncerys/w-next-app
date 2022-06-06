import { useReactiveVar } from '@apollo/client';
import { jwt } from '../apollo/cache';
// COMPONENTS
import HashTags from './HashTags';
// CONTEXT
import { redirectAction } from '../helpers';

const SideBar = ({}) => {
  // HANDLERS
  const handleDownloadApp = () => {
    redirectAction({ router, path: `/download` });
  };

  return (
    <div className="flex-col pink">
      <HashTags />
    </div>
  );
};

export default SideBar;
