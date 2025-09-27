export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] {
  const totalPageNumbers = siblingCount * 2 + 5; // e.g. 7 = [1] ... [3 4 5] ... [10]

  // Case 1: total pages fits without "..."
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPage = 1;
  const lastPage = totalPages;

  // Case 2: no left dots, but right dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  // Case 3: left dots, but no right dots
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i
    );
    return [firstPage, "...", ...rightRange];
  }

  // Case 4: both left and right dots
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: 2 * siblingCount + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPage, "...", ...middleRange, "...", lastPage];
  }

  return [];
}
