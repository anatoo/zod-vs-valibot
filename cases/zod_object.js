import { string, object, number, boolean } from 'zod';

const schema = object({
  name: string(),
  age: number(),
  isActive: boolean(),
});

console.log(
  schema.parse({ name: "hoge", age: 10, isActive: true })
);
