import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import katexStyle from './katex-style';
import katexScript from './katex-script';

export interface TrustContext {
  command: string;
  url: string;
  protocol: string;
}

export interface KatexOptions {
  displayMode?: boolean;
  output?: 'html' | 'mathml' | 'htmlAndMathml';
  leqno?: boolean;
  fleqn?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: any;
  minRuleThickness?: number;
  colorIsTextColor?: boolean;
  maxSize?: number;
  maxExpand?: number;
  strict?: boolean | string | Function;
  trust?: boolean | ((context: TrustContext) => boolean);
  globalGroup?: boolean;
}

export interface ContentOptions extends KatexOptions {
  inlineStyle?: string;
  expression?: string;
}

function getContent({ inlineStyle, expression, ...options }: ContentOptions) {
  return `<!DOCTYPE html>
<html>
<head>
<style>
${katexStyle}
${inlineStyle}
</style>
<script>
window.onerror = e => document.write(e);
window.onload = () => katex.render(${JSON.stringify(
    expression,
  )}, document.body, ${JSON.stringify(options)});
${katexScript}
</script>
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
</head>
<body>
</body>
</html>
`;
}

const defaultStyle = StyleSheet.create({
  root: {
    height: 40,
  },
});

const defaultInlineStyle = `
html, body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  overflowX: auto;
}
.katex {
  margin: 0;
  display: flex;
  overflowX: auto;
}
`;

export interface KatexProps extends ContentOptions {
  style: object;
  containerStyle: object;
  onLoad: any;
  onError: any;
  injectedJavaScript?: any;
  onMessage?: any;
}

export default function Katex({
  style,
  containerStyle,
  onLoad,
  onError,
  injectedJavaScript,
  onMessage,
  ...options
}: KatexProps) {
  const [height, setHeight] = useState(0);

  const webViewScript = `
    setTimeout(function() {
      const el = document.querySelector(".katex");
      window.ReactNativeWebView.postMessage(el.scrollHeight); 
    }, 100);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const handleMessage = useCallback(
    (event: any) => {
      try {
        const newHeight = parseInt(event.nativeEvent.data);
        height !== newHeight && setHeight(newHeight);
      } catch (error) {
        console.error(error);
        return;
      }
    },
    [height],
  );

  return (
    <WebView
      style={{ ...style, height }}
      containerStyle={{ ...containerStyle }}
      source={{ html: getContent(options) }}
      onLoad={onLoad}
      onError={onError}
      renderError={onError}
      injectedJavaScript={injectedJavaScript || webViewScript}
      onMessage={onMessage || handleMessage}
      javaScriptEnabled={true}
      scrollEnabled={false}
      useWebKit={true}
      automaticallyAdjustContentInsets={false}
      scalesPageToFit={false}
    />
  );
}

Katex.defaultProps = {
  expression: '',
  displayMode: false,
  throwOnError: false,
  errorColor: '#f00',
  inlineStyle: defaultInlineStyle,
  style: defaultStyle,
  containerStyle: { flex: 0 },
  macros: {},
  colorIsTextColor: false,
  onLoad: () => { },
  onError: (e: any) => console.log(e),
};
