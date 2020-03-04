// function that return new object without reactivity
export default (object: any) => {
  return JSON.parse(JSON.stringify(object));
};
