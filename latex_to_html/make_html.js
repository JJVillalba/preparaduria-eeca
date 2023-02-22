import * as fs from "fs";
import { unifiedLatexFromString } from "@unified-latex/unified-latex-util-parse";
import { JSDOM } from "jsdom";
import { macros } from "./custom_macros.js";
import { unifiedLatexToHast } from "@unified-latex/unified-latex-to-hast";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify/lib/index.js";
import katex from "katex";
import { format } from "prettier";

const firstKey = (v) => Object.keys(v)[0];
const firstValue = (v) => v ?  v[Object.keys(v)[0]] : null;

/**
 * This function will make all section, theorem, definitions index.
 *
 * @param {HTMLElement} doc
 */
// const buildIndex = (doc) => {
//   const part_index = [];
//   doc.querySelectorAll("h1, h2, h3, h4").forEach((node) => {
//     const pushToIndex = (index, className) => {
//       const _id = `${className}:${node.textContent.replaceAll(" ", "-")}`;
//       node.id = _id;
//       return index.push({ [node.textContent]: { nodes: [], id: _id } });
//     };

//     if (node.tagName === "H1") return pushToIndex(part_index, "part");

//     const chapter_index = firstValue(part_index.at(-1))?.nodes;
//     if (node.tagName === "H2") return pushToIndex(chapter_index, "chapter");

//     const section_index = firstValue(chapter_index.at(-1))?.nodes;
//     if (node.tagName === "H3") return pushToIndex(section_index, "section");

//     const subsection_index = firstValue(section_index.at(-1))?.nodes;
//     if (node.tagName === "H4")
//       return pushToIndex(subsection_index, "subsection");
//   });

//   const __makeIndex = (value, recursionLevel) => `
//     <ul class="level-${recursionLevel}">
//     ${value.nodes.reduce((prev, curr) => {
//       let expanded = "";
//       if (firstValue(curr).nodes.length !== 0) {
//         expanded = __makeIndex(firstValue(curr), recursionLevel + 1);
//       }

//       return `${prev}
//       <li>
//         <span>
//           <a href="#${firstValue(curr).id}">${firstKey(curr)}</a>
//         </span>
//         ${expanded}
//       </li>`;
//     }, "")}
//     </ul>`;

//   return __makeIndex({ id: "index", nodes: part_index }, 1);
// };

/**
 * MAKE THE HTML!
 */
export function makeHtml() {
  const _main_file = fs.readFileSync("./book/main.tex", { encoding: "utf-8" });

  const latex_doc = _main_file
    // Remove preamble
    .replace("\\input{preamble.tex}", "")
    // Expand include macro
    .replaceAll(/\\include{(.*?)}/g, (match) => {
      const path = match.replace("\\include{", "./book/").replace("}", "");
      return fs.readFileSync(path, { encoding: "utf-8" });
    })
    // Expand input macro
    .replaceAll(/\\\\input{(.*?)}/g, (match) => {
      const path = match.replace("\\input{", "./book/").replace("}", "");
      return fs.readFileSync(path, { encoding: "utf-8" });
    })
    // Some tricky replacements
    .replaceAll(/\\begin{definition}\[(.*?)\]/g, (match) => {
      const name = match.match(/\[(.*?)\]/g)[0].slice(1, -1);
      return `${match}\n\\HTMLclassTitle{Definición: ${name}}`;
    })
    .replaceAll(/\\begin{theorem}\[(.*?)\]/g, (match) => {
      const name = match.match(/\[(.*?)\]/g)[0].slice(1, -1);
      return `${match}\n\\HTMLclassTitle{Teorema: ${name}}`;
    })
    .replaceAll(/\\begin{theorem}(?!\[(.*?)\])/g, (match) => {
      return `${match}\n\\HTMLclassTitle{Teorema:}`;
    })
    .replaceAll(/\\begin{proof}/g, (match) => {
      return `${match}\n\\HTMLclassTitle{Demostración:}`;
    });

  // process.exit(0);

  const latex_html = unified()
    .use(unifiedLatexFromString, {
      macros: {
        label: { signature: "m" },
        sidenote: { signature: "m" },
        HTMLclassTitle: { signature: "m" },
        newthought: { signature: "m" },
        tikzsetnextfilename: { signature: "m" },
      },
      environments: {
        theorem: { signature: "o" },
        definition: {
          signature: "o",
          processContent: (nodes) => {
            return nodes;
          },
        },
      },
    })
    .use(unifiedLatexToHast)
    .use(rehypeStringify)
    .processSync(latex_doc);

  const document = new JSDOM(latex_html.value).window.document;

  // Render KaTeX expressions
  document.querySelectorAll(".display-math, .inline-math").forEach(
    (node) =>
      (node.innerHTML = katex.renderToString(
        node.innerHTML
          .replace(/amp;|&&/g, "&")
          .replace(/&lt;/g, "<" )
          .replace(/&gt;/g, ">" ),
        node.classList.contains("inline-math")
          ? { macros: macros }
          : { macros: macros, displayMode: true, fleqn: true }
      ))
  );

  // Add id to label to be referenced
  document
    .querySelectorAll(".macro-label")
    .forEach((node) => (node.id = node.innerHTML.slice(1, -1)));

  // Convert ref in anchors tags
  document.querySelectorAll(".macro-ref").forEach((node) => {
    const refId = node.innerHTML.slice(1, -1);
    node.outerHTML = `<a href="#${refId}">ref</a>`;
  });

  // Remove filecontents declarations
  document.querySelectorAll("pre").forEach((node) => {
    if (node.classList.contains("filecontents*")) {
      node.parentNode.removeChild(node);
    }
  });

  //
  document.querySelectorAll(".macro-includegraphics").forEach((node) => {
    const name = node.innerHTML.match(/\{.*?\}/g)[0].slice(1, -1);

    if (name.includes("tikz")) {
      const _name = name.replace(".tikz", "");
      node.outerHTML = `<img src="figures/${_name}.svg" />`;
    }
  });

  // Remove braces from custom macros
  document
    .querySelectorAll(
      [".macro-HTMLclassTitle", ".macro-newthought", ".macro-sidenote"].join(
        ", "
      )
    )
    .forEach((node) => (node.innerHTML = node.innerHTML.slice(1, -1)));

  //Save
  // Build index must be first to update ids
  // fs.writeFileSync(
  //   "./webpage/html/menu.html",
  //   format(buildIndex(document), { parser: "html" })
  // );

  fs.writeFileSync(
    "./webpage/html/content.html",
    format(document.querySelector("body").innerHTML, { parser: "html" })
  );
}
