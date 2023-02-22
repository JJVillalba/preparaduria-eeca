import * as fs_extra from "fs-extra";
import { execSync } from "child_process";
import * as fs from "fs";

export async function makePdf(spinner) {
  try {
    await fs_extra.copy("./book", "./.tmp", {});
    execSync(
      `cd ./.tmp && latexmk -pdf -latexoption="-synctex=1 --shell-escape"  main.tex`
    );
    fs.copyFileSync("./.tmp/main.pdf", "./book/main.pdf");
    execSync(
      `cd ./.tmp/figures && for f in *.pdf; do pdf2svg \${f} \${f%%.*}.svg; done;`
    );
    await fs_extra.copy("./.tmp/figures", "./book/figures", {});
    await fs_extra.copy("./.tmp/figures", "./webpage/figures", {});
  } catch (error) {
    console.log(error.output.toString());
    process.exit(0);
  }
}
