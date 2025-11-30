import type { FileNode } from '@/types/filesystem.types';

interface CommandContext {
  currentPath: string;
  getNodeByPath: (path: string) => FileNode | undefined;
  getChildrenOfNode: (nodeId: string) => FileNode[];
  nodes: Record<string, FileNode>;
}

export interface CommandResult {
  output: string;
  newPath?: string;
}

export function executeCommand(
  command: string,
  context: CommandContext
): CommandResult {
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case 'ls':
      return handleLs(context);

    case 'cd':
      return handleCd(args[0] || '/home/ubuntu', context);

    case 'pwd':
      return { output: context.currentPath };

    case 'cat':
      return handleCat(args[0], context);

    case 'echo':
      return { output: args.join(' ') };

    case 'clear':
      return { output: '__CLEAR__' };

    case 'help':
      return {
        output: `Available commands:
  ls          - List files in current directory
  cd <path>   - Change directory
  pwd         - Print working directory
  cat <file>  - Display file contents
  echo <text> - Print text
  clear       - Clear terminal
  help        - Show this help message`,
      };

    case '':
      return { output: '' };

    default:
      return { output: `bash: ${cmd}: command not found` };
  }
}

function handleLs(context: CommandContext): CommandResult {
  const currentNode = context.getNodeByPath(context.currentPath);
  if (!currentNode) {
    return { output: 'ls: cannot access: No such file or directory' };
  }

  if (currentNode.type !== 'folder') {
    return { output: currentNode.name };
  }

  const children = context.getChildrenOfNode(currentNode.id);
  if (children.length === 0) {
    return { output: '' };
  }

  const folders = children.filter(c => c.type === 'folder').map(c => c.name);
  const files = children.filter(c => c.type === 'file').map(c => c.name);

  return {
    output: [...folders, ...files].join('  '),
  };
}

function handleCd(path: string, context: CommandContext): CommandResult {
  let targetPath = path;

  // Handle relative paths
  if (path === '..') {
    const parts = context.currentPath.split('/').filter(Boolean);
    parts.pop();
    targetPath = '/' + parts.join('/');
    if (targetPath === '') targetPath = '/';
  } else if (path === '~') {
    targetPath = '/home/ubuntu';
  } else if (path === '/') {
    targetPath = '/';
  } else if (!path.startsWith('/')) {
    // Relative path
    targetPath = `${context.currentPath === '/' ? '' : context.currentPath}/${path}`;
  }

  const node = context.getNodeByPath(targetPath);
  if (!node) {
    return { output: `cd: ${path}: No such file or directory` };
  }

  if (node.type !== 'folder') {
    return { output: `cd: ${path}: Not a directory` };
  }

  return { output: '', newPath: targetPath };
}

function handleCat(filename: string | undefined, context: CommandContext): CommandResult {
  if (!filename) {
    return { output: 'cat: missing file operand' };
  }

  const filePath = filename.startsWith('/')
    ? filename
    : `${context.currentPath === '/' ? '' : context.currentPath}/${filename}`;

  const node = context.getNodeByPath(filePath);
  if (!node) {
    return { output: `cat: ${filename}: No such file or directory` };
  }

  if (node.type === 'folder') {
    return { output: `cat: ${filename}: Is a directory` };
  }

  return { output: node.content || '' };
}
