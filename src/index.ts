export function getTemplateAndParent(id: string): [Node, HTMLElement] {
  const templateElement = document.getElementById(id) as HTMLTemplateElement;

  if (!templateElement) {
    throw new Error("You must provide a valide selector for your template");
  }

  const clonedTemplate = templateElement.content.cloneNode(true);
  const parent = templateElement.parentElement;

  if (!parent) {
    throw new Error("<template> must have a parent element");
  }

  return [clonedTemplate, parent];
}

export function getSlots(node: Node): Record<string, HTMLElement> {
  const element = <HTMLTemplateElement>node;

  if (element.childElementCount === 0) {
    const slotName = element.dataset?.slot as string;

    if (!slotName) {
      return {};
    }

    return { [slotName]: element };
  }

  const slotElements = Array.from(
    element.getElementsByTagName("*")
  ) as HTMLElement[];

  return slotElements
    .filter(slotElement => slotElement.dataset?.slot)
    .reduce((acc: Record<string, HTMLElement>, slotElement: HTMLElement) => {
      const slotName = slotElement.dataset.slot as string;

      return { ...acc, [slotName]: slotElement };
    }, {});
}
