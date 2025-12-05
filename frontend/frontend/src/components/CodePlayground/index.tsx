import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose any style

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = 'console.log("Hello, Docusaurus!");',
  language = 'javascript',
}) => {
  const [output, setOutput] = useState<string>('');
  const [code, setCode] = useState<string>(initialCode);

  const runCode = () => {
    // Simulate code execution
    setOutput(`Simulated output for ${language} code:\n${code}\n(Actual code execution is not supported in this placeholder.)`);
  };

  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-400)',
      borderRadius: '8px',
      margin: '20px 0',
      backgroundColor: 'var(--ifm-background-surface-color)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '15px', borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>
        <SyntaxHighlighter language={language} style={atomDark} customStyle={{ margin: 0 }}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button
          onClick={runCode}
          style={{
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 15px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Run Code
        </button>
      </div>
      {output && (
        <div style={{
          borderTop: '1px solid var(--ifm-color-emphasis-300)',
          padding: '15px',
          backgroundColor: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: '0.9em',
        }}>
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
