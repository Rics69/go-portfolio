export type JsonToken = { kind: "key" | "string" | "literal" | "punct" | "space"; text: string };

// Pretty-prints like `jq`, but keeps arrays of primitives on a single line.
export function formatJson(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const inner = "  ".repeat(indent + 1);

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item !== "object" || item === null)) {
      return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
    }
    return `[\n${value.map((item) => inner + formatJson(item, indent + 1)).join(",\n")}\n${pad}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(
      ([key, item]) => `${inner}${JSON.stringify(key)}: ${formatJson(item, indent + 1)}`,
    );
    return `{\n${entries.join(",\n")}\n${pad}}`;
  }

  return JSON.stringify(value);
}

const tokenPattern = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)|([{}[\],:])|(\s+)/g;

export function tokenizeJsonLine(line: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  for (const match of line.matchAll(tokenPattern)) {
    const [, str, colon, literal, num, punct, space] = match;
    if (str) {
      tokens.push({ kind: colon ? "key" : "string", text: str });
      if (colon) tokens.push({ kind: "punct", text: colon });
    } else if (literal || num) {
      tokens.push({ kind: "literal", text: literal ?? num });
    } else if (punct) {
      tokens.push({ kind: "punct", text: punct });
    } else if (space) {
      tokens.push({ kind: "space", text: space });
    }
  }
  return tokens;
}
