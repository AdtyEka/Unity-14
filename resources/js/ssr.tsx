import { createInertiaApp } from '@inertiajs/react';
import { renderToString } from 'react-dom/server';
import { TooltipProvider } from '@/components/ui/tooltip';

const pages = import.meta.glob('./pages/**/*.tsx') as Record<
    string,
    () => Promise<{ default: React.ComponentType }>
>;

export default createInertiaApp({
    resolve: async (name) => {
        const importPage = pages[`./pages/${name}.tsx`];

        if (!importPage) {
            throw new Error(`Halaman Inertia tidak ditemukan: ${name}`);
        }

        const module = await importPage();
        return module.default;
    },
    setup({ App, props }) {
        return renderToString(
            <TooltipProvider>
                <App {...props} />
            </TooltipProvider>,
        );
    },
});
