export function isBranchControlDisabled({
  locked,
  ready,
  selected,
  collapsed,
  reversing,
  isActive,
}) {
  return locked || collapsed || reversing || !ready || (selected && !isActive);
}

export function isBranchControlHidden({ selected, collapsed, reversing, isActive }) {
  return Boolean(selected || collapsed || reversing) && !isActive;
}
