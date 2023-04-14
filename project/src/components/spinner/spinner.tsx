function Spinner(): JSX.Element {
  return (
    <div className="spinner-wrapper" role="progressbar" aria-valuetext="Loading…" aria-busy="true">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
