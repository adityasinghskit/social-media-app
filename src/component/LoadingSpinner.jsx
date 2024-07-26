const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border spinner" style={{width: "7rem", height: "7rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default LoadingSpinner;
