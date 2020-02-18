# template-tag-utils

In your HTML

```html
<body>
  <div class="List">
    <template id="item">
      <div class="Item">
        <h1 data-slot="title"></h1>
        <img data-slot="image" />
        <p data-slot="description"></p>
      </div>
    </template>
  </div>
</body>
```

```js
const [clonedTemplate, parent] = getCloneAndParent({ id: "item" });
const slots = getSlots(clonedTemplate); // { title: h1 Element, image: img Element, description: p Element }

slots.title.textContent = "Hello";

slots.image.src = "https://picsum.photos/200";
slots.image.alt = "super description";

slot.description.textContent =
  "Mal nommer les choses, c'est ajouter au malheur du monde";
slot.description.style.fontStyle = "italic";

parent.appendChild(clonedTemplate);
```

## getCloneAndParent("selector")

This function take a vaild javascript selector. It returns a tuple containing the clonedTemplate as first item and the parent element of the template as a second item.

## getSlots(clonedTemplate)

If elements inside your template tag are using the slot data-attribute you can access them with the slot name you defined
