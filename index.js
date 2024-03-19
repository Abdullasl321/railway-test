interface ILoopContext<T> {
  data: T;
  state: "RUNNING" | "PAUSED";
}

function loop<T>(
  interval: number,
  context: ILoopContext<T>,
  func: (options: { data: T; start: () => void; stop: () => void }) => void
) {
  const stop = () => context.state = "PAUSED";
  const start = () => context.state = "RUNNING";

  setTimeout(() => {
    if (context.state === "RUNNING") {
      func({ data: context.data, start, stop });
    }

    loop(interval, context, func);
  }, interval);

  return { start, stop };
}

loop(1000, { state: "RUNNING", data: { counter: 0 } }, (options) => {
  const { stop, data } = options;
  data.counter += 1;
  console.log(data.counter);
  if (data.counter == 10) {
    stop();
  }
});
