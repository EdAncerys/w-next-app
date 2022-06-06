import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div className="flex" style={{ justifyContent: 'center' }}>
      <CircularProgress size={26} />
    </div>
  );
};

export default Loading;
