import { parse } from "json5";
import { mediaToDisplay } from "./media2display";


// extract parameters from the jupyter notebook's parameter cell
function readMetadata(notebookJSON) {
  if (!notebookJSON)
    return null;

  let { metadata, cells } = notebookJSON;

  const { name } = metadata["colab"]

  const descriptionCell = cells.find(isMarkdownCell)
  const parameterCell = cells.find(isParameterCell)

  const description = descriptionCell ? descriptionCell["source"]
    .join("\n") : null;

  const parameterTexts = parameterCell ? parameterCell["source"] : null


  if (!parameterTexts)
    return null

  const allParameters = parameterTexts
    .map(extractParametersWithComment)
    .filter(param => param)
    .map(mapToJSONFormField)

  const properties = Object.fromEntries(allParameters)
  const primaryInput = allParameters[0][0]

  return {
    form: {
      // "title": name,
      // description,
      // type, 
      properties
    },
    name,
    description,
    numCells: cells.length,
    primaryInput
  }

};

// Extract parameter with preceding comment (to override form description with something more meaningful)
const extractParametersWithComment = (text, i, codeRows) => {
  const params = extractParameters(text) || extractEnumerableParameters(text);

  const previousRow = codeRows[i - 1];
  if (params && previousRow && previousRow.trim().startsWith("#") && !previousRow.includes("#@param")) {
    const description = previousRow.trim().slice(1).trim();
    return { ...params, description }
  }

  return params;
}


// Extracts the parameters from a Colab parameter row
const extractParameters = text => {
  const match = text.match(/^([a-zA-Z0-9-_]+)\s=\s(.*)\s+#@param\s*{type:\s*"(.*)"}/);
  if (!match)
    return null;
  const [_text, name, defaultVal, type] = match;
  return { name, defaultVal, type };
}

// Extracts the enumerable parameters from a Colab parameter row
const extractEnumerableParameters = text => {
  const match = text.match(/^([a-zA-Z0-9-_]+)\s=\s*(.*)\s*#@param\s*(\[.*\])/)
  if (!match)
    return null
  const [_text, name, defaultVal, enumString] = match
  return { name, defaultVal, type: "string", enumOptions: parse(enumString) }
}

const mapToJSONFormField = ({ name, defaultVal, type, description, enumOptions }) => {

  // If the regex were better we would not need to trim here
  defaultVal = defaultVal.trim()

  if (defaultVal == "True" || defaultVal == "False")
    defaultVal = defaultVal.toLowerCase()

  return [name, {
    enum: enumOptions, type, default: parse(defaultVal),
    // title: description || name, 
    title: name,
    description
  }]
}

// finds the first cell that contains code and the string #@param
const isParameterCell = cell => cell["cell_type"] === "code" && cell["source"].join("\n").includes("#@param");

// finds the first cell of type markdown
const isMarkdownCell = cell => cell["cell_type"] === "markdown";


export const getNotebookMetadata = ipfs => {

  // Read metadata
  const metadata = readMetadata((ipfs?.input && ipfs.input["notebook.ipynb"]) || ipfs && ipfs["notebook.ipynb"])  
  
  // get primary input type
  const primaryInputField = metadata?.primaryInput

  // Outputs
  const primaryInput = ipfs?.input?.[primaryInputField]
  const firstContent = mediaToDisplay(ipfs?.output)?.first

  return { primaryInput, firstContent }
}

