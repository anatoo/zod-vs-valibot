import { rollup } from "rollup";
import path from "path";
import * as fs from "fs/promises";
import { execSync } from "child_process";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

interface Params {
  inputFile: string;
}

interface Result {
  inputFile: string;
  name: string;
  outputs: {
    outputFile: string;
    format: string;
    size: number;
    gzipSize: number;
  }[];
}

async function bundleAndMeasure(params: Params): Promise<Result> {
  const inputFile = path.resolve(params.inputFile);
  const name = path.basename(params.inputFile, path.extname(params.inputFile));
  const cjsOutputFile = path.resolve(`dist/${name}.cjs`);
  const esmOutputFile = path.resolve(`dist/${name}.mjs`);

  const bundle = await rollup({
    input: inputFile,
    plugins: [nodeResolve(), terser()],
    treeshake: true, // 未使用のコードを削除
  });

  const outputFiles = [{
      outputFile: cjsOutputFile,
      format: "cjs" as const,
    },
    {
      outputFile: esmOutputFile,
      format: "esm" as const,
    },
  ];

  const outputs: Result["outputs"] = await Promise.all(
    outputFiles.map(async ({outputFile, format}) => {
      await bundle.write({
        file: outputFile,
        format,
      });

      const stats = await fs.stat(outputFile);

      const gzipSize = parseInt(execSync(`gzip -c ${outputFile} | wc -c`, {
        encoding: "utf-8",
      }).toString().trim(), 10);

      return {
        outputFile,
        format,
        size: stats.size,
        gzipSize,
      };
    })
  );

  bundle.close();

  return {
    inputFile,
    name,
    outputs,
  };
}

async function getInputFiles() {
  const inputFiles = await fs.readdir(path.resolve("cases"));
  return inputFiles.flatMap((file) => file.endsWith(".js") ? [
    path.resolve(`cases/${file}`),
  ] : []);
}

for (const inputFile of await getInputFiles()) {
  const result = await bundleAndMeasure({
    inputFile,
  });

  console.log(result);
}
