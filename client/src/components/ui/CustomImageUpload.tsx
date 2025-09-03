import { type FC, useRef, useState, useCallback, useEffect } from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import clsx from 'clsx';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface CustomImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  maxFiles?: number;
}

export const CustomImageUpload = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  maxFiles = 5,
}: CustomImageUploadProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  console.log(error);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Преобразование FileList в массив файлов
  const processFiles = useCallback(
    (files: FileList) => {
      const newImages: ImageFile[] = [];

      Array.from(files).forEach((file) => {
        if (
          file.type.startsWith('image/') &&
          images.length + newImages.length < maxFiles
        ) {
          const preview = URL.createObjectURL(file);
          newImages.push({
            file,
            preview,
            id: Math.random().toString(36).substr(2, 9),
          });
        }
      });

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onChange(updatedImages.map((img) => img.file));
      }
    },
    [images, maxFiles, onChange]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      processFiles(event.target.files);
      event.target.value = ''; // Сброс input для возможности повторной загрузки тех же файлов
    }
  };

  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    onChange(updatedImages.map((img) => img.file));

    // Освобождение URL объекта
    const imageToRemove = images.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Очистка превью при размонтировании
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  const availableSlots = maxFiles - images.length;
  const canUpload = availableSlots > 0;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-medium text-lg">{label}</span>

      <div className="relative group">
        {/* Область для drag and drop */}
        <div
          className={clsx(
            'border-2 border-dashed rounded-lg p-6 w-full transition-all ease-in-out duration-200',
            'flex flex-col items-center justify-center cursor-pointer min-h-[120px]',
            error ? 'border-red-500' : 'border-gray-500',
            isDragging &&
              'border-gray-900 dark:border-gray-100 bg-gray-100 dark:bg-gray-700',
            !canUpload && 'opacity-50 cursor-not-allowed'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => canUpload && fileInputRef.current?.click()}
        >
          <FaCloudUploadAlt className="text-gray-500 text-2xl mb-2" />
          <p className="text-gray-500 text-center">
            {canUpload ? (
              <>Drag and drop an image or click to choose</>
            ) : (
              <>Достигнут лимит в {maxFiles} изображений</>
            )}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {availableSlots} more is availiable
          </p>

          {/* Скрытый input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={!canUpload}
          />
        </div>

        {/* Список превью */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"
              >
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-full h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Maximum {maxFiles} files
      </p>
    </div>
  );
};
