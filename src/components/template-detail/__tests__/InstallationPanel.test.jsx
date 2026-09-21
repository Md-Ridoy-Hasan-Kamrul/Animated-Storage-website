import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InstallationPanel, {
  PACKAGE_MANAGERS,
  usageBodyForStack,
} from '../InstallationPanel';
import { KMOTION_PACKAGE } from '../../../utils/kmotionNpmSnippet';
import { copyTextToClipboard } from '../../../utils/copyTextToClipboard';

jest.mock('../../../utils/copyTextToClipboard', () => ({
  copyTextToClipboard: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

describe('InstallationPanel', () => {
  beforeEach(() => {
    copyTextToClipboard.mockClear();
  });

  it('renders both install steps for @kmotion/animation', () => {
    render(<InstallationPanel templateId="kage" />);
    expect(screen.getByRole('heading', { name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Install the package' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Import the preview' })).toBeInTheDocument();
    expect(screen.getByText(KMOTION_PACKAGE)).toBeInTheDocument();
  });

  it('shows only the install command on step 1', () => {
    render(<InstallationPanel templateId="kage" />);
    expect(screen.getByText(`npm install ${KMOTION_PACKAGE}`)).toBeInTheDocument();
  });

  it('switches package manager commands without changing the import', () => {
    render(<InstallationPanel templateId="kage" />);

    fireEvent.click(screen.getByRole('tab', { name: 'pnpm' }));
    expect(screen.getByText(`pnpm add ${KMOTION_PACKAGE}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'bun' }));
    expect(screen.getByText(`bun add ${KMOTION_PACKAGE}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'yarn' }));
    expect(screen.getByText(`yarn add ${KMOTION_PACKAGE}`)).toBeInTheDocument();

    expect(screen.getByText(/@kmotion\/animation\/react/)).toBeInTheDocument();
  });

  it('switches the import by framework and leaves install on npm', () => {
    render(<InstallationPanel templateId="kage" />);
    fireEvent.click(screen.getByRole('tab', { name: 'JS' }));
    expect(screen.getByText(`npm install ${KMOTION_PACKAGE}`)).toBeInTheDocument();
    expect(document.body.textContent).toContain('querySelector');
    expect(document.body.textContent).toContain('"kage"');
    expect(usageBodyForStack('kage', 'js')).toContain('id: "kage"');
    expect(usageBodyForStack('kage', 'js')).not.toContain('npm install');
  });

  it('copies install and import separately', async () => {
    render(<InstallationPanel templateId="kage" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy install command' }));
    await waitFor(() => {
      expect(copyTextToClipboard).toHaveBeenCalledWith(PACKAGE_MANAGERS[0].command(KMOTION_PACKAGE));
    });

    fireEvent.click(screen.getByRole('button', { name: 'Copy import' }));
    await waitFor(() => {
      expect(copyTextToClipboard).toHaveBeenCalledWith(usageBodyForStack('kage', 'react'));
    });
  });
});
