## Quick Start

1. Installation: Inside your project directory, install Bolio Icons by running either of the following:

```bash
yarn add @bolio-ui/icons
# or
npm i @bolio-ui/icons
```

2. For example, go to the root of your application and do this:

```jsx
import React from 'react'
import { Home } from '@bolio-ui/icons'

const App = () => {
  return <Home />
}

export default App
```

## Custom Style Example

```jsx
import React from 'react'
import { Heart } from '@bolio-ui/icons'

const App = () => {
  return (
    <Heart
      style={{ transform: 'rotate(45deg)' }}
      fill="red"
      stroke="red"
      height={12}
      width={12}
      fontSize={12}
    />
  )
}

export default App
```

### Community

We're excited to see the community adopt Bolio UI, raise issues, and provide feedback.
Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Twitter](https://twitter.com/bolio_ui/)
- [Instagram](https://www.instagram.com/bolio.ui/)
- [GitHub](https://github.com/bolio-ui/bolio-ui/)

## License

[MIT](https://choosealicense.com/licenses/mit/) © [brunnoandrade](https://github.com/brunnoandrade/)
