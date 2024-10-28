import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="grey045">{import.meta.env.VITE_APP_ENV_MODE}</div>
      <p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <span>Clicked {count} times</span>
      </p>
    </div>
  );
}
