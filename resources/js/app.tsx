import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { TooltipProvider } from '@/components/ui/tooltip';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.tsx') as Record<
    string,
    () => Promise<{ default: React.ComponentType }>
>;

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const importPage = pages[`./pages/${name}.tsx`];

        if (!importPage) {
            throw new Error(`Halaman Inertia tidak ditemukan: ${name}`);
        }

        const module = await importPage();
        return module.default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <TooltipProvider>
                <App {...props} />
            </TooltipProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
