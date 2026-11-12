//Do not call trim() until the value is known to be a string
const getText = function getText(value, fallback = 'Unknown') {
  return typeof value === 'string' && value.trim() !== ''
    ? value.trim()
    : fallback;
};

//Retain every record, including those with missing grouping fields
const groupByField = function groupByField(records, field) {
  const groups = new Map();

  records.forEach((record) => {
    const label = getText(record?.[field]);
    const members = groups.get(label) ?? [];

    members.push(record);
    groups.set(label, members);
  });

  return Array.from(groups, ([label, members]) => ({ label, members }))
    .sort((first, second) => first.label.localeCompare(second.label));
};

export { getText, groupByField };
