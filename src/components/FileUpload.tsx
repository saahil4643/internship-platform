import React, { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.zip,.pdf,.doc,.docx,.sql,.json',
  maxSizeMB = 10,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File) => {
    setError(null);
    const sizeInMB = selectedFile.size / (1024 * 1024);
    
    if (sizeInMB > maxSizeMB) {
      setError(`File size exceeds the limit of ${maxSizeMB}MB.`);
      onFileSelect(null);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`w-full min-h-[160px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10'
            : file
            ? 'border-emerald-500/50 bg-emerald-50/10 dark:bg-emerald-950/5'
            : 'border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-900/10'
        }`}
      >
        {file ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 dark:border-emerald-900/40">
              <File className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-850 dark:text-slate-100 max-w-[280px] truncate">
                {file.name}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-455">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Ready to submit
              </span>
              <button
                onClick={removeFile}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-850 text-rose-500 hover:text-rose-600 transition-colors"
                title="Remove file"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="h-10.5 w-10.5 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 border border-slate-150/40 dark:border-slate-700 mb-1">
              <UploadCloud className="h-5.5 w-5.5" />
            </div>
            <div className="text-sm">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Click to upload
              </span>{' '}
              <span className="text-slate-500 dark:text-slate-400">
                or drag and drop
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Supports PDF, ZIP, SQL, JSON (max {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center text-xs text-rose-600 dark:text-rose-455">
          <AlertCircle className="h-3.5 w-3.5 mr-1.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
