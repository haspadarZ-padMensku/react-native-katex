# React Native [<img src="https://katex.org/img/katex-logo-black.svg" width="130" alt="KaTeX">](https://katex.org/)

[react-native-webview](https://github.com/react-native-community/react-native-webview) bundled with [KaTeX](https://github.com/Khan/KaTeX)

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Github CI Status][github-image]][github-url]
[![Travis CI Status][travis-image]][travis-url]

## Example

<p align="center">
  <img src="https://raw.githubusercontent.com/3axap4eHko/react-native-katex/master/screenshot.png" width="280" alt="React Native KaTeX">  
</p>

## Usage

```javascript
import { StyleSheet } from 'react-native';
import Katex from 'react-native-katex';

const styles = StyleSheet.create({
  katex: {
    flex: 0,
    overflow: 'visible',
  },
  katexContainer: {
    flex: 0,
    overflow: 'visible',
  },
});

const inlineStyle = `
html, body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}
.katex {
  font-size: 24px;
  margin: 0;
  padding: 8px;
  display: flex;
  overflow: auto;
}
`;

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [expression, setExpression] = useState('c=\\pm\\sqrt{a^2 + b^2}');

  return (
    <Katex
      expression={message}
      style={styles.katex}
      containerStyle={styles.katexContainer}
      inlineStyle={inlineStyle}
      displayMode={false}
      throwOnError={false}
      errorColor="#f00"
      macros={{}}
      colorIsTextColor={false}
      onLoad={() => console.log('loaded')}
      onError={() => console.error('Error')}
    />
  );
}
```

## License

License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2017-2020 Ivan Zakharchanka

[downloads-image]: https://img.shields.io/npm/dm/react-native-katex.svg
[npm-url]: https://www.npmjs.com/package/react-native-katex
[npm-image]: https://img.shields.io/npm/v/react-native-katex.svg
[github-url]: https://github.com/3axap4eHko/react-native-katex/actions
[github-image]: https://github.com/3axap4eHko/react-native-katex/workflows/Github%20CI/badge.svg?branch=master
[travis-url]: https://travis-ci.org/3axap4eHko/react-native-katex
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-native-katex/master.svg
[expo-image]: https://raw.githubusercontent.com/3axap4eHko/react-native-katex/master/screenshot.png
