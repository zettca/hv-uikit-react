import {
  CodeEditor as LiveCodeEditor,
  type CodeEditorProps as LiveCodeEditorProps,
} from "react-live-runner";
import { clsx } from "clsx";

export interface CodeEditorProps extends LiveCodeEditorProps {}

export function CodeEditor({ className, ...others }: CodeEditorProps) {
  return (
    <LiveCodeEditor
      data-pagefind-ignore
      className={clsx(
        "font-mono text-[.85em] rounded-b-round border-border",
        className,
      )}
      {...others}
    />
  );
}
