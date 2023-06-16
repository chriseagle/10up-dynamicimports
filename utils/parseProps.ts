function parseProps<T>(props: { [name: string]: string }): T {
  const propsParsed: { [name: string]: string } = {};
  Object.entries(props)
    .filter((item) => !item[0].includes('component'))
    .forEach((item) => {
      const key = item[0].replace(/^data-/, '');
      propsParsed[key] = item[1];
    });
  return propsParsed as T;
}

export { parseProps };
