import * as React from "react";

function App() {
  const [state, setState] = React.useState(0);
  return <div onClick={() => setState((prev) => ++prev)}>hello , {state}</div>;
}

export default App;
