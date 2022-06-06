// COMPONENTS
import HashTags from './HashTags';
// CONTEXT
import { redirectAction } from '../helpers';

const SideBar = ({}) => {
  return (
    <div className="flex-col">
      <HashTags />
    </div>
  );
};

export default SideBar;
