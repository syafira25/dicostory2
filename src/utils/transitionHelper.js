export function transitionHelper({ isSensitive = false, updateDOM }) {
  if (!document.startViewTransition || isSensitive) {
    updateDOM();
    return {};
  }

  const transition = document.startViewTransition(() => {
    updateDOM();
  });

  return transition;
}
