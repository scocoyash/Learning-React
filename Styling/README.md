## React - What I learned!

### Styling
---

Using pseudo-selectors and media-queries using **Radium**

> import Radium, { StyleRoot } from 'radium'

- Good for inline styling

---

Use **styled-components** for styling.

---
*Preferred*

You can tweak your web-pack config in order to change css imports in your project.
After this, you can import css elements as classes within your app.
This concept is called **CSS-Modules**. With CSS modules, you can write normal CSS code and make sure, that it only applies to a given component.

It's not using magic for that, instead it'll simply automatically generate unique CSS class names for you. And by importing a JS object and assigning classes from there, you use these dynamically generated, unique names.

---


