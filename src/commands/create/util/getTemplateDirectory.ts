import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";
import type { ICreateOptions } from "../../../typescript/interfaces/interfaces";
export async function getTemplateDirectory(options: ICreateOptions): Promise<ICreateOptions> {
  try {
    const templateDir = resolve(require.main!.path, "../lib/templates", `V${options.version}`, "create", options.template!);
    await access(templateDir, constants.R_OK);
    options = {
      ...options,
      templateDirectory: templateDir,
    };
    return options;
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR")} An error occurred while retrieving the template`);
    return process.exit(1);
  }
}
