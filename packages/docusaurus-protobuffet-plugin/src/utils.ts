
// convert google/protobuf/any.proto to /goo/pro/any.proto
export const shortenFileName = (fileName: string): string => {
  const splitName = fileName.split("/");

  return splitName
    .map((name, i) => i == (splitName.length - 1) ? name : name.substr(0, 3))
    .join("/");
}

// convert google/protobuf/any.proto to any.proto
export const getLeafFileName = (fileName: string): string => {
  return fileName.split("/").pop()!;
}
