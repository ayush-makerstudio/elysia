import { Effect } from "effect";
import { readFile as fsReadFile } from "fs";
export function test() {
  const user = Effect.succeed({
    name: "ayush",
    email: "www@dsa.com",
  });
  const tryme = (input: string) =>
    Effect.try({
      try: () => {
        return JSON.parse(input);
      },
      catch: (unknown) => {
        return new Error(`Some error occured ${unknown}`);
      },
    });
  const s = tryme("{");
  return { try: Effect.runSync(s), user: Effect.runSync(user) };
}

export function test2() {
  const readFilePa = Effect.async<Buffer, NodeJS.ErrnoException>((cb) => {
    fsReadFile("package.json", (err, data) => {
      if (err) {
        cb(Effect.fail(err));
      } else {
        cb(Effect.succeed(data));
      }
    });
  });
  return Effect.runPromise(readFilePa);
}
