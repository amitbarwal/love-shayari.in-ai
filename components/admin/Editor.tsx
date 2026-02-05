"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Heading1,
    Heading2
} from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b border-rose-100 bg-rose-50/30">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('bold') ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('italic') ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('heading', { level: 1 }) ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('heading', { level: 2 }) ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('bulletList') ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('orderedList') ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-rose-100 transition ${editor.isActive('blockquote') ? 'bg-rose-200 text-rose-700' : 'text-gray-600'}`}
                type="button"
            >
                <Quote className="w-4 h-4" />
            </button>
            <div className="w-px bg-rose-200 mx-1" />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded hover:bg-rose-100 transition text-gray-600"
                type="button"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded hover:bg-rose-100 transition text-gray-600"
                type="button"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
};

export default function Tiptap({ content, onChange }: { content: string, onChange: (content: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-rose max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    return (
        <div className="border border-rose-100 rounded-xl overflow-hidden bg-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
