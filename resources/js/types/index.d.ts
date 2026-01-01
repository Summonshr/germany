import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Vocabulary {
    id: number;
    word: string;
    translation: string;
    image_url?: string | null;
    audio_url?: string | null;
}

export interface Lesson {
    id: number;
    title: string;
    slug: string;
    lesson_type: 'vocabulary' | 'grammar' | 'exercise';
    vocabulary: Vocabulary[];
}

export interface Topic {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    lessons: Lesson[];
}

export interface Level {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    topics: Topic[];
}

export interface Language {
    id: number;
    name: string;
    code: string;
    levels: Level[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    language: Language;
    level: Level;
    topic: Topic;
    lesson: Lesson;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    bio?: string | null;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
