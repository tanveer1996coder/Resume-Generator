
export const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'creative', label: 'Creative' },
    { id: 'academic', label: 'Academic' },
    { id: 'minimalist', label: 'Minimalist' }
];

export const templates = [
    {
        id: 'modern',
        name: 'Modern Professional',
        description: 'A clean, balanced design suitable for most corporate roles.',
        category: 'corporate',
        color: 'bg-blue-100',
        tags: ['professional', 'ats-friendly']
    },
    {
        id: 'minimal',
        name: 'Clean Minimalist',
        description: 'Simple and elegant, perfect for highlighting content without distraction.',
        category: 'minimalist',
        color: 'bg-gray-100',
        tags: ['clean', 'simple']
    },
    {
        id: 'creative',
        name: 'Artistic Portfolio',
        description: 'Bold headers and unique layout for creative professionals.',
        category: 'creative',
        color: 'bg-pink-100',
        tags: ['designer', 'portfolio']
    },
    {
        id: 'compact',
        name: 'Compact Executive',
        description: 'Dense layout designed to fit extensive experience on fewer pages.',
        category: 'corporate',
        color: 'bg-indigo-100',
        tags: ['executive', 'dense']
    },
    {
        id: 'template1',
        name: 'Corporate Grid',
        description: 'Professional grid layout with dark header and clear skill separation.',
        category: 'corporate',
        color: 'bg-slate-800',
        tags: ['modern', 'grid']
    },
    {
        id: 'template2',
        name: 'Modern Sidebar',
        description: 'Clean design with a distinct right sidebar and teal accents.',
        category: 'creative',
        color: 'bg-teal-700',
        tags: ['sidebar', 'modern', 'teal']
    },
];
