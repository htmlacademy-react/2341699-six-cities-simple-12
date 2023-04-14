import './loader-line.css';

function LoaderLine(): JSX.Element {
  return (<div className="loader-line" role="progressbar" aria-valuetext="Loading…" aria-busy="true"></div>);
}

export default LoaderLine;
