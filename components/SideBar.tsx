// COMPONENTS
import HashTags from './HashTags';
import TrendingAccounts from './TrendingAccounts';
// CONTEXT
import { redirectAction } from '../helpers';

const SideBar = ({}) => {
  return (
    <div className="flex-col">
      <TrendingAccounts />
      <HashTags />
    </div>
  );
};

export default SideBar;
