// need the empty array to prevent an error for default 'empty' error
const removeAdded = (previous = [], current = []) => {
  const removed = previous.filter((prev) => !current.includes(prev));
  const added = current.filter((curr) => !previous.includes(curr));
  return [removed, added];
};

export { removeAdded };
