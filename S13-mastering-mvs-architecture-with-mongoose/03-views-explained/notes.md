# View in MVC

## The View is responsible for displaying the UI

In traditional MVC, it handles Server-Side Rendering (SSR) by generating dynamic HTML or JSX.

## Common View Engines in Express:

### EJS (Embedded JavaScript)

- Syntax similar to HTML with `<%= %>` to insert dynamic data
- Easy to integrate

### Pug (formerly Jade)

- Minimalist template engine
- Uses indentation instead of HTML tags

### Handlebars

- Logic-less templating
- Uses `{{ }}` for dynamic data

### react-express-view

- Allows rendering React components (JSX) on the server
- Great for React-based SSR apps
