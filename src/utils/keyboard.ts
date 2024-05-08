// 添加全局快捷键
export interface Shortcut {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  command: (keyboardEvent: KeyboardEvent) => void;
}
const shortcuts: Shortcut[] = [];
export function createShortcut(key: string, command: Shortcut["command"]): Shortcut {
  return {
    ...parseKey(key),
    command,
  };
}
export function registerShortcut(key: string, command: Shortcut["command"]) {
  console.log("%c Line:16 🥒 key", "color:#b03734", key, command);
  const shortcut = createShortcut(key, command);
  shortcuts.push(shortcut);
  return shortcut;
}

function parseKey(keyString: string) {
  const keys = keyString.toLowerCase().split("+");

  const result = {
    key: keys[keys.length - 1], // 取数组最后一个元素作为 key
    ctrlKey: keys.includes("ctrl"),
    metaKey: keys.includes("command"),
  };

  console.log("%c Line:26 🥑 result", "color:#6ec1c2", result);
  return result;
}

export function cancelShortcut(key: string, command: Shortcut["command"]): void;
export function cancelShortcut(shortcut: Shortcut): void;
export function cancelShortcut(keyOrShortcut: string | Shortcut, command?: Shortcut["command"]) {
  function normalizeShortcut() {
    let normalShortcut: Shortcut;
    if (typeof keyOrShortcut === "string" && command) {
      normalShortcut = createShortcut(keyOrShortcut, command);
    } else {
      normalShortcut = keyOrShortcut as Shortcut;
    }

    return normalShortcut;
  }

  let normalShortcut = normalizeShortcut();

  const index = shortcuts.findIndex(({ key, command, ctrlKey, metaKey }) => {
    // 精准匹配对应快捷键对象
    return (
      key === normalShortcut.key &&
      ctrlKey === normalShortcut.ctrlKey &&
      metaKey === normalShortcut.metaKey &&
      command === normalShortcut.command
    );
  });

  if (index !== -1) {
    // 删除
    shortcuts.splice(index, 1);
  }
}
