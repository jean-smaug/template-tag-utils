export function getTemplateAndParent(selector: string): [Node, HTMLElement] {
  const templateElement = <HTMLTemplateElement>document.querySelector(selector);

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
    const slotName = <string>element.dataset?.slot;

    if (!slotName) {
      return {};
    }

    return { [slotName]: element };
  }

  const slotElements = <HTMLElement[]>(
    Array.from(element.getElementsByTagName("*"))
  );

  return slotElements
    .filter(slotElement => slotElement.dataset?.slot)
    .reduce((acc: Record<string, HTMLElement>, slotElement: HTMLElement) => {
      const slotName = slotElement.dataset.slot as string;

      return { ...acc, [slotName]: slotElement };
    }, {});
}
