import ora from "ora";
import { program } from "commander";
import { makeHtml } from "./latex_to_html/make_html.js";
import { makePdf } from "./latex_to_html/make_pdf.js";

program
  .name("book_to_latex")
  .description(
    "An ugly but functional utility to convert latex to html, please use with caution"
  )
  .version("0.0.1")
  .option("--no-pdf", "Don't build the pdf")
  .option("--no-html", "Don't build the html");

program.parse(process.argv);

const opts = program.opts();

const spinner = ora("").start();

// Compile PDF
if (opts.pdf) {
  spinner.text = "Making PDF";
  await makePdf();
  spinner.succeed("PDF made!");
}

if (opts.html) {
  spinner.text = "Making HTML";
  makeHtml();
  spinner.succeed("HTML made!");
}

// spinner.stop();
process.exit();
