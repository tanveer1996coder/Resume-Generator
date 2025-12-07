import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates, categories } from '../data/templates';
import { useResume } from '../context/ResumeContext';

const TemplatePage = () => {
    const navigate = useNavigate();
    const { setDesign } = useResume();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleSelect = (templateId) => {
        setDesign(templateId);
        navigate('/editor');
    };

    const filteredTemplates = selectedCategory === 'all'
        ? templates
        : templates.filter(t => t.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Choose a Template</h1>
                <p className="text-gray-500 text-center mb-8">Select a design that fits your industry and style.</p>

                {/* Categories / Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {filteredTemplates.map((t) => (
                        <div key={t.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all border border-gray-100">
                            {/* Mock Preview */}
                            <div className={`h-64 ${t.color} flex items-center justify-center relative`}>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all" />
                                <span className="text-gray-400 font-bold uppercase tracking-widest">{t.name}</span>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-800">{t.name}</h3>
                                    {t.tags && t.tags.includes('ats-friendly') && (
                                        <span className="px-2 py-0.5 bg-green-100 text-[10px] font-bold rounded text-green-700 uppercase tracking-wider">ATS</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{t.description}</p>

                                <button
                                    onClick={() => handleSelect(t.id)}
                                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                                >
                                    Use This Template
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No templates found for this category yet.</p>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="text-indigo-600 font-bold mt-2 hover:underline"
                        >
                            View all templates
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplatePage;
