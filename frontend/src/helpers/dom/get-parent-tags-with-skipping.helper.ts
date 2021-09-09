const SKIPPED_TAGS = ['DIV', 'P'];

const getParentsWithSkipping = (
  node: HTMLElement | null,
  skippedTags = SKIPPED_TAGS,
): string[] =>
  (node && skippedTags.some((tag) => node.tagName.includes(tag))
    ? getParentsWithSkipping(node.parentElement)
    : []
  ).concat([node?.tagName || '']);

export { getParentsWithSkipping };
