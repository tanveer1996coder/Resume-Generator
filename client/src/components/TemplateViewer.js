import React, { forwardRef } from 'react';
import { MapPin, Mail, Phone, Linkedin, Globe, Github, Briefcase } from 'lucide-react';

const TemplateViewer = forwardRef(({ data, templateId = 'modern', activeDocument, coverLetterData }, ref) => {

    // Standard Cover Letter Layout
    if (activeDocument === 'coverLetter') {
        return (
            <div ref={ref} className="w-full h-full bg-white shadow-lg p-12 text-gray-800" style={{ minHeight: '1100px' }}>
                {/* Header */}
                <div className="border-b-2 border-gray-800 pb-6 mb-8">
                    <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
                    <div className="flex gap-4 text-sm mt-3 text-gray-600 font-medium tracking-wide">
                        <span>{data.personalInfo.email}</span>
                        <span>•</span>
                        <span>{data.personalInfo.phone}</span>
                        {data.personalInfo.linkedin && (
                            <>
                                <span>•</span>
                                <span>{data.personalInfo.linkedin}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Recipient Info */}
                <div className="mb-8 text-sm leading-relaxed">
                    <div className="font-bold text-gray-900">{new Date().toLocaleDateString()}</div>
                    <br />
                    <div className="font-bold text-gray-900">{coverLetterData?.recipientName || 'Hiring Manager'}</div>
                    <div className="text-gray-700">{coverLetterData?.recipientTitle}</div>
                    <div className="text-gray-700">{coverLetterData?.companyName}</div>
                    <div className="text-gray-700">{coverLetterData?.companyAddress}</div>
                </div>

                {/* Body */}
                <div className="space-y-4 text-gray-800 leading-7 text-justify">
                    <div className="font-bold">{coverLetterData?.greeting || 'Dear Hiring Manager,'}</div>
                    <div className="whitespace-pre-line min-h-[300px]">
                        {coverLetterData?.body || 'I am writing to express my strong interest in...'}
                    </div>
                </div>

                {/* Sign-off */}
                <div className="mt-8">
                    <div className="mb-4">{coverLetterData?.signOff || 'Sincerely,'}</div>
                    <div className="font-dancing text-2xl text-gray-600 my-2">{data.personalInfo.fullName}</div>
                    <div className="font-bold border-t border-gray-300 w-48 pt-2">{data.personalInfo.fullName}</div>
                </div>
            </div>
        );
    }

    // Helper to render section items based on type
    const renderItems = (section) => {
        if (!section.items || section.items.length === 0) return null;

        if (section.type === 'experience' || section.type === 'education') {
            return (
                <div className="space-y-4">
                    {section.items.map((item, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-gray-800 text-lg">
                                    {item.position || item.degree}
                                </h4>
                                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                                    {item.duration || item.year}
                                </span>
                            </div>
                            <div className="text-gray-700 font-semibold mb-1">
                                {item.company || item.institution}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            );
        }

        if (section.type === 'skills' || section.type === 'list') {
            return (
                <div className="flex flex-wrap gap-2">
                    {section.items.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium">
                            {typeof item === 'string' ? item : item.name}
                        </span>
                    ))}
                </div>
            );
        }
        return null;
    };

    // --- Template Designs ---

    // 1. Modern Clean: Two-column, simple, effective.
    const ModernClean = () => (
        <div className="w-full h-full bg-white p-8 font-sans text-gray-800 flex flex-col gap-6">
            <header className="border-b-2 border-gray-800 pb-6 mb-2 flex justify-between items-start">
                <div>
                    <h1 className="text-5xl font-bold uppercase tracking-tight text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-xl text-gray-600 font-medium mb-4">{data.personalInfo.role}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {data.personalInfo.email && <div className="flex items-center gap-1"><Mail size={14} /> {data.personalInfo.email}</div>}
                        {data.personalInfo.phone && <div className="flex items-center gap-1"><Phone size={14} /> {data.personalInfo.phone}</div>}
                        {data.personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin size={14} /> {data.personalInfo.linkedin}</div>}
                        {data.personalInfo.location && <div className="flex items-center gap-1"><MapPin size={14} /> {data.personalInfo.location}</div>}
                    </div>
                </div>
                {data.personalInfo.photo && (
                    <img src={data.personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover border-4 border-gray-200 rounded-lg shadow-sm" />
                )}
            </header>

            <div className="grid grid-cols-12 gap-8 h-full">
                {/* Main Column */}
                <div className="col-span-8 flex flex-col gap-6">
                    {data.summary && (
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 mb-3">Professional Profile</h3>
                            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
                        </section>
                    )}
                    {data.sections.filter(s => s.column === 'main' || (!s.column && s.type === 'experience')).map(section => (
                        <section key={section.id}>
                            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 mb-3">{section.title}</h3>
                            {renderItems(section)}
                        </section>
                    ))}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-4 bg-gray-50 p-4 rounded-lg h-full flex flex-col gap-6">
                    {data.sections.filter(s => s.column === 'sidebar' || (!s.column && s.type !== 'experience')).map(section => (
                        <section key={section.id}>
                            <h3 className="text-base font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-3">{section.title}</h3>
                            {section.type === 'skills' || section.type === 'list' ? (
                                <div className="flex flex-wrap gap-2">
                                    {section.items.map((item, idx) => (
                                        <span key={idx} className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold block w-full text-center shadow-sm">
                                            {typeof item === 'string' ? item : item.name}
                                        </span>
                                    ))}
                                </div>
                            ) : renderItems(section)}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );

    // 2. Professional: Classic, elegant, serif headers, centered top.
    const Professional = () => (
        <div className="w-full h-full bg-white p-10 font-serif text-gray-800">
            <header className="text-center border-b-2 border-double border-gray-300 pb-8 mb-8">
                {data.personalInfo.photo && (
                    <img src={data.personalInfo.photo} alt="Profile" className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-2 border-gray-300" />
                )}
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
                <p className="text-lg text-gray-600 italic mb-4">{data.personalInfo.role}</p>
                <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-500 font-sans">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="space-y-8 font-sans">
                {data.summary && (
                    <section>
                        <h3 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1">Summary</h3>
                        <p className="text-sm leading-relaxed text-gray-700 text-justify">{data.summary}</p>
                    </section>
                )}

                {data.sections.map(section => (
                    <section key={section.id}>
                        <h3 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1">{section.title}</h3>
                        <div className="pl-2">
                            {renderItems(section)}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );

    // 3. Creative: Pop of color, geometric, modern font.
    const Creative = () => (
        <div className="w-full h-full bg-white font-sans text-gray-800 flex">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-purple-900 text-white min-h-full p-8 flex flex-col gap-8">
                <div className="space-y-4">
                    <div className="w-32 h-32 bg-purple-400 rounded-full mx-auto border-4 border-white mb-4 overflow-hidden flex items-center justify-center">
                        {data.personalInfo.photo ? (
                            <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-bold text-white opacity-50">{data.personalInfo.fullName.charAt(0)}</span>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-center leading-tight">{data.personalInfo.fullName}</h1>
                    <p className="text-center text-purple-200 font-medium uppercase tracking-widest text-sm">{data.personalInfo.role}</p>
                </div>

                <div className="text-sm space-y-3 opacity-90">
                    {data.personalInfo.email && <div className="flex items-center gap-2 break-all"><Mail size={14} /> {data.personalInfo.email}</div>}
                    {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {data.personalInfo.phone}</div>}
                    {data.personalInfo.linkedin && <div className="flex items-center gap-2 break-all"><Linkedin size={14} /> {data.personalInfo.linkedin}</div>}
                    {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {data.personalInfo.location}</div>}
                </div>

                <div className="flex-1 space-y-6">
                    {/* Render specific sections in sidebar like Skills */}
                    {data.sections.filter(s => s.type === 'skills' || s.type === 'list' || s.type === 'education').map(section => (
                        <section key={section.id}>
                            <h4 className="text-lg font-bold text-purple-200 uppercase tracking-wider mb-4 border-b border-purple-700 pb-2">{section.title}</h4>
                            {section.type === 'education' ? (
                                section.items.map((item, idx) => (
                                    <div key={idx} className="mb-4 text-sm">
                                        <div className="font-bold">{item.degree}</div>
                                        <div className="text-purple-300">{item.institution}</div>
                                        <div className="text-purple-300 opacity-75">{item.year}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {section.items.map((item, idx) => (
                                        <span key={idx} className="bg-purple-800 text-white px-2 py-1 rounded text-xs">
                                            {typeof item === 'string' ? item : item.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="w-2/3 p-10 flex flex-col gap-8">
                {data.summary && (
                    <section>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-purple-500 pl-3 uppercase">Profile</h3>
                        <p className="text-gray-600 leading-relaxed">{data.summary}</p>
                    </section>
                )}

                {data.sections.filter(s => s.type !== 'skills' && s.type !== 'list' && s.type !== 'education').map(section => (
                    <section key={section.id}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-purple-500 pl-3 uppercase">{section.title}</h3>
                        {/* Creative Custom Render for Experience */}
                        {section.type === 'experience' ? (
                            <div className="relative border-l-2 border-purple-100 ml-3 space-y-8 pl-8 py-2">
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="relative">
                                        <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full bg-purple-500 border-4 border-white shadow-sm"></span>
                                        <h4 className="font-bold text-xl text-gray-800">{item.position}</h4>
                                        <p className="text-purple-600 font-semibold text-sm mb-2">{item.company} | {item.duration}</p>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : renderItems(section)}
                    </section>
                ))}
            </div>
        </div>
    );

    // 4. Executive: Dark header, gold accents, authoritative.
    const Executive = () => (
        <div className="w-full h-full bg-white font-sans text-gray-800">
            <header className="bg-gray-900 text-white p-10 flex items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-yellow-600"></div>
                {data.personalInfo.photo && (
                    <img src={data.personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover border-4 border-yellow-600 rounded shadow-lg z-10" />
                )}
                <div className="z-10">
                    <h1 className="text-5xl font-serif font-bold tracking-tight mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-xl text-yellow-500 tracking-widest uppercase font-medium">{data.personalInfo.role}</p>
                </div>
            </header>

            <div className="bg-gray-100 p-4 border-b border-gray-300 text-sm font-medium text-gray-600 flex justify-center gap-6">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            </div>

            <div className="p-10 max-w-4xl mx-auto space-y-8">
                {data.summary && (
                    <section className="text-center">
                        <p className="text-lg leading-relaxed text-gray-700 italic border-l-4 border-yellow-600 pl-4 py-2 bg-gray-50 text-left rounded-r">{data.summary}</p>
                    </section>
                )}

                {data.sections.map(section => (
                    <section key={section.id}>
                        <div className="flex items-center mb-6">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <h3 className="px-4 text-xl font-bold uppercase tracking-wider text-gray-900">{section.title}</h3>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        {renderItems(section)}
                    </section>
                ))}
            </div>
        </div>
    );

    // 5. Minimalist: Single column, heavy use of whitespace, Helvetica-like.
    const Minimal = () => (
        <div className="w-full h-full bg-white p-12 font-sans flex flex-col gap-10 text-gray-900">
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4">{data.personalInfo.fullName}</h1>
                    <p className="text-2xl text-gray-500 font-light mb-8">{data.personalInfo.role}</p>
                    <div className="flex gap-6 text-sm text-gray-600 font-medium">
                        {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
                        {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                        {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
                    </div>
                </div>
                {data.personalInfo.photo && (
                    <img src={data.personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover grayscale brightness-110 contrast-125" />
                )}
            </header>

            <main className="grid grid-cols-1 gap-12 max-w-3xl">
                {data.summary && (
                    <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">About</h4>
                        <p className="text-lg leading-relaxed">{data.summary}</p>
                    </section>
                )}

                {data.sections.map(section => (
                    <section key={section.id}>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{section.title}</h4>
                        {renderItems(section)}
                    </section>
                ))}
            </main>
        </div>
    );

    // 6. Chicago: Classic serif design, traditional resume format
    const Chicago = () => (
        <div className="w-full h-full bg-white p-10 font-serif text-gray-900">
            <header className="border-b border-gray-900 pb-6 mb-8">
                <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
                <p className="text-lg text-gray-600 mb-4">{data.personalInfo.role}</p>
                <div className="flex flex-wrap gap-4 text-sm font-sans text-gray-700">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="space-y-8 font-sans">
                {data.summary && (
                    <section>
                        <h3 className="text-xl font-serif font-bold border-b border-gray-400 pb-2 mb-3">Professional Summary</h3>
                        <p className="text-sm leading-relaxed text-gray-800">{data.summary}</p>
                    </section>
                )}

                {data.sections.map(section => (
                    <section key={section.id}>
                        <h3 className="text-xl font-serif font-bold border-b border-gray-400 pb-2 mb-4">{section.title}</h3>
                        {renderItems(section)}
                    </section>
                ))}
            </div>
        </div>
    );

    // 7. Taj Mahal: Professional two-column with colored sidebar
    const TajMahal = () => (
        <div className="w-full h-full bg-white flex font-sans">
            {/* Left Sidebar - 35% */}
            <div className="w-[35%] bg-gradient-to-b from-blue-900 to-blue-800 text-white p-8 flex flex-col gap-6">
                {data.personalInfo.photo && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300 mx-auto">
                        <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-blue-200 text-sm uppercase tracking-wider">{data.personalInfo.role}</p>
                </div>

                <div className="space-y-3 text-sm">
                    {data.personalInfo.email && (
                        <div className="flex items-center gap-2 break-all">
                            <Mail size={16} className="flex-shrink-0" />
                            <span>{data.personalInfo.email}</span>
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="flex-shrink-0" />
                            <span>{data.personalInfo.phone}</span>
                        </div>
                    )}
                    {data.personalInfo.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="flex-shrink-0" />
                            <span>{data.personalInfo.location}</span>
                        </div>
                    )}
                    {data.personalInfo.linkedin && (
                        <div className="flex items-center gap-2 break-all">
                            <Linkedin size={16} className="flex-shrink-0" />
                            <span>{data.personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>

                <div className="h-px bg-blue-600"></div>

                {/* Sidebar sections (skills, education) */}
                {data.sections.filter(s => s.type === 'skills' || s.type === 'education').map(section => (
                    <section key={section.id}>
                        <h4 className="text-lg font-bold text-blue-100 uppercase mb-3">{section.title}</h4>
                        {section.type === 'education' ? (
                            section.items.map((item, idx) => (
                                <div key={idx} className="mb-3 text-sm">
                                    <div className="font-semibold">{item.degree}</div>
                                    <div className="text-blue-200">{item.institution}</div>
                                    <div className="text-blue-300 text-xs">{item.year}</div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {section.items.map((item, idx) => (
                                    <span key={idx} className="bg-blue-700 px-2 py-1 rounded text-xs">
                                        {typeof item === 'string' ? item : item.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* Right Content - 65% */}
            <div className="w-[65%] p-10 flex flex-col gap-8">
                {data.summary && (
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-900 pb-2">Profile</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
                    </section>
                )}

                {data.sections.filter(s => s.type !== 'skills' && s.type !== 'education').map(section => (
                    <section key={section.id}>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-900 pb-2">{section.title}</h3>
                        {renderItems(section)}
                    </section>
                ))}
            </div>
        </div>
    );

    // 8. Windsor: Elegant with timeline visualization
    const Windsor = () => (
        <div className="w-full h-full bg-white p-10 font-sans text-gray-900">
            <header className="text-center mb-10 pb-8 border-b-4 border-double border-purple-300">
                {data.personalInfo.photo && (
                    <img src={data.personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-purple-200 shadow-lg" />
                )}
                <h1 className="text-5xl font-serif font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
                <p className="text-xl text-purple-600 italic mb-4">{data.personalInfo.role}</p>
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                </div>
            </header>

            <div className="grid grid-cols-3 gap-10">
                {/* Main content - 2 columns */}
                <div className="col-span-2 space-y-8">
                    {data.summary && (
                        <section>
                            <h3 className="text-xl font-serif font-bold text-purple-800 mb-3">Professional Summary</h3>
                            <p className="text-sm leading-relaxed text-gray-700 border-l-4 border-purple-300 pl-4 py-2">{data.summary}</p>
                        </section>
                    )}

                    {data.sections.filter(s => s.type === 'experience').map(section => (
                        <section key={section.id}>
                            <h3 className="text-xl font-serif font-bold text-purple-800 mb-6">{section.title}</h3>
                            {/* Timeline visualization */}
                            <div className="relative border-l-4 border-purple-200 ml-4 space-y-8 pl-8">
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="relative">
                                        <span className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-white shadow-md"></span>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-lg font-bold text-gray-900">{item.position}</h4>
                                            <span className="text-sm text-purple-600 font-semibold whitespace-nowrap ml-4">{item.duration}</span>
                                        </div>
                                        <p className="text-gray-700 font-semibold mb-2">{item.company}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-8">
                    {data.sections.filter(s => s.type !== 'experience').map(section => (
                        <section key={section.id}>
                            <h4 className="text-lg font-serif font-bold text-purple-800 mb-3 pb-2 border-b-2 border-purple-200">{section.title}</h4>
                            {section.type === 'skills' || section.type === 'list' ? (
                                <div className="space-y-2">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="bg-purple-50 border-l-4 border-purple-400 px-3 py-2 text-sm font-medium text-gray-800">
                                            {typeof item === 'string' ? item : item.name}
                                        </div>
                                    ))}
                                </div>
                            ) : section.type === 'education' ? (
                                section.items.map((item, idx) => (
                                    <div key={idx} className="mb-4 text-sm">
                                        <div className="font-bold text-gray-900">{item.degree}</div>
                                        <div className="text-gray-700">{item.institution}</div>
                                        <div className="text-purple-600 font-semibold">{item.year}</div>
                                    </div>
                                ))
                            ) : renderItems(section)}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );

    // 9. Template 1: Corporate Grid (Converted from 0001.PNG)
    const Template1 = () => (
        <div className="w-full h-full bg-white font-sans text-gray-800">
            {/* Header with Background */}
            <div className="bg-slate-900 text-white p-12 pr-64 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-2 tracking-tight">{data.personalInfo.fullName}</h1>
                    <p className="text-xl text-slate-300 font-medium mb-6">{data.personalInfo.role}</p>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                        {data.personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} className="text-slate-500" /> {data.personalInfo.email}</div>}
                        {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} className="text-slate-500" /> {data.personalInfo.phone}</div>}
                        {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /> {data.personalInfo.location}</div>}
                        {data.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={16} className="text-slate-500" /> {data.personalInfo.linkedin}</div>}
                    </div>
                </div>

                {/* Photo positioned absolutely */}
                {data.personalInfo.photo && (
                    <div className="absolute top-8 right-12 w-40 h-40 bg-white p-2 rounded-lg shadow-xl">
                        <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover rounded" />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-12 h-full">
                {/* Left Sidebar Info */}
                <div className="col-span-4 bg-slate-50 p-8 border-r border-slate-200 space-y-8">
                    {data.sections.filter(s => s.column === 'sidebar' || (!s.column && (s.type === 'skills' || s.type === 'list' || s.type === 'education'))).map(section => (
                        <section key={section.id}>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                                {section.title}
                            </h4>
                            {section.type === 'education' ? (
                                section.items.map((item, idx) => (
                                    <div key={idx} className="mb-4">
                                        <div className="font-bold text-slate-800">{item.degree}</div>
                                        <div className="text-slate-600 text-sm mb-1">{item.institution}</div>
                                        <div className="text-slate-500 text-xs font-medium bg-slate-200 inline-block px-2 py-0.5 rounded">{item.year}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {section.items.map((item, idx) => (
                                        <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded text-sm font-medium shadow-sm block w-full">
                                            {typeof item === 'string' ? item : item.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Main Content */}
                <div className="col-span-8 p-10 space-y-10">
                    {data.summary && (
                        <section>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Profile</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{data.summary}</p>
                        </section>
                    )}

                    {data.sections.filter(s => s.column === 'main' || (!s.column && s.type !== 'skills' && s.type !== 'list' && s.type !== 'education')).map(section => (
                        <section key={section.id}>
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                {section.title}
                                <span className="h-1 flex-1 bg-slate-100 rounded-full"></span>
                            </h3>

                            {section.type === 'experience' ? (
                                <div className="space-y-8">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="relative pl-6 border-l-2 border-slate-200 hover:border-slate-400 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-xl font-bold text-slate-800">{item.position}</h4>
                                                    <div className="text-slate-600 font-medium text-lg">{item.company}</div>
                                                </div>
                                                <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                                                    {item.duration}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed mt-3">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : renderItems(section)}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );

    // 10. Template 2: Modern Sidebar (Right Sidebar, Teal Accents)
    const Template2 = () => (
        <div className="w-full h-full bg-white font-sans text-gray-800 flex flex-row-reverse">
            {/* Right Sidebar - 30% */}
            <div className="w-[30%] bg-teal-50 text-gray-800 p-8 pt-12 flex flex-col gap-8 border-l border-teal-100">
                {/* Photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
                    {data.personalInfo.photo ? (
                        <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold text-3xl">
                            {data.personalInfo.fullName.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="text-sm space-y-4">
                    {data.personalInfo.email && (
                        <div className="flex flex-col">
                            <span className="font-bold text-teal-800 uppercase text-xs tracking-wider mb-1">Email</span>
                            <span className="break-all">{data.personalInfo.email}</span>
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className="flex flex-col">
                            <span className="font-bold text-teal-800 uppercase text-xs tracking-wider mb-1">Phone</span>
                            <span>{data.personalInfo.phone}</span>
                        </div>
                    )}
                    {data.personalInfo.location && (
                        <div className="flex flex-col">
                            <span className="font-bold text-teal-800 uppercase text-xs tracking-wider mb-1">Location</span>
                            <span>{data.personalInfo.location}</span>
                        </div>
                    )}
                    {data.personalInfo.linkedin && (
                        <div className="flex flex-col">
                            <span className="font-bold text-teal-800 uppercase text-xs tracking-wider mb-1">LinkedIn</span>
                            <span className="break-all">{data.personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>

                {/* Sidebar Sections */}
                <div className="flex-1 space-y-8">
                    {data.sections.filter(s => s.column === 'sidebar' || (!s.column && (s.type === 'skills' || s.type === 'list' || s.type === 'education'))).map(section => (
                        <section key={section.id}>
                            <h4 className="text-lg font-bold text-teal-900 border-b-2 border-teal-200 pb-2 mb-4 uppercase tracking-tight">{section.title}</h4>
                            {section.type === 'skills' ? (
                                <div className="space-y-4">
                                    {section.items.map((item, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-700">{typeof item === 'string' ? item : item.name}</span>
                                            </div>
                                            {/* Visual Kill Bar (Mock) */}
                                            <div className="w-full bg-teal-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-teal-600 h-full rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : section.type === 'education' ? (
                                <div className="space-y-4">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="text-sm">
                                            <div className="font-bold text-gray-900">{item.degree}</div>
                                            <div className="text-teal-700 font-medium">{item.institution}</div>
                                            <div className="text-gray-500 text-xs mt-1">{item.year}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : renderItems(section)}
                        </section>
                    ))}
                </div>
            </div>

            {/* Main Content - 70% */}
            <div className="w-[70%] p-12 pr-10 pt-16 flex flex-col gap-8">
                {/* Header */}
                <div>
                    <h1 className="text-5xl font-extrabold text-teal-900 tracking-tight leading-none mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-2xl text-teal-600 font-light">{data.personalInfo.role}</p>
                </div>

                {data.summary && (
                    <section>
                        <p className="text-gray-700 leading-relaxed text-lg border-l-4 border-teal-500 pl-6 py-1 italic">
                            {data.summary}
                        </p>
                    </section>
                )}

                {/* Main Sections */}
                {data.sections.filter(s => s.column === 'main' || (!s.column && s.type !== 'skills' && s.type !== 'list' && s.type !== 'education')).map(section => (
                    <section key={section.id}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                                {section.type === 'experience' ? <Briefcase size={16} /> : <div className="w-2 h-2 bg-teal-600 rounded-full"></div>}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">{section.title}</h3>
                        </div>

                        {section.type === 'experience' ? (
                            <div className="space-y-8 pl-4 border-l-2 border-dashed border-gray-200 ml-4">
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-teal-500"></div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-xl font-bold text-gray-900">{item.position}</h4>
                                            <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full whitespace-nowrap">{item.duration}</span>
                                        </div>
                                        <div className="text-lg text-gray-700 font-medium mb-3">{item.company}</div>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : renderItems(section)}
                    </section>
                ))}
            </div>
        </div>
    );
    const renderTemplate = () => {
        switch (templateId) {
            case 'modern': return <ModernClean />;
            case 'professional': return <Professional />;
            case 'creative': return <Creative />;
            case 'executive': return <Executive />;
            case 'minimal': return <Minimal />;
            case 'chicago': return <Chicago />;
            case 'tajmahal': return <TajMahal />;
            case 'windsor': return <Windsor />;
            case 'template1': return <Template1 />;
            case 'template2': return <Template2 />;
            default: return <ModernClean />;
        }
    };

    return (
        <div ref={ref} className="w-full h-full bg-white print:p-0">
            {renderTemplate()}
        </div>
    );
});

export default TemplateViewer;
