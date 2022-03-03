import Link from "next/link";
import { useStore } from "../store";

export default function Count() {
  const [count, countUp, countDown] = useStore((state) => [
    state.count,
    state.countUp,
    state.countDown,
  ]);
  return (
    <div className="App">
      <div>
        <h1>{count}</h1>
        <button onClick={() => countUp()}>Count up</button>
        <button onClick={() => countDown()}>
          Count Down
        </button>
        <Link href={"/"}>Go to Home page</Link>
      </div>
    </div>
  );
}
