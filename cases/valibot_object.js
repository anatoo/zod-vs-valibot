import { string, parse, object, number, boolean } from 'valibot';

const schema = object({
  name: string(),
  age: number(),
  isActive: boolean(),
});

console.log(
  parse(schema, { name: "hoge", age: 10, isActive: true })
);
