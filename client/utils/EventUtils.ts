export function isModifiedMouseEvent(
  e: MouseEvent | React.MouseEvent<any>,
): boolean {
  return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.defaultPrevented
}
