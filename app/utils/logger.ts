const formatMessages = (messages: any) => {
  const [first, ...other] = messages;
  return [typeof first === 'string' ? `[🍉] ${first}` : first, ...other];
};

let silent: boolean = false;
const _console = __DEV__ ? console.tron : console;

function log(...messages: any[]): void {
  !silent && _console?.log(...formatMessages(messages));
}

function warn(...messages: any[]): void {
  !silent && _console.warn(formatMessages(messages));
}

function error(e: Error | unknown): void {
  if (e instanceof Error) {
    !silent && _console.error(e?.message, e?.stack);
  } else !silent && _console.error(e, 'Unknown error');
}

function silence(): void {
  silent = true;
}

export default {
  warn,
  log,
  error,
  silence,
};
